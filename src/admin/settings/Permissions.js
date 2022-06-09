import {Button, Checkbox, Switch, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";

const {TabPane} = Tabs;

const URL_FOR_POST_PERMISSION = "http://localhost:8080/api/v1/section/edit";

const Permissions = (props) => {
    const [switchStatus, setSwitchStatus] = useState([false, false, false]);
    // const [data, setData] = useState();
    console.log(props);
    // TODO data SHOULD BE TAKEN FROM props
    const [data, setData] = useState(props.data);

    console.log(data);

    const switchBtnOnChange = (id) => {
        switchStatus[id] = !switchStatus[id];
        setSwitchStatus([...switchStatus]);
    }

    const saveBtnOnclick = () => {
        switchStatus.map((el, i) => data.data.content[i].permissions.visibility = switchStatus[i]);
        setData({...data});
        axios.post(URL_FOR_POST_PERMISSION, data, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(resp => {
                if(resp.data.statusCode === 200)
                    console.log('data updated');
            }
        )
    }

    const handleChange = (ordinal, key) => {
        data.data.content[ordinal].permissions[key] = !data.data.content[ordinal].permissions[key];
        setData({...data});
    }

    return (
        <Tabs type="card" key={data.sectionName}>
            <TabPane tab={data.sectionName} key="1">

                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>role</th>
                        <th>visibility</th>
                        <th>update</th>
                        <th>delete</th>
                        <th>info</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.content.map((perm, i) => {
                        return <tr key={perm.ordinal}>
                            <td>{perm.roleName}</td>
                            <td><Switch onChange={() => {
                                switchBtnOnChange(perm.ordinal)
                            }}/></td>
                            <td><Checkbox disabled={!switchStatus[perm.ordinal]}
                                          defaultChecked={perm.permissions.update} onChange={() => {
                                handleChange(perm.ordinal, "update")
                            }}/></td>
                            <td><Checkbox disabled={!switchStatus[perm.ordinal]}
                                          defaultChecked={perm.permissions.delete} onChange={() => {
                                handleChange(perm.ordinal, "delete")
                            }}/></td>
                            <td><Checkbox disabled={!switchStatus[perm.ordinal]}
                                          defaultChecked={perm.permissions.info} onChange={() => {
                                handleChange(perm.ordinal, "info")
                            }}/></td>
                        </tr>
                    })}
                    </tbody>
                </table>
                    <Button type="primary" block onClick={saveBtnOnclick}> Save</Button>
            </TabPane>
        </Tabs>
    );
};

export default Permissions;