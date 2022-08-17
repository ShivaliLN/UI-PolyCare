import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="dark"
      mode="inline"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/quickstart">
        <NavLink to="/quickstart">🚀 About PolyCare</NavLink>
      </Menu.Item>
      <Menu.Item key="/donate">
        <NavLink to="/donate">👛 Donate</NavLink>
      </Menu.Item>
      <Menu.Item key="/governance">
        <NavLink to="/governance">🏦 Governance</NavLink>
      </Menu.Item>
      <Menu.Item key="/statistics">
        <NavLink to="/statistics">💵 Donation Statistics</NavLink>
      </Menu.Item>
      {/*}
      <Menu.Item key="onramp">
        <NavLink to="/onramp">💵 Fiat</NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20balance">
        <NavLink to="/erc20balance">💰 Balances</NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20transfers">
        <NavLink to="/erc20transfers">💸 Transfers</NavLink>
      </Menu.Item>
    */}
      <Menu.Item key="/nftMint">
        <NavLink to="/nftMint">🖼 Mint NFTs</NavLink>
      </Menu.Item>
      <Menu.Item key="/contract">
        <NavLink to="/contract">📄 PolyCare Contract</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
