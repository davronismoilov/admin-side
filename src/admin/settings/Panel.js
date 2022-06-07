import axios from "axios";
import React, {useState} from "react";
import {Button, Table, Tabs} from "antd";
import Permissions from "./Permissions";

const {TabPane} = Tabs;

const GET_SINGLE_PANEL_URL = "http://localhost:8080/get"
const GET_PANEL_DATA_URL = "http://localhost:8080/get"

const Panel = () => {
    const [panelList, setPanel] = useState([]);
    const [data, setData] = useState({});

    const onChange = (id) => {
        axios.get(GET_PANEL_DATA_URL).then(res => {
            if (res.statusCode === 200) {
                setData(res.data.data);
            }
        });
    }

    // axios.get(GET_SINGLE_PANEL_URL).then(res => {
    //     if (res.statusCode === 200) {
    //         setPanel(res.data.data);
    //     }
    // });

    return (
        <Tabs onChange={() => onChange()} type="card">
            {panelList.map((id, panel) => {
                return <TabPane tab={panel} key={id} onClick={() => onChange(id)}>
                    <Permissions data={data}/>
                </TabPane>
            })
            }

        </Tabs>
    );
}
export default Panel;