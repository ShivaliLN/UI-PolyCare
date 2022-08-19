import { Card, Typography, Image, Button, Popover, Form, InputNumber, Input, message, Table, Space, Radio  } from "antd";
//import { ClockCircleOutlined } from '@ant-design/icons';
import React, { useState }from "react";
import { Moralis } from "moralis";
//import {abi} from './GovernorContract.json';
import governor from './GovernorContract.json';
import treasuryContract from './Treasury.json';
import polycareMain from './PolyCareMain.json';


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

  async function proposeSmartContract() {
    console.log("In here11")
    console.log(form.getFieldValue(["proposal", "to"]));
    console.log(form.getFieldValue(["proposal", "donationAmt"]));

    const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3(); // Get ethers.js web3Provider { privateKey: process.env.PRIVATE_KEY }
    const signer = web3Provider.getSigner();

    const contract = new ethers.Contract(
      "0x00aF7473B838ebB8E8e505FE383a29db8aE1e2A9",
      governor.abi, //ABI
      signer,
    ); 
       
    try {
      //const treasury = new ethers.utils.Interface(ABI2)
      const treasury = new ethers.utils.Interface(treasuryContract.abi)
      const encodedFunctionCall = treasury.encodeFunctionData("releaseFunds", [77, form.getFieldValue(["proposal", "to"]), form.getFieldValue(["proposal", "name"]), form.getFieldValue(["proposal", "donationAmt"])])
      const transaction = await contract.propose(
        [form.getFieldValue(["proposal", "to"])],
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
      "0x8264010c963636cBF0d6EE7C9Cc1977787FE07AB",
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
      openMessage();
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
      "0x00aF7473B838ebB8E8e505FE383a29db8aE1e2A9",
      governor.abi, //ABI
      signer,
    ); 
    console.log(`Current Proposal State:`)
    let proposalState = await contract.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)  
    
    let proposalDeadline = await contract.proposalDeadline(proposalId)
    console.log(`Current Proposal proposalDeadline: ${proposalDeadline}`)  
    
    try {
      const transaction = await contract.castVote(
        proposalId,
        radio
        );
      
      console.log(transaction.hash);
            
      openMessage();
      await transaction.wait().then(() => {
        message.success({
          content: "Congratulations vote successfull!",
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
          <Button >Queue</Button>
          <Button >Execute</Button>
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
            <Radio value={1}>For</Radio>
            <Radio value={2}>Against</Radio>
            <Radio value={3}>Abstain</Radio>
      </Radio.Group>         
      </Space>)
    });
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

##Description

Insert your Description here"  />
  </Form.Item>          
  
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