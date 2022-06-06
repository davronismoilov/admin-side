import React, {useEffect, useState} from 'react';
import {Tabs, Table, Switch, Button, Checkbox} from 'antd';
import axios from "axios";

const {TabPane} = Tabs;


const columns = [
    {
        title: 'Role',
        dataIndex: 'role',
    },
    {
        title: 'Visibility',
        dataIndex: 'visibility',
    },
    {
        title: 'Info btn',
        dataIndex: 'info',
    },
    {
        title: 'Edit btn',
        dataIndex: 'edit',
    },
    {
        title: 'Delete btn',
        dataIndex: 'delete',
    },
];


    // const SaveButton = () => <Button type="primary" block>Save</Button>



const MainSettings = () => {
    const [switchBtnStatus, setSwitchBtnStatus] = useState([false, false, false]);
    const [checkboxBtnStatusInfo, setCheckboxBtnStatusInfo] = useState([false, false, false]);
    const [checkboxBtnStatusEdit, setCheckboxBtnStatusEdit] = useState([false, false, false]);
    const [checkboxBtnStatusDelete, setCheckboxBtnStatusDelete] = useState([false, false, false]);
    const [data, setData] = useState([]);
    let [permissions, setPermissions] = useState({name:"", permissions:[{role: "", list:[]}]});

    const switchBtnOnChange = (id) => {
        console.log(id);
        switchBtnStatus[id] = !switchBtnStatus[id];
        setSwitchBtnStatus(switchBtnStatus);
        console.log(switchBtnStatus);
    }


    const onChange = (ind, btn) => {
        switch (btn){
            case "info" :
                checkboxBtnStatusInfo[ind] = !checkboxBtnStatusInfo[ind];
                setCheckboxBtnStatusInfo(checkboxBtnStatusInfo);
                break;
            case "edit" :
                checkboxBtnStatusEdit[ind] = !checkboxBtnStatusEdit[ind];
                setCheckboxBtnStatusEdit(checkboxBtnStatusEdit);
                break;
            default :
                checkboxBtnStatusDelete[ind] = !checkboxBtnStatusDelete[ind];
                setCheckboxBtnStatusDelete(checkboxBtnStatusDelete);
        }
    };


    function updateDate() {
        let arr = [];
        for (let i = 0; i < 3; i++) {
            arr.push({
                key: i,
                role: `USER_ROLE`,
                visibility: <Switch onChange={() => {
                    switchBtnOnChange(i)
                }}/>,
                info: switchBtnStatus[i] ? <Checkbox onChange={() => onChange(i, "info")}/> : <Checkbox disabled/>,
                edit: switchBtnStatus[i] ? <Checkbox onChange={() => onChange(i, "edit")}/> : <Checkbox disabled/>,
                delete: switchBtnStatus[i] ? <Checkbox onChange={() => onChange(i, "delete")}/> : <Checkbox disabled/>,
            });
        }
        return arr;
    }

    useEffect(() => {
        setData(updateDate())
    })

    function saveBtnOnclick(panelName){
        permissions = {
            name: panelName,
            permissions: [
                {
                  role: "ROLE_USER",
                  list: [checkboxBtnStatusInfo[0], checkboxBtnStatusEdit[0], checkboxBtnStatusDelete[0]],
                },
                {
                    role: "ROLE_ADMIN",
                    list: [checkboxBtnStatusInfo[1], checkboxBtnStatusEdit[1], checkboxBtnStatusDelete[1]],
                },
                {
                    role: "ROLE_SUPER_ADMIN",
                    list: [checkboxBtnStatusInfo[2], checkboxBtnStatusEdit[2], checkboxBtnStatusDelete[2]],
                },
            ]
        }

        setPermissions(permissions);

        console.log(permissions);
        // axios.post("http://localhost:8080/api/v1/permission", permissions).then(res => {
        //     console.log(res);
        // })
    }


    return (
        <Tabs onChange={onChange} type="card">
            <TabPane tab="User panel" key="1"> <Table dataSource={data} columns={columns}/>
                <Button type="primary" block onClick={() =>{
                    saveBtnOnclick("user");
                }}>Save</Button></TabPane>
            <TabPane tab="Course panel" key="2"> <Table dataSource={data} columns={columns}/><Button type="primary"  block onClick={() =>{
                saveBtnOnclick("course");
            }}
            >Save</Button></TabPane>
            <TabPane tab="Group panel" key="3"> <Table dataSource={data} columns={columns}/><Button type="primary" block onClick={() =>{
                saveBtnOnclick("group");
            }}
            >Save</Button></TabPane>
        </Tabs>
    );
}

export default MainSettings;