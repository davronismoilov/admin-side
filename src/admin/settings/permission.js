import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Checkbox, Switch} from "antd";
import "./permission.css";
import {connect} from "react-redux";


function Permission() {
    const BASE_URL = "http://localhost:9000/api/v1/user/admin/section";
    const [sectionList, setSectionList] = useState([]);
    const [data, setData] = useState({content: []});
    const [switchStatus, setSwitchStatus] = useState([]);
    const [newState, setNewState] = useState(false);


    useEffect(function () {
        axios.get(`${BASE_URL}/get`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            if (res.data.statusCode === 200) {
                setSectionList(res.data.data);
                axios.get(`${BASE_URL}/get/${res.data.data[0].id}`, {
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
        axios.get(`${BASE_URL}/get/${id}`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            if (res.data.statusCode === 200) {
                setData({...res.data.data});
                setNewState(false);
            }
        });
    }


    const switchBtnOnChange = (id, i) => {
        switchStatus[id] = !switchStatus[id];
        setSwitchStatus([...switchStatus]);
        data.content[i].permissions.visibility = !data.content[i].permissions.visibility;
        setData({...data});
        setNewState(true);
    }

    const saveBtnOnclick = () => {
        switchStatus.forEach((el, i) => data.content[i].permissions.visibility = switchStatus[i]);
        axios.post(`${BASE_URL}/edit`, data, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(resp => {
                if (resp.data.statusCode === 200)
                    console.log('data updated');
                setNewState(false);
            }
        )
    }

    const handleChange = (ordinal, key) => {
        data.content[ordinal].permissions[key] = !data.content[ordinal].permissions[key];
    }


    return (

        <div>
            <ul className={"nav nav-navbar"}>
                {
                    sectionList.map((section) => <ol key={section.id}>
                            <button className={"btn btn-primary"} onClick={() => onChange(section.id)}>
                                {section.sectionName}
                            </button>
                        </ol>
                    )
                }
            </ul>
            <div>
                <table className={"table table-primary table-bordered table-hover"}>
                    <thead>
                    <tr>
                        <th>Role</th>
                        <th>Visibility</th>
                        <th>Update</th>
                        <th>Delete</th>
                        <th>Info</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.content.map((perm, i) => <tr key={perm.ordinal}>
                            <td>{perm.roleName}</td>
                            <td>
                                <Switch
                                    defaultChecked={newState && perm.permissions.visibility} onClick={() => {
                                    switchBtnOnChange(perm.ordinal, i)
                                }}/>
                            </td>
                            <td>
                                <Checkbox
                                    disabled={!switchStatus[perm.ordinal]}
                                    defaultChecked={perm.permissions.update} onClick={() => {
                                    handleChange(perm.ordinal, "update")
                                }}/>
                            </td>
                            <td>
                                <Checkbox
                                    disabled={!switchStatus[perm.ordinal]}
                                    defaultChecked={perm.permissions.delete} onChange={() => {
                                    handleChange(perm.ordinal, "delete")
                                }}/>
                            </td>
                            <td>
                                <Checkbox
                                    disabled={!switchStatus[perm.ordinal]}
                                    defaultChecked={perm.permissions.info} onChange={() => {
                                    handleChange(perm.ordinal, "info")
                                }}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <Button type="primary" block onClick={saveBtnOnclick}> Save</Button>

            </div>
        </div>
    )
}

export default connect()(Permission);