import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import './test.css'
import axios from "axios";
import SectionTable from "../section/SectionTable";
import Permission from "../settings/Permission";
import CourseAddModal from "../course/CourseAddModal";
import GroupAddModal from "../group/GroupAddModal";
import CourseUpdateModal from "../course/CourseUpdateModal";

const {Header, Content, Footer, Sider} = Layout;


const Test = () => {

    const BASE_URL = "http://localhost:9000/api/v1/user/admin/section";
    const [currentPage, setCurrentPage] = useState(0);
    const [menuList, setMenuList] = useState([]);
    const [sectionData, setSectionData] = useState();
    const [page, setPage] = useState(0);
    const [courseModalOpen, setCourseModalOpen] = useState(false);
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [updatingModal, setUpdatingModal] = useState("");
    const [search, setSearch] = useState("");
    const [currentSectionName, setCurrentSectionName] = useState("");

    const [idForActiveMenu, setId] = useState(0);


    const handleClick = (menu) => {

        setId(menu.id)
        setCurrentSectionName(menu.sectionName);
        if (menu.sectionName === 'permission')
            return;

        axios.get(`${BASE_URL}/data?id=${menu.id}`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            if (res.data.statusCode === 200) {
                setSectionData(res.data.data);
            } else
                throw Error(res.data);
        }).catch(err => {
            setSectionData(undefined);
        })
    }

    function getSectionData(hasNext) {
        console.log(hasNext, currentPage)
        let helper = currentPage;
        if (hasNext === 1)
            helper++;
        else if (hasNext === -1)
            helper--;
        console.log(`${BASE_URL}/data?id=${idForActiveMenu}&pageNumber=${helper}`)
        axios.get(`${BASE_URL}/data?id=${idForActiveMenu}&pageNumber=${helper}`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then((res) => {
            if (res.data.statusCode === 200) {
                console.log(res.data)
                setSectionData(res.data.data)
                setPage(res.data.data.totalPages)
                setCurrentPage(helper)
            }
        })
    }

    const onSearch = (value) => {
        setSearch(value)

        axios.get(`${BASE_URL}/${currentSectionName}/get?name=${value}`).then((res) => {
            if (res.data.status) {
                console.log(res.data.data)
                setSectionData({...res.data.data})
            }
        }).catch((err) => {
            console.log(err)
        })
    };

    function toggle(sectionName) {
        // setUpdatingModal(id)
        if(sectionName.toLowerCase().indexOf("course") !== -1){
            setCourseModalOpen(!courseModalOpen)
        }
        else if(sectionName.toLowerCase().indexOf("group") !== -1){
            setGroupModalOpen(!groupModalOpen)
        }

    }

    function toggleUpdate(id) {
        setUpdatingModal(id)
        setUpdateModalOpen(!updateModalOpen)
    }

    function deleteSectionItem(sectionName, id) {
        axios.delete(`${BASE_URL}/${sectionName}?id=${id}`).then((res) => {
            if (res.status === 204) {
                getSectionData(0)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
            axios.get(`${BASE_URL}`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            // if (res.data.statusCode === 200) {
            console.log(res.data)
            setMenuList(res.data)
            // }
        });
    }, [sectionData])

    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <ul>
                    {menuList.map((menu, index) => {
                        return <li key={menu.id} style={{backgroundColor: "#387"}} onClick={() => handleClick(menu)}>
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
                    <h1>{currentSectionName}</h1>
                    {currentSectionName === 'permission' ? <Permission/> :
                        sectionData && <SectionTable data={sectionData}
                                                  getSectionData={getSectionData}
                                                  onSearch={onSearch}
                                                  toggleUpdate={toggleUpdate}
                                                  deleteSectionItem={deleteSectionItem}
                                                  toggle={toggle}
                                                  sectionName={currentSectionName}
                    />}

                    <button disabled={currentPage === 0} className={"btn btn-primary"}
                            onClick={() => getSectionData(-1)}>prev
                    </button>
                    <button className={"btn btn-primary m-2"}>{currentPage}</button>
                    <button disabled={currentPage === page - 1} className={"btn btn-primary"}
                            onClick={() => getSectionData(1)}>next
                    </button>
                    {courseModalOpen ? <CourseAddModal  toggle={toggle} getSectionData={getSectionData} /> : "" }
                    <CourseUpdateModal isOpen={updateModalOpen} toggle={toggleUpdate} updatingModal={updatingModal}
                                       getSectionData={getSectionData}/>
                    {groupModalOpen ? <GroupAddModal  toggle={toggle} getSectionData={getSectionData} /> : "" }
                </Content>
            </Layout>
        </Layout>
    );
};

export default Test;