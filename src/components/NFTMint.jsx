import { Card, Button, Popover, Form, InputNumber, Input, message } from 'antd';
import React, { useState } from 'react';
//import { UploadOutlined } from '@ant-design/icons';
import { Moralis } from "moralis";

const ABI ="[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_polyCareMain\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"quantity\",\"type\":\"uint256\"}],\"name\":\"Minted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"supply\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"string\",\"name\":\"imageCID\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"cid\",\"type\":\"string\"}],\"name\":\"TokenAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"TransferBatch\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"TransferSingle\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"string\",\"name\":\"value\",\"type\":\"string\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"URI\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_totalNumOfTokenstoMint\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"_imageCID\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"_cid\",\"type\":\"string\"}],\"name\":\"addToken\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"accounts\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"}],\"name\":\"balanceOfBatch\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"minted\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"querySupplyLeftRate\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"_supply\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeBatchTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"supplies\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"tokens\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"uri\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";

//src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"

export default function NFTMint() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const key = "updatable";
  const openMessage = () => {
    message.loading({
      content: "Minting NFT...",
      key,
      duration: 0,
    });
  };

  async function callSmartContract(id) {
    console.log("In here11")
    const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3(); // Get ethers.js web3Provider { privateKey: process.env.PRIVATE_KEY }
    const signer = web3Provider.getSigner();

    const contract = new ethers.Contract(
      "0xF4c68DEf2B1e20c64c300094E62161eDBe42B6BA",
      ABI,
      signer,
    ); 
       
    try {
      console.log("ID that came" + id);
      let transaction;      
        transaction = await contract.mint(
          id, "1"
        );    
      console.log(transaction.hash);
      openMessage();
      await transaction.wait().then(() => {
        message.success({
          content: "Congratulations NFT Minted!",
          key,
          duration: 3,
        });
        form.resetFields();
      });
    } catch (err) {
      console.log(err);
    }    
  }

  //async function callSVGSmartContract(){

 // }

  async function addNFT(){
    
    const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3(); // Get ethers.js web3Provider { privateKey: process.env.PRIVATE_KEY }
    const signer = web3Provider.getSigner();

    const contract = new ethers.Contract(
      "0xF4c68DEf2B1e20c64c300094E62161eDBe42B6BA",
      ABI,
      signer,
    ); 

    //uint _id, uint _totalNumOfTokenstoMint, string calldata _imageCID, string calldata _cid
    try {
      const object = {
        "name" : form.getFieldValue(["user", "name"]),
        "description": "Thank you for your donation to PolyCare",
        "image": `https://ipfs.io/ipfs/${form.getFieldValue(["user", "imageCID"])}`,
        "properties": [{
          "donationAmount": form.getFieldValue(["user", "donationAmt"])
        }
      ]      
      }
      const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(object))});
      await file.saveIPFS();
      console.log(file.hash());
      console.log(file.ipfs());

      let transaction;      
        transaction = await contract.addToken(
          4,5000, "bafkreic7j2c7575dudrht3db4bepqrx2u6rxy3dxakpb5z5wmp3qdjyygm", file.hash()
        );    
      console.log(transaction.hash);
      openMessage();
      await transaction.wait().then(() => {
        message.success({
          content: "Congratulations Token Added!",
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
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://bafkreiacih2eghkctkooafekyj2wxox2ivpodwtnksrvs4utqg2kzdrsqa.ipfs.nftstorage.link/" />}
  >
    <Button
          type="primary"
          size="large"
          style={{width: "50%", marginTop: "25px"}}
          onClick={() => callSmartContract('1')}
           >
          MINT
        </Button>
  </Card>
  <div>
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://bafkreigaj6vydaydlhmg623axvdwt5sa3bfehvbvuxp4rvp7gia4l4vyrm.ipfs.nftstorage.link/" />}
  >
    <Button
          type="primary"
          size="large"
          style={{width: "50%", marginTop: "25px"}}
          onClick={() => callSmartContract('2')}
           >
          MINT
        </Button>
  </Card>
  </div>
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://bafkreiekmu6sgz7cwdrvuuhcz456hjiuv3ggvhylpad26tgf33imem7sc4.ipfs.nftstorage.link/" />}
  >
    <Button
          type="primary"
          size="large"
          style={{width: "50%", marginTop: "25px"}}
          onClick={() => callSmartContract('3')}
           >
          MINT
        </Button>
  </Card>
  <Card
    hoverable
    style={{
      width: 190,
    }}
    cover={<img alt="example" src="https://bafkreic7j2c7575dudrht3db4bepqrx2u6rxy3dxakpb5z5wmp3qdjyygm.ipfs.nftstorage.link/" />}
  >
    <Button
          type="primary"
          size="large"
          style={{width: "70%", marginTop: "25px"}}
           >
          MINT SVG
        </Button>
  </Card>
  <Card
    hoverable
    style={{
      width: 300,
    }}
  ><Popover
  content={<Form
    name="upload_form"
    form={form}
    onFinish={onFinish}
    autoComplete="off"
  >      
  <Form.Item
      label="Organization Name"
      name={["user", "name"]}
      rules={[
        {
          required: true,
          message: "Please enter name",
        },
      ]}
    >     
  <Input style={{
      width: '100%',
    }}
    />
  </Form.Item>
  <Form.Item
      label="Image CID"
      name={["user", "imageCID"]}
      rules={[
        {
          required: true,
          message: "Please enter image CID",
        },
      ]}
    >     
  <Input style={{
      width: '100%',
    }}
    />
  </Form.Item>          
  <Form.Item
      label="Donation Amount:"
      name={["user", "donationAmt"]}
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
    prefix="♾️" />
  </Form.Item>
  <div style={{textAlign: "center"}}>
  <Button
    type="primary"
    size="large"
    style={{width: "100%", marginTop: "25px" }}
    onClick={addNFT}
     >
    Add NFT to Contract
  </Button></div>
  </Form>}
  title="Add NFT"
  trigger="click"
  visible={visible}
  onVisibleChange={handleVisibleChange}
><Button
  type="primary"
  size="large"
  style={{width: "100%", marginTop: "25px"}}
   >
  Create NFT and Upload Metada
</Button>
 </Popover></Card>
  </div>
    );
}