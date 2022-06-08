import {
  DatabaseTwoTone,
  FundTwoTone, LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserOutlined, UserSwitchOutlined,

} from '@ant-design/icons';

import {Layout, Menu} from 'antd';
import React, {useEffect, useState} from 'react';
import './main.css';
import {Link, Route, Routes} from "react-router-dom";
import User from "../user/user";
import Course from "../course/course";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Footer} from "antd/es/layout/layout";

const {Header, Sider, Content} = Layout;

const MainLayout = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const [username, setUsername] = useState("")


  useEffect(() => {
    let phoneNumber = localStorage.getItem("phoneNumber")
    axios.get("http://localhost:9000/{" + phoneNumber + "}").then(res => {
      setUsername(res.data.firstName)
      setPictureUrl(res.data.imageUrl)
    })
  });

  const logout = () => {
    localStorage.clear();
    localStorage.getItem("")
    window.location.href = 'http://localhost:3000'
  }

  const pictureHelp = (pictureUrl) => {
    if (pictureUrl !== "") {
      return <img src={pictureUrl} alt="profile_pic"/>
    } else {
      return <img src="/images.png" alt="Avatar" className="avatar"/>
    }
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <Link to={"/admin/user"}><UserOutlined/></Link>,
              label: 'USER',
            },
            {
              key: '2',
              icon: <Link to={"/admin/course"}><FundTwoTone/></Link>,
              label: 'COURSE',
            },
            {
              key: '3',
              icon: <DatabaseTwoTone/>,
              label: 'QUEUE',
            },
            {
              key: '4',
              icon: <UsergroupAddOutlined/>,
              label: 'GROUP',
            },
            {
              key: '5',
              icon: <UserSwitchOutlined/>,
              label: 'ADMIN',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <header>
            <div className="container">
              <ul>
                <li>{(username == "") ? <span>User</span> : {username}}</li>
                <li>{
                  (pictureUrl == "") ? <img src="/images.png" alt="Avatar" className="avatar"/> :
                    <img src={pictureUrl} alt="Avatar" className="avatar"/>}</li>
                <li>
                  <a href="#" className="btn btn-info" onClick={logout}>
                    <span className="glyphicon glyphicon-log-out"/> Log out
                  </a>
                </li>
              </ul>
            </div>
          </header>

        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >

          <Routes>
            <Route exact={true} path={"/admin/user"} element={<User/>}/>
            <Route exact={true} path={"/admin/course"} element={<Course/>}/>
          </Routes>

        </Content>
        <Footer style={
          {
            textAlign: 'center',
            fontFamily: "monospace"
          }
        }>Oliy-Mahad ©2022 Created by PDP/B1</Footer>
      </Layout>

    </Layout>

  );
};

export default MainLayout;
