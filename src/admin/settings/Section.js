import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Table, Tabs} from "antd";
import Permissions from "./Permissions";

const {TabPane} = Tabs;

const URL_FOR_GET_SECTION = "http://localhost:8080/api/v1/section/get";

const Section = () => {
    const [sectionList, setSectionList] = useState([]);
    // let list = [];
    const [data, setData] = useState({});

    const handleData = (data) => {
        setData(data);
    }

    useEffect(function () {
        axios.get(URL_FOR_GET_SECTION, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            if (res.data.statusCode === 200) {
                setSectionList(res.data.data);
                axios.get(URL_FOR_GET_SECTION + `/${res.data.data[0].id}`, {
                    headers:
                        {Authorization: localStorage.getItem("accessToken")}
                }).then(res => {
                    console.log("before success", res.data.data);
                    if (res.data.statusCode === 200) {
                        console.log("before set", res.data.data);
                        handleData(res.data.data);
                        console.log("after set", data);
                    }
                })
            }
        });
    }, [])

    const onChange = (id) => {
        //get single section by id
        axios.get(`${URL_FOR_GET_SECTION}/${id}`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            if (res.data.statusCode === 200) {
                setData(res.data.data);
            }
        });
    }

    return (
        <Tabs type="card">
            {sectionList.map((section) => {
                console.log("section", section);
                console.log("data", data);
                return <TabPane tab={section.name} key={section.id} onClick={() => onChange(section.id)}>
                    <Permissions data={data}/>
                </TabPane>
            })
            }
        </Tabs>
    );
}
export default Section;