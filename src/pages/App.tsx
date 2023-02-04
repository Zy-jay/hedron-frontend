import "../App.css"
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import ConnectWalletPage from "./ConnectWalletPage/ConnectWalletPage";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { getShortAddress } from "utils/getShortAddress";
import { useDarkModeManager } from "contexts/LocalStorage";
import { Moon, Sun } from "react-feather";




const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {account} = useWeb3React()


  return (
    <Layout >    
      <Sider style={{background: "#1E1E1E"}} trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{account && (!collapsed? getShortAddress(account) : "..."+ account.substr(38,41))}</div>
        <Menu style={{background: "#1E1E1E", position: "sticky", top: "175px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout" style={{background: "#121212"}}>
        <Header style={{ padding: 0, background: "#563DEA", position: "fixed", width: "100%" }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div style={{position: "fixed", top: "20px", right: "50px", display: "flex"}}>
          <button >
            <Moon size={20} />
          </button>
          <ConnectWalletPage/></div> 
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: "#121212",
          }}
        >
          <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

