import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Table, Tabs} from "antd";
import Permissions from "./Permissions";

const {TabPane} = Tabs;

const URL_FOR_GET_SECTION = "http://localhost:9000/api/v1/section/get";

const Section = () => {
    const [sectionList, setSectionList] = useState([]);
    const [data, setData] = useState({ content: [] });


    useEffect(function () {
        axios.get(URL_FOR_GET_SECTION, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            if (res.data.statusCode === 200) {
                setSectionList(res.data.data);
                axios.get(URL_FOR_GET_SECTION + `/${res.data.data[0].id}`, {
                    headers:
                        {Authorization: localStorage.getItem("accessToken")}
                }).then(res => {
                    if (res.data.statusCode === 200) {
                        setData(res.data.data);
                    }
                })
            }
        });
    }, [])

    const onChange = (id) => {
        console.log("on")
        axios.get(`${URL_FOR_GET_SECTION}/${id}`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            if (res.data.statusCode === 200) {
                console.log(res.data);
                setData(res.data.data);
            }
        });
    }

    return (
        <Tabs type="card">
            {sectionList.map((section) => {
                return <TabPane tab={section.name} key={section.id} onClick={() => onChange(section.id)}>
                    <Permissions data={data}/>
                </TabPane>
            })
            }
        </Tabs>
    );
}
export default Section;