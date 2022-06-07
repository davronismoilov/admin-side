import {Button, Checkbox, Switch, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";

const {TabPane} = Tabs;

const URI = "localhost";

const Permissions = (props) => {
    const [switchStatus, setSwitchStatus] = useState([false, false, false]);

    const [data, setData] = useState(
        {
            "data": {
                "id": 2,
                "sectionName": "queue",
                "content": [
                    {
                        "ordinal": 0,
                        "roleName": "ROLE_USER",
                        "permissions": {
                            "visibility": false,
                            "update": true,
                            "delete": false,
                            "info": false
                        }
                    },
                    {
                        "ordinal": 1,
                        "roleName": "ROLE_ADMIN",
                        "permissions": {
                            "visibility": false,
                            "update": true,
                            "delete": false,
                            "info": true
                        }
                    },
                    {
                        "ordinal": 2,
                        "roleName": "ROLE_OWNER",
                        "permissions": {
                            "visibility": true,
                            "update": true,
                            "delete": true,
                            "info": true
                        }
                    }
                ]
            }
        })

    const switchBtnOnChange = (id) => {
        switchStatus[id] = !switchStatus[id];
        setSwitchStatus([...switchStatus]);
        data.content[id].permissions.visibility = switchStatus[id];
    }

    const saveBtnOnclick = () => {
        axios.post(URI, data).then(r => {
                console.log(r.status)
            }
        )
    }

    const handleChange = (ordinal, key) => {
        data.content[ordinal].permissions[key] = !data.content[ordinal].permissions[key];
        setData({...data});
    }

    return (
        <Tabs type="card" key={data.sectionName}>
            <TabPane tab={data.sectionName} key="1">

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
                    {data.content.map((perm, i) => {
                        return <tr key={perm.key}>
                            <td>{perm.roleName}</td>
                            <td><Switch onChange={() => {
                                switchBtnOnChange(perm.permissions.ordinal)
                            }}/></td>
                            <td><Checkbox disabled={!switchStatus[perm.permissions.ordinal]}
                                          defaultChecked={perm.permissions.delete} onChange={() => {
                                handleChange(perm.permissions.ordinal, "update")
                            }}/></td>
                            <td><Checkbox disabled={!switchStatus[perm.permissions.ordinal]}
                                          defaultChecked={perm.permissions.update} onChange={() => {
                                handleChange(perm.permissions.ordinal, "delete")
                            }}/></td>
                            <td><Checkbox disabled={!switchStatus[perm.permissions.ordinal]}
                                          defaultChecked={perm.permissions.info} onChange={() => {
                                handleChange(perm.permissions.ordinal, "info")
                            }}/></td>
                        </tr>
                    })}
                    <Button type="primary" block onClick={saveBtnOnclick}> Save</Button>
                    </tbody>
                </table>
            </TabPane>
        </Tabs>
    );
};

export default Permissions;