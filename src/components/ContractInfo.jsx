import { Card, Typography, Image } from "antd";
import React from "react";
//import { useMoralis } from "react-moralis";

const { Text } = Typography;

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

export default function ContractInfo() {
  //const { Moralis } = useMoralis();

  

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        title={
          <>
           <div style={{textAlign: "center"}}> <Image alt= "PolyCare Logo" width={150} height={150} src="logo.png"> </Image>  </div>
            📝 <Text strong>PolyCare Contracts</Text>
           
          </>
        }
      >
        <Text>
        <br/>Treasury Contract at:  
        <br/>Donation and Token Contract at:  
        <br/>Governance Contract at: 
        <br/>NFT Contract at: 
    </Text>
      </Card>
    </div>
  );
}
