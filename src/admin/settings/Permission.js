import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Checkbox, Switch, Table, Tabs} from "antd";
import "./mainSettings.css";

const {TabPane} = Tabs;

const URL_FOR_GET_SECTION = "http://localhost:9000/api/v1/section/get";
const URL_FOR_POST_PERMISSION = "http://localhost:9000/api/v1/section/edit";
const Permission = () => {
    console.log("Permission")
    const [sectionList, setSectionList] = useState([]);
    const [data, setData] = useState({content:[]});
    const [switchStatus, setSwitchStatus] = useState([false, false, false]);


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
        axios.get(`${URL_FOR_GET_SECTION}/${id}`, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(res => {
            if (res.data.statusCode === 200) {
                setData({...res.data.data});
            }
        });
    }

    
    const switchBtnOnChange = (id, i) => {
        switchStatus[id] = !switchStatus[id];
        setSwitchStatus([...switchStatus]);
        data.content[i].permissions.visibility = !data.content[i].permissions.visibility;
        setData({...data});
    }

    const saveBtnOnclick = () => {

        switchStatus.forEach((el, i) => data.content[i].permissions.visibility = switchStatus[i]);
        console.log("DATA", data)
        axios.post(URL_FOR_POST_PERMISSION, data, {headers: {Authorization: localStorage.getItem("accessToken")}}).then(resp => {
                if (resp.data.statusCode === 200)
                    console.log('data updated');
            }
        )
    }

    const handleChange = (ordinal, key) => {
        console.log("onchenge:", key);
        data.content[ordinal].permissions[key] = !data.content[ordinal].permissions[key];
    }


    return (
        <div>
            <ul className={"nav nav-navbar"}>
                {
                    sectionList.map((section) => {
                        return <li className={""} key={section.id}>
                            <button className={"ant-btn-primary"} onClick={()=>onChange(section.id)}>
                                {section.name}
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
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
                        console.log("IIIIIIIIII",perm);
                        return <tr key={perm.ordinal}>
                            <td>{perm.roleName}</td>
                            <td><Switch defaultChecked={perm.permissions.visibility} onClick={() => {
                                switchBtnOnChange(perm.ordinal, i)
                            }}/></td>
                            <td><Checkbox disabled={!switchStatus[perm.ordinal]}
                                          defaultChecked={perm.permissions.update} onClick={() => {
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
            </div>
        </div>
    );
}
export default Permission;