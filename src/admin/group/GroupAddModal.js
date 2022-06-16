import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import axios from "axios";
import {DatePicker, Select, Space} from "antd";
import {Option} from "antd/es/mentions";


const GroupAddModal = ({isOpen, toggle, getSectionData}) => {
    const [groupData, setGroupData] = useState({});

    function handleSubmit() {
        axios.post("http://localhost:9000/api/v1/group/add", groupData, {headers: {Authorization: localStorage.getItem("accessToken")}}).then((res) => {
            console.log(res)
            toggle()
            clearInput()
            getSectionData(0)
        }).catch((err) => {
            console.log(err)
        })
    }

    function clearInput() {
        setGroupData({});
    }

    function handleSelect(value){
        groupData.type = value;
        setGroupData({...groupData});
    }

    const handleDate = (date, dateString) => {
        groupData.startDate = dateString;
        setGroupData({...groupData});
    }

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="groupName">Name</Label>
                            <Input type="text" name="name" id="groupName" placeholder="Enter a group name"
                                   onChange={(e) => {
                                       groupData.name = e.target.value;
                                       setGroupData({...groupData})
                                   }}
                                   value={groupData.name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="groupMemberCount">Description</Label>
                            <Input type="number" name="membersCount" id="groupMemberCount"
                                   placeholder="Enter a number of members"
                                   onChange={(e) => {
                                       groupData.membersCount = e.target.value;
                                       setGroupData({...groupData});
                                   }}
                                   value={groupData.membersCount}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="type">Gender</Label>
                                <Select
                                    defaultValue="MALE"
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleSelect}
                                >
                                    <Option value="MALE">Male</Option>
                                    <Option value="FEMALE">Female</Option>
                                </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="startDate">Start date</Label>
                            <Space direction="vertical">
                                <DatePicker onChange={handleDate} />
                            </Space>
                        </FormGroup>
                        <Col sm={{size: 8, offset: 8}}>
                            <Button color="secondary" onClick={() => {
                                toggle();
                                clearInput()
                            }}>Cancel</Button>
                            <Button color={"danger"} className={"float-right mx-1"}
                                    onClick={handleSubmit}>Submit</Button>
                        </Col>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default GroupAddModal