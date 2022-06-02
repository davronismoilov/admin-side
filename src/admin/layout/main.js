import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import React, {useState} from 'react';
import './main.css';
import {Link, Route, Routes} from "react-router-dom";
import User from "../user/user";
import Course from "../course/course";

const {Header, Sider, Content} = Layout;

const MainLayout = () => {
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
                            key: '1',
                            icon: <Link to={"/admin/user"}><UserOutlined/></Link>,
                            label: 'user',
                        },
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
            </Layout>
        </Layout>
    );
};

export default MainLayout;