import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import './test.css'
import axios from "axios";
import SectionTable from "../section/SectionTable";

const {Header, Content, Footer, Sider} = Layout;


const Test = () => {

    const [menuList,setMenuList] = useState([])
    const [sectionData, setSectionData] = useState();

    const handleClick = (sectionId) => {
        axios.get(`http://localhost:9000/api/v1/section?id=${secionId}`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            if(res.statusCode === 200){
                setSectionData(res.data.data);
            }
            else
                throw Error(res.data);
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:9000/api/v1/section`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            // if (res.data.statusCode === 200) {
                console.log(res.data)
                setMenuList(res.data)
            // }
        });
    },[])

    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <ul>
                    {menuList.map((menu, index)=>{
                        return <li key={menu.id} onClick={() => handleClick(menu.id)}>
                            {menu.sectionName}
                        </li>
                    })}
                </ul>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
                <Content>
                    {sectionData && <SectionTable data={sectionData}/>}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Test;