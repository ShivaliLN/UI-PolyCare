import { Card, Typography, Timeline } from "antd";
import { ClockCircleOutlined } from '@ant-design/icons';
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

export default function QuickStart() {
  //const { Moralis } = useMoralis();

  

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        title={
          <>
            📝 <Text strong>About</Text>
          </>
        }
      >
        <Text strong>PolyCare</Text> is a fully decentralized donation platform to promote oldage homes to provide daycare/childcare services to orphan kids.
        <br />
        DApp includes on-chain governance for funds management, minting NFTs and more.
        <br />
        Its a decentralized <Text strong>charity</Text> platform where you can see that your donations are being used for good cause and without thrid party involvement.
        <br />
        <br />
        <Text strong>How the DApp works?</Text>
        <br />
        <br />
        <Timeline>
        <Timeline.Item>Donate to the DApp as little as 0.0001 Matic</Timeline.Item>
        <Timeline.Item color="green">You can choose if you wish to participate in the Governance Protocol. 
        <br/>If yes, you will be minted <Text strong>PolycareToken(PCT)</Text> tokens depending upon your donation amount.</Timeline.Item>
        <Timeline.Item>Any user who has 25000 or more Polycare Token can create a proposal.</Timeline.Item>  
        <Timeline.Item color="green">Idea is you or someone you know volunteers and works with the Oldage Homes and Orphanage is your area.</Timeline.Item>  
          <Timeline.Item
            dot={
              <ClockCircleOutlined
                style={{
                fontSize: '16px',
            }}
        />
      }
    >
      Proposal goes through standard governance process where users can vote and the proposal is passed.
    </Timeline.Item>
    <Timeline.Item color="green">Funds are released to the Oldage Home</Timeline.Item>
    <Timeline.Item >If you have donated to the cause you will be able to mint <Text strong>PolyCare NFTs</Text></Timeline.Item>
    </Timeline>
      </Card>
    </div>
  );
}
