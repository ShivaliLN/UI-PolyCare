import { Card, Typography, Image, Button, Popover, Form, InputNumber, Input, message, Table, Space, Radio } from "antd";
//import { InboxOutlined } from '@ant-design/icons';
import React, { useState }from "react";
import { Moralis } from "moralis";
//import {abi} from './GovernorContract.json';
import governor from './GovernorContract.json';
import treasuryContract from './Treasury.json';
import polycareMain from './PolyCareMain.json';


const ProposalData = Moralis.Object.extend("ProposalData");
const proposalData = new ProposalData();

const { Text } = Typography;
const { TextArea } = Input;

const styles = {
    title: {
      fontSize: "20px",
      fontWeight: "700",
    },
    text: {
      fontSize: "16px",
    },
    card: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "0.5rem",
    },
    timeline: {
      marginBottom: "-45px",
    },
  };

  let proposalId = [];
  let description = [];
 
  
export default function Governance() {
  
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
    
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const handleVisibleChange2 = (newVisible2) => {
    setVisible2(newVisible2);
  };

  //const [radioVal, setValue] = useState(1);
  let radio;
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    //setValue(e.target.value);
    radio = e.target.value
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const key = "updatable";
  const openMessage = () => {
    message.loading({
      content: "Creating Proposal...",
      key,
      duration: 0,
    });
  };

  const openMessage2 = () => {
    message.loading({
      content: "Delegating...",
      key,
      duration: 0,
    });
  };

  const openMessage3 = () => {
    message.loading({
      content: "Casting Vote...",
      key,
      duration: 0,
    });
  };

  const openMessage4 = () => {
    message.loading({
      content: "Queuing Proposal...",
      key,
      duration: 0,
    });
  };

  const openMessage5 = () => {
    message.loading({
      content: "Executing Proposal...",
      key,
      duration: 0,
    });
  };

  async function proposeSmartContract() {
    console.log("In here11")
    console.log(form.getFieldValue(["proposal", "to"]));
    console.log(form.getFieldValue(["proposal", "donationAmt"]));

    const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3(); // Get ethers.js web3Provider { privateKey: process.env.PRIVATE_KEY }
    const signer = web3Provider.getSigner();

    const contract = new ethers.Contract(
      "0x58e332dDA542Fc2CFeB2464e84280d0751779a0e",
      governor.abi, //ABI
      signer,
    ); 
    
    const blocknumber = (await web3Provider.getBlockNumber()-1);
    const tokenBalance = await contract.getVotes(Moralis.account, blocknumber)
    console.log(ethers.utils.formatEther(tokenBalance))
    
    try {
      //const treasury = new ethers.utils.Interface(ABI2)
      const treasury = new ethers.utils.Interface(treasuryContract.abi)
      const amount = ethers.utils.parseEther(form.getFieldValue(["proposal", "donationAmt"]))
      const encodedFunctionCall = treasury.encodeFunctionData("releaseFunds", [form.getFieldValue(["proposal", "to"]), form.getFieldValue(["proposal", "name"]),amount])
           
      
      const transaction = await contract.propose(
        ["0x541607EF0081c5A932aE020ABE5da119B9427272"],            // [form.getFieldValue(["proposal", "to"])],
        [0],
        [encodedFunctionCall],
        form.getFieldValue(["proposal", "description"])
        );
      
      console.log(transaction.hash);
      const proposeReceipt = await transaction.wait(1)
      let proposalId = proposeReceipt.events[0].args.proposalId
      let proposalState = await contract.state(proposalId)
      console.log("Proposal ID: " + proposalId)
      console.log(`Current Proposal State: ${proposalState}`)   
      
      proposalData.set("ProposalId", proposalId.toString());
      //proposalData.set("targets", form.getFieldValue(["proposal", "to"]) );
      proposalData.set("encodedFunct", encodedFunctionCall);
      proposalData.set("description", form.getFieldValue(["proposal", "description"]));
      proposalData.save()

      openMessage();
      await transaction.wait().then(() => {
        message.success({
          content: "Congratulations proposal created successfull!",
          key,
          duration: 3,
        });
        form.resetFields();
      });
    } catch (err) {
      console.log(err);
    }    
  }

  async function delegate(id) {
    console.log("In here11")
    console.log(form.getFieldValue(["delegate", "to"]));
    
    const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3(); // Get ethers.js web3Provider { privateKey: process.env.PRIVATE_KEY }
    const signer = web3Provider.getSigner();

    const contract = new ethers.Contract(
      "0x0cd73F6cbe32FF4815E6FefF9852907b0Ad1D809",
      polycareMain.abi, //ABI3
      signer,
    ); 
       
    try {
        let transaction;
      if(id==1){
         transaction = await contract.delegate(form.getFieldValue(["delegate", "to"]))
      }else{
         transaction = await contract.delegate(Moralis.account)
      }      
            
      console.log(transaction.hash);
      openMessage2();
      await transaction.wait().then(() => {
        message.success({
          content: "Congratulations delegation successfull!",
          key,
          duration: 3,
        });
        form.resetFields();
      });
    } catch (err) {
      console.log(err);
    }    
  }
  
  async function Vote(proposalId){
    console.log("Radio" +radio)
    console.log("proposalId" + proposalId)

    // vote
    const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3(); // Get ethers.js web3Provider { privateKey: process.env.PRIVATE_KEY }
    const signer = web3Provider.getSigner();

    const contract = new ethers.Contract(
      "0x58e332dDA542Fc2CFeB2464e84280d0751779a0e",
      governor.abi, //ABI
      signer,
    ); 
    console.log(`Current Proposal State:`)
    let proposalState = await contract.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)  
    
    let proposalDeadline = await contract.proposalDeadline(proposalId)
    console.log(`Current Proposal proposalDeadline: ${proposalDeadline}`)  
    console.log(await contract.proposalVotes(proposalId))
    const blocknumber = (await web3Provider.getBlockNumber()-1);
    console.log("quorum" + await contract.quorum(blocknumber))  
    //console.log(await contract.proposalSnapshot(proposalId))
    //console.log(await contract.getVotes("0x861cadb50533f288313207a140a107e8ad9ee8c6", blocknumber)) 
    //console.log(await contract.getVotes("0x3e716a009c4a2e0dd38a907414bbd3505c686b2b", blocknumber))
       
    try {
      const transaction = await contract.castVote(
        proposalId,
        radio
        );
      
      console.log(transaction.hash);
            
      openMessage3();
      await transaction.wait().then(() => {
        message.success({
          content: "Congratulations vote successful!",
          key,
          duration: 3,
        });
        form.resetFields();
      });
     
    } catch (err) {
      console.log(err);
    }  
   
  }
  //const findProposals = async () => {
  async function findProposals() {
    proposalId = [];
    description = [];
    console.log("findProposals here");
    //let web3 = await Moralis.enableWeb3();
    let promises = [Moralis.Cloud.run("getProposals", {})];
    let results = await Promise.all(promises);
    console.log("length: " + results.length);
    const flattened = results.flatMap(d => d);
    console.log("length2:" + flattened.length);
    
    for (let i=0; i < flattened.length; i++){
      //console.log(`${JSON.stringify(flattened)}`)   
      //console.log(Object.keys(flattened)) 
      //console.log(Object.values(flattened))
      //console.log(flattened[i].attributes.proposalId)
      //console.log(flattened[i].attributes.description)
      proposalId.push(flattened[i].attributes.proposalId)
      description.push(flattened[i].attributes.description)
      //console.log(proposalId.length)
      const row = {
        key:i,
        proposalId: proposalId[i], 
        description:description[i]
        }
        console.log(row);
        //data.push(row);  
        //console.log(data[i]);         
    }       
  };

  const dataSource = [];

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Proposal Id',
      dataIndex: 'proposalId',
      key: 'proposalId',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',      
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">       
          <Button onClick={() => Vote(record.proposalId, record.select)} >Vote</Button>
          <Button onClick={() => Queue(record.proposalId)} >Queue</Button>
          <Button onClick={() => Execute(record.proposalId)}>Execute</Button>
        </Space>
      )
    },  
  ];

  for (let i = 0; i < proposalId.length; i++) {
    dataSource.push({
      key: i,
      proposalId: proposalId[i],
      description: description[i], 
      select:(<Space size="middle"> 
      <Radio.Group onChange={onChange}>
            <Radio value={0}>Against</Radio>
            <Radio value={1}>For</Radio>
            <Radio value={2}>Abstain</Radio>
      </Radio.Group>         
      </Space>)
    });
  } 
  const [values, setValues] = useState({ message: ""});	

  async function uploadIPFS(){
    const fileInput = document.getElementById("file")
    const data = fileInput.files[0]
    console.log(data)
    const file = new Moralis.File(data.name, data);
    await file.saveIPFS();
    console.log(file.ipfs(), file.hash())
    setValues({ ...values, message: file.ipfs() })
  }
  
  async function Queue(proposalId){   
    console.log("In queue" + proposalId) 
    
    let promises = [
      Moralis.Cloud.run("findRecord", {
        proposalId:proposalId, 
      }),
    ];
    let results = await Promise.all(promises);
    console.log("hi2" + results);
    console.log("length: " + results.length);
    const flattened = results.flatMap(d => d);
    console.log("length2:" + flattened.length);
    //console.log("length2:" + flattened[0].attributes.encodedFunct);
    //console.log("length2:" + flattened[0].attributes.description);

    // Queue
    const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3(); // Get ethers.js web3Provider { privateKey: process.env.PRIVATE_KEY }
    const signer = web3Provider.getSigner();

    //const targets = ethers.utils.id(flattened[0].attributes.targets)
    const descriptionHash = ethers.utils.id(flattened[0].attributes.description)
    const encodedFunctionCall = flattened[0].attributes.encodedFunct
    console.log("In queue2" + encodedFunctionCall)
    
    
    const contract = new ethers.Contract(
      "0x58e332dDA542Fc2CFeB2464e84280d0751779a0e",
      governor.abi, //ABI
      signer,
    ); 
    console.log(`Current Proposal State:`)
    let proposalState = await contract.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)  
    console.log(`Current Proposal snapshot:` + await contract.proposalSnapshot(proposalId))    
    console.log(`Current Proposal deadline:` + await contract.proposalDeadline(proposalId))  
    console.log(`Current hashproposal:` + await contract.hashProposal(["0x541607EF0081c5A932aE020ABE5da119B9427272"],
    [0],
    [encodedFunctionCall],
    descriptionHash))
    
    try {
      const transaction = await contract.queue(
        ["0x541607EF0081c5A932aE020ABE5da119B9427272"],
        [0],
        [encodedFunctionCall],
        descriptionHash
        );
      
      console.log(transaction.hash);
            
      openMessage4();
      await transaction.wait().then(() => {
        message.success({
          content: "Congratulations proposal queued!",
          key,
          duration: 3,
        });
        form.resetFields();
      });
     
    } catch (err) {
      console.log(err);
    }  
  
  }

  async function Execute(proposalId){   
    console.log("In Execute" + proposalId) 
    
    let promises = [
      Moralis.Cloud.run("findRecord", {
        proposalId:proposalId, 
      }),
    ];
    let results = await Promise.all(promises);
    console.log("hi2" + results);
    console.log("length: " + results.length);
    const flattened = results.flatMap(d => d);
    console.log("length2:" + flattened.length);
    //console.log("length2:" + flattened[0].attributes.encodedFunct);
    //console.log("length2:" + flattened[0].attributes.description);

    // Execute
    const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3(); // Get ethers.js web3Provider { privateKey: process.env.PRIVATE_KEY }
    const signer = web3Provider.getSigner();

    //const targets = ethers.utils.id(flattened[0].attributes.targets)
    const descriptionHash = ethers.utils.id(flattened[0].attributes.description)
    const encodedFunctionCall = flattened[0].attributes.encodedFunct
    //console.log("In queue2" + encodedFunctionCall)
    
    
    const contract = new ethers.Contract(
      "0x58e332dDA542Fc2CFeB2464e84280d0751779a0e",
      governor.abi, //ABI
      signer,
    ); 
    console.log(`Current Proposal State:`)
    let proposalState = await contract.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)  
    console.log(`Current Proposal snapshot:` + await contract.proposalSnapshot(proposalId))    
    console.log(`Current Proposal deadline:` + await contract.proposalDeadline(proposalId))  
        
    try {
      const transaction = await contract.execute(
        ["0x541607EF0081c5A932aE020ABE5da119B9427272"],
        [0],
        [encodedFunctionCall],
        descriptionHash
        );
      
      console.log(transaction.hash);
            
      openMessage5();
      await transaction.wait().then(() => {
        message.success({
          content: "Congratulations proposal executed!",
          key,
          duration: 3,
        });
        form.resetFields();
      });
     
    } catch (err) {
      console.log(err);
    }  
  
  }



    return (
        <div style={{ display: "flex", gap: "10px" }}>
          <Card
            style={styles.card}
            title={
              <>
               <div style={{textAlign: "center"}}> <Image alt= "PolyCare Logo" width={150} height={150} src="logo.png"> </Image>  </div>
                📝 <Text strong>PolyCare Governance</Text>               
              </>
            }
          >
            Governed by the community.
            <br/>
            The PolyCare protocol is managed by a global community of PCT token holders and delegates.  
            <br/>
            <br/>
            <div style={{ display: "flex", gap: "10px" }}>
            <div>
            <Card
                hoverable
                    style={{
                    width: 240,
                }}
            >
                <Popover
  content={<Form
    name="proposal_form"
    form={form}
    onFinish={onFinish}
    autoComplete="off"
  >      
  <Form.Item
      label="To"
      name={["proposal", "to"]}
      rules={[
        {
          required: true,
          message: "Please enter to address"
        },
      ]}
    >     
  <Input style={{
      width: '100%',
    }}
    placeholder="Enter Polygon Address here"
    />
  </Form.Item>
  <Form.Item
      label="Name"
      name={["proposal", "name"]}
      rules={[
        {
          required: true,
          message: "Please enter to organization name"
        },
      ]}
    >     
  <Input style={{
      width: '100%',
    }}
    placeholder="Enter Polygon Address here"
    />
  </Form.Item>
<Form.Item
      label="Donation Amount:"
      name={["proposal", "donationAmt"]}
      rules={[
        {
          required: true,
          message: "Please enter amount",
        },
      ]}
    >     
  <InputNumber style={{
      width: '60%',      
    }}
    prefix="♾️"  min={1}/>
  </Form.Item>
  <Form.Item
      label="Proposal Description"
      name={["proposal", "description"]}
      rules={[
        {
          required: true,
          message: "Please enter description",
        },
      ]}
    >     
    <TextArea rows={4} placeholder="Proposal Title
## Summary
Insert your summary here
##Relevant Document IPFS URLs
Insert your Supporting Document IPFS URLs here
##Description
Insert your Description here"  />
  </Form.Item> 

  <input
        type="file"
        name="file"
        id="file"
      />  
      Your IPFS Link: {values.message}
      <Button
    type="dashed"
    size="small"
    style={{width: "100%", marginTop: "25px" }}
    onClick={uploadIPFS}
     >
    Upload Supporting Documents to IPFS 
  </Button>


  <div style={{textAlign: "center"}}>
  <Button
    type="primary"
    size="large"
    style={{width: "100%", marginTop: "25px" }}
    onClick={proposeSmartContract}
     >
    Create
  </Button></div>
  </Form>}
  title="Create Proposal"
  trigger="click"
  visible={visible}
  onVisibleChange={handleVisibleChange}
  placement="left"
><Button
                    type="primary"
                    size="medium"
                    style={{width: "100%", marginTop: "25px"}}
                >
                Create Proposal
                </Button>
 </Popover>
 </Card>
 </div>

 <div>
 <Card
                hoverable
                    style={{
                    width: 240,
                }}
            >
 <Popover
  content={<Form
    name="delegate_form"
    form={form}
    onFinish={onFinish}
    autoComplete="off"
  >      
  <Form.Item
      label="Delegate to"
      name={["delegate", "to"]}
      rules={[
        {
          required: true,
          message: "Please enter to field"
        },
      ]}
    >     
  <Input style={{
      width: '100%',
    }}
    />
  </Form.Item>
   <Button
    type="primary"
    size="small"
    style={{width: "100%", marginTop: "25px" }}
    onClick={() => delegate('1')}
     >
    Delegate someone
  </Button>       
  
  <div style={{textAlign: "center"}}>
  <Button
    type="primary"
    size="small"
    style={{width: "100%", marginTop: "25px" }}
    onClick={() => delegate('2')}
     >
    Delegate to self
  </Button></div>
  </Form>}
  title="Delegate Token for Voting power"
  trigger="click"
  visible={visible2}
  onVisibleChange={handleVisibleChange2}
><Button
                    type="primary"
                    size="medium"
                    style={{width: "100%", marginTop: "25px"}}
                >
                Delegate
                </Button>
 </Popover>
                
            </Card>
            </div>
            <div>
            <Card
                hoverable
                    style={{
                    width: 1200,
                }}
            >
                <Button type="primary" danger size="small" onClick={findProposals}>
                    Refresh Proposals
                </Button>
                <br/>
                <br/>
                <br/>
                <Table dataSource={dataSource} columns={columns} size="small"/>
            </Card>    
            </div>
            </div>
          </Card>
        </div>
      );
}