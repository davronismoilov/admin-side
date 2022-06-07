import axios from "axios";
import React, {useState} from "react";
import {Button, Table, Tabs} from "antd";
import Permissions from "./Permissions";

const {TabPane} = Tabs;

const URL_FOR_GET_SECTION = "http://localhost:9000/api/v1/section/get";

const Section = () => {
    const [sectionList, setSectionList] = useState([]);
    const [data, setData] = useState({});

    axios.get(URL_FOR_GET_SECTION).then(res => {
        if (res.data.statusCode === 200) {
            setSectionList(res.data.data);
            const URL_FOR_GET_FIRST_SECTION_DATA = `${URL_FOR_GET_SECTION}/${sectionList[0].id}`;
            axios.get(URL_FOR_GET_FIRST_SECTION_DATA).then(res => {
                if (res.data.statusCode === 200) {
                    setData(res.data.data);
                }
            })
        }
    });

    const onChange = (id) => {
        //get single section by id
        axios.get(`${URL_FOR_GET_SECTION}/${id}`).then(res => {
            if (res.data.statusCode === 200) {
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