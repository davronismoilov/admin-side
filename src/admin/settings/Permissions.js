import {Checkbox, Switch, Tabs} from "antd";
import React, {useEffect, useState} from "react";

const {TabPane} = Tabs;



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
        setSwitchStatus([...switchStatus]);
    }

    const onChange = () => {

    }

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
                    {data.content.map((perm, cnt) => {
                        return <tr key={perm.key}>
                            <td>{perm.roleName}</td>
                            <td><Switch onChange={() => {
                                switchBtnOnChange(cnt)
                            }}/></td>
                            <td><Checkbox disabled={!switchStatus[cnt]} defaultChecked={perm.permissions.update} /></td>
                            <td><Checkbox disabled={!switchStatus[cnt]} defaultChecked={perm.permissions.delete} /></td>
                            <td><Checkbox disabled={!switchStatus[cnt]} defaultChecked={perm.permissions.info} /></td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </TabPane>
        </Tabs>
    );
};

export default Permissions;