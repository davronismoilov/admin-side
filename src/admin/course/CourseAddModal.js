import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import axios from "axios";


const CourseAddModal = ({isOpen, toggle, getSectionData}) => {
    const [courseData, setCourseData] = useState({});
    const BASE_URL ='http://localhost:9000/api/v1/course';

    function handleSubmit() {
        axios.post(`${BASE_URL}/add`, courseData, {headers: {Authorization: localStorage.getItem("accessToken")}}).then((res) => {
            console.log(res)
            toggle("course")
            clearInput()
            getSectionData(0)
        }).catch((err) => {
            console.log(err)
        })
    }

    function clearInput() {
        setCourseData({});
    }

    return (
        <div>
            <Modal isOpen={isOpen} toggle={() => toggle("course")}>
                <ModalHeader>Add new Course: </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="courseName">Name: </Label>
                            <Input type="text" name="name" id="courseName" placeholder="Enter a course name"
                                   onChange={(e) => {
                                       courseData.name = e.target.value;
                                       setCourseData({...courseData})
                                   }}
                                   value={courseData.name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="courseDescription">Description: </Label>
                            <Input type="textarea" name="description" id="courseDescription"
                                   placeholder="Enter a course description"
                                   onChange={(e) => {
                                       courseData.description = e.target.value;
                                       setCourseData({...courseData});
                                   }}
                                   value={courseData.description}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="coursePrice">Price: </Label>
                            <Input type="number" name="price" id="coursePrice"
                                   placeholder="Enter a course price"
                                   onChange={(e) => {
                                       courseData.price = e.target.value;
                                       setCourseData({...courseData});
                                   }}
                                   value={courseData.price}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="courseDuration">Duration: </Label>
                            <Input type="number" name="duration" id="courseDuration"
                                   placeholder="Enter a course duration"
                                   onChange={(e) => {
                                       courseData.duration = e.target.value;
                                       setCourseData({...courseData})
                                   }}
                                   value={courseData.duration}
                            />
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

export default CourseAddModal