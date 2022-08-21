import { Card, Typography, Timeline, Image } from "antd";
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
           <div style={{textAlign: "center"}}> <Image alt= "PolyCare Logo" width={150} height={150} src="logo.png"> </Image>  </div>
            📝 <Text strong>About</Text>
           
          </>
        }
      >
        <Text strong>PolyCare</Text> is the first fully decentralized <Text strong>charity & fundraising</Text> application which is focused on two main aspects:
        <br />
        <br />
        1. Bringing <Text strong>orphanages and oldage homes</Text> together by providing financial assistance to Oldage homes who are willing to provide daycare/childcare services to orphanages.
        <br/>
        <br/>
        2. It is also a <Text strong>Web3 version of https://www.ketto.org/ Web2 platform</Text> where if you have donated to the protocol, you can start a proposal for raising funds for any medical treatment or other causes.
        <br/>
        <br />
        <Text strong>How the DApp works?</Text>
        <br />
        <br />
        <Timeline>
        <Timeline.Item>Step 1 - Under <Text strong>Donate</Text> tab - Donate to PolyCare as little as 0.0001 Matic. 
        <br/>You can choose if you wish to participate in the Governance Protocol. If yes, PolycareToken(PCT) tokens will be minted depending upon your donation amount.</Timeline.Item>
        <Timeline.Item color="green" dot={
              <ClockCircleOutlined
                style={{
                fontSize: '16px',
            }}
        />
      }>Step 2 - <Text strong>Governance</Text> tab - users with certain amount of Polycare Tokens can create a proposal (assumption is you or someone you know volunteers <br/>
            and works with the Oldage Homes and Orphanage is your area, determine the expenditure amount and submit proposal with <Text strong> supporting documents</Text></Timeline.Item>
        <Timeline.Item>Step 3 - Proposal goes through governance process where users with PCT token can delegate vote to someone or themself and participate in governance.</Timeline.Item>  
        <Timeline.Item color="green">Step 4 - If the proposal is passed, funds are released to the Oldage home.</Timeline.Item>  
        <Timeline.Item>Proposal goes through standard governance process where users can vote and the proposal is passed.</Timeline.Item>
        <Timeline.Item color="green">Step 5 - Under <Text strong>PolyCare Statistics</Text> tab - see the latest statistics for total donation amount till date, total balance remaining and total amount released to passed proposals.</Timeline.Item>
        <Timeline.Item>Step 6 - Under <Text strong>Mint NFT</Text> tab - If you are a donor to PolyCare you can add NFT to the contract which will then be available for minting.<br/> Just provide, oraganization name that received the funds, image CID and amount that was donated.</Timeline.Item>
        <Timeline.Item >Step 7 - <Text strong>Mint SVG NFT</Text> - If you donated to the protocol, you can mint 100% on-chain svg badge as token of thank you with the 'Name' of the organization that received the funds by providing the token id.</Timeline.Item>
    </Timeline>
      </Card>
    </div>
  );
}
