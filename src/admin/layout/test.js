import React, {useState} from 'react';
import {Breadcrumb, Layout, Menu} from 'antd';
import {
    FileOutlined,
    LogoutOutlined,
    SafetyCertificateOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
    UserSwitchOutlined,
    DingdingOutlined
} from '@ant-design/icons';
import './test.css'
import {Link, Route, Routes} from "react-router-dom";
import User from "../user/user";
import Course from "../course/course";
import Section from "../settings/Section";
import Permissions from "../settings/Permissions";

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [

    getItem('User', 'sub1', <Link to={"/admin/user"}><UserOutlined/></Link>),
    getItem('Course', 'sub2', <Link to={"/admin/course"}><TeamOutlined/></Link>),
    getItem('Groups', '8',  <Link to={"/admin/groups"}><FileOutlined/></Link>),
    getItem('Settings', '9', <SettingOutlined/>, [
        getItem('Profile', '100', <Link to={"/admin/profile"}><UserSwitchOutlined/></Link>),
        getItem('Permissions', '101',<Link to={"/admin/permissions"}><SafetyCertificateOutlined/></Link> ),
        getItem('Logout', '102', <Link to={"/admin/logout"}><LogoutOutlined/></Link>),
    ]),
];

const Test = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                {/*<div className="logo"> <DingdingOutlined className="icn"/></div>*/}
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
                <Content
                    style={{
                        // margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            // margin: '16px 0',
                        }}
                    >

                    </Breadcrumb>

                    <Routes>
                        <Route exact={true} path={"/admin/user"} element={<User/>}/>
                        <Route exact={true} path={"/admin/course"} element={<Course/>}/>
                        <Route exact={true} path={"/admin/permissions"} element={<Section/>}/>
                        {/*<Route exact={true} path={"/admin/profile"} element={<Permissions/>}/>*/}
                    </Routes>


                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Test;