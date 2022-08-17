import { Card, Button } from 'antd';
import React from 'react';
const { Meta } = Card;

//src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"

export default function NFTMint() {
    return (
<Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
    <Button
          type="primary"
          size="large"
          style={{width: "30%", marginTop: "25px" }}
           >
          MINT
        </Button>
  </Card>
    );
}