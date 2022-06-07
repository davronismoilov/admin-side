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
    const [arr, setArr] = useState([data.content]);

    const switchBtnOnChange = (id) => {
        switchStatus[id] = !switchStatus[id];
        setSwitchStatus(switchStatus);
    }

    const onChange = () => {

    }

    function updateData() {

        let rowTable = [];
        data.content.map((el, ind) => {
            rowTable.push({
                key: ind,
                role: el.roleName,
                visibility: el.permissions.visibility,
                update: el.permissions.update,
                delete: el.permissions.delete,
                info: el.permissions.info
            })
        })
        return rowTable;
    }

    useEffect(() => {
        setArr(updateData);
    }, [])

    return (
        <Tabs onChange={onChange} type="card" key={data.sectionName}>
            <TabPane tab={data.sectionName}  key="1">

                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>role</th>
                        <th>visibility</th>
                        <th>update</th>
                        <th>delete</th>
                        <th>info</th>
                    </tr>
                    </thead>
                    <tbody>
                    {arr.map((perm, cnt) => {
                        return <tr key={perm.key}>
                            <td>{perm.role}</td>
                            <td><Switch onChange={() => {
                                switchBtnOnChange(cnt)
                            }}/></td>
                            <td><Checkbox disabled={!switchStatus[cnt]} defaultChecked={perm.update} /></td>
                            <td><Checkbox disabled={!switchStatus[cnt]} defaultChecked={perm.delete} /></td>
                            <td><Checkbox disabled={!switchStatus[cnt]} defaultChecked={perm.info} /></td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </TabPane>
        </Tabs>
    );
};

export default Permissions;