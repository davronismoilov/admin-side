import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    SettingOutlined,
    LaptopOutlined,
    NotificationOutlined
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import React, {useState} from 'react';
import './main.css';
import {Link} from "react-router-dom";
import CustomHeader from "../header/Header";

const {Header, Sider, Content} = Layout;


function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
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
                            key: '2',
                            icon: <Link to={"/admin/course"}><VideoCameraOutlined/></Link>,
                            label: 'course',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined/>,
                            label: 'queue',
                        },
                        {
                            key: '4',
                            icon: <UploadOutlined/>,
                            label: 'group',
                        },
                        {
                            key: '5',
                            icon: <UploadOutlined/>,
                            label: 'admin',
                        },
                        {
                            key: '6',
                            icon: <Link to={"/admin/settings"}><SettingOutlined/></Link>,
                            label: 'settings',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <CustomHeader/>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >

                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
