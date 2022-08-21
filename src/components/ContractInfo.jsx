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
        <br/>Treasury Contract at:  0x541607EF0081c5A932aE020ABE5da119B9427272
        <br/>Donation and Token Contract at:  0x0cd73F6cbe32FF4815E6FefF9852907b0Ad1D809
        <br/>Governance Contract at: 0x58e332dDA542Fc2CFeB2464e84280d0751779a0e
        <br/>NFT Contract at: 0xc791e3E5Ae44172Fe79FF670b1554Ab92160B151
        <br/>SVG Contract at: 0xFe5f4b8531C69F2B30388fAaD3dF99a14d0D997b
    </Text>
      </Card>
    </div>
  );
}
