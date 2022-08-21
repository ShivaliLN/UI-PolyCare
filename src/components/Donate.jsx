import { Typography, InputNumber, Button, Card, Radio, Form,message  } from "antd";
import React, { useState } from 'react';
import { Moralis } from "moralis";
//import { useMoralis } from "react-moralis";
import polycareMain from './PolyCareMain.json';

const { Text } = Typography;

const styles = {
    card: {
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "0.5rem",
        width: "40%",
      },
    header: {
      textAlign: "center",
    },
    input: {
      width: "50%",
      outline: "none",
      fontSize: "16px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textverflow: "ellipsis",
      appearance: "textfield",
      color: "#041836",
      fontWeight: "700",
      border: "none",
      backgroundColor: "transparent",
    },
    select: {
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
    },
    textWrapper: { maxWidth: "80px", width: "100%" },
    row: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexDirection: "row",
    },
  };

export default function Donate() {
  //const { Moralis } = useMoralis();
  const [form] = Form.useForm();

  const [value, setValue] = useState();

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const key = "updatable";
  const openMessage = () => {
    message.loading({
      content: "Sending Donation...",
      key,
      duration: 0,
    });
  };

  async function callSmartContract() {
    console.log("In here11")
    console.log(form.getFieldValue(["user", "radioYN"]));
    console.log(form.getFieldValue(["user", "donationAmt"]));

    const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3(); // Get ethers.js web3Provider { privateKey: process.env.PRIVATE_KEY }
    const signer = web3Provider.getSigner();

    const contract = new ethers.Contract(
      "0x0cd73F6cbe32FF4815E6FefF9852907b0Ad1D809",
      polycareMain.abi,
      signer,
    ); 
       
    try {
      let transaction;
      if(form.getFieldValue(["user", "radioYN"]) =="1"){
        transaction = await contract.donate(
          {value: Moralis.Units.ETH(form.getFieldValue(["user", "donationAmt"]))}
        );
      }else{
        transaction = await contract.donateWithoutToken(
          {value: Moralis.Units.ETH(form.getFieldValue(["user", "donationAmt"]))}
        );
      }      
      console.log(transaction.hash);
      openMessage();
      await transaction.wait().then(() => {
        message.success({
          content: "Congratulations donation successfull!",
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
    <Card
        style={styles.card}
        title={
          <>
            📝 <Text strong>Donate</Text>
          </>
        }
      >  
      <Form
          name="donation_form"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >      
        <Form.Item
            label="Would you like to participate in Governance?"
            name={["user", "radioYN"]}
            rules={[
              {
                required: true,
                message: "Please select yes or no",
              },
            ]}
          >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Yes</Radio>
            <Radio value={2}>No</Radio>
        </Radio.Group> 
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
            width: '30%',
          }}
          prefix="♾️" min={0.0001}/>
        </Form.Item>
        <div style={{textAlign: "center"}}>
        <Button
          type="primary"
          size="large"
          style={{width: "25%", marginTop: "25px" }}
          onClick={callSmartContract}
           >
          Donate💸
        </Button></div>
        </Form>       
        </Card> 
  );
}
