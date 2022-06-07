import {Button, Checkbox, Switch, Table, Tabs} from "antd";
import React, {useEffect} from "react";
import axios from "axios";
import {useState} from "react";

const {TabPane} = Tabs;

const columns = [
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
    },
    {
        title: 'Visibility',
        dataIndex: 'visibility',
        key: 'visibility'
    },
    {
        title: 'Edit btn',
        dataIndex: 'edit',
        key: 'edit'
    },
    {
        title: 'Delete btn',
        dataIndex: 'delete',
        key: 'delete'
    },
    {
        title: 'Info btn',
        dataIndex: 'info',
        key: 'info'
    },
];


const Permissions = (props) => {
    const [switchStatus, setSwitchStatus] = useState([false, false, false]);
    const [data, setData] = useState({
        sectionName: "A",
        content: [
            {
                roleName: "ROLE_USER",
                permissions: {
                    visibility: true,
                    update: false,
                    delete: false,
                    info: false
                }
            },
            {
                roleName: "ROLE_ADMIN",
                permissions: {
                    visibility: true,
                    update: true,
                    delete: false,
                    info: false
                }
            },
            {
                roleName: "ROLE_SUPER",
                permissions: {
                    visibility: true,
                    update: true,
                    delete: true,
                    info: true
                }
            }
        ]
    })
    const [arr, setArr] = useState([]);

    const switchBtnOnChange = (id) => {
        switchStatus[id] = !switchStatus[id];
        setSwitchStatus(switchStatus);
    }

    const onChange = () => {

    }

    function updateDate() {
        if(data && data.content) {
            data.content.map((el, i) => {
                arr.push({
                    key: i,
                    role: el.roleName,
                    visibility: <Switch onChange={() => {
                        switchBtnOnChange(i)
                    }}/>,
                    update: <Checkbox disabled={!switchStatus[i]} defaultChecked={el.permissions.update}/>,
                    delete: <Checkbox disabled={!switchStatus[i]} defaultChecked={el.permissions.delete}/>,
                    info: <Checkbox disabled={!switchStatus[i]} defaultChecked={el.permissions.info}/>,
                });
                 setArr(arr);
            });
        }
    }

    useEffect(() => {
        setArr(updateDate);
    })

    return (
        <Tabs onChange={onChange} type="card" key={data.sectionName}>
            <TabPane tab={data.sectionName}  key="1">
                <Table dataSource={arr} columns={columns}/>
            </TabPane>
        </Tabs>
    );
};

export default Permissions;