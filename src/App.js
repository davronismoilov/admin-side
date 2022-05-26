//     state = {
//         // count: 0
//     }
    //
    // increment = () => {
    //     this.setState({
    //         count: this.state.count + 1
    //     });
    // }
    //
    // decrement = () => {
    //     if (this.state.count > 0)
    //     this.setState({
    //         count: this.state.count - 1
    //     });
    // }

import React, {Component} from 'react';
import {Button, Col, Container, Input, InputGroup, ListGroup, ListGroupItem, Progress, Row} from "reactstrap";

class App extends Component {

    state = {
        completed: 0,
        task: "",
        todos: []
    }

    handleInputChange = (e) => {
        this.setState({
            task: e.target.value
        })
    }

    add = () => {
        if (this.state.task.length >= 1)
        this.setState({
            todos: this.state.todos.concat(
                {
                    task: this.state.task,
                    isComplete: false
                }
            ),
            task : ""
        })
    }

    complete = (e) => {
        let cnt = 0;
        this.setState({
            todos: this.state.todos.map((todos) => {
                if (e.target.value == todos.id){
                    todos.isCompleted = !todos.isCompleted
                }
                if (todos.isCompleted)
                    cnt ++;
                return todos;
            }),
            completeTask: cnt
        })
    }

    render() {
        return (
            <div>
                <Container className={"bg-light pt-5 border-2 border-dark"}>
                    <Row>
                        <Col md={{size: 8, offset: 2}}>
                            <InputGroup>
                                <Input onChange={this.handleInputChange} value={this.state.task}/>
                                <Button onClick={this.add}>
                                    Add Task
                                </Button>
                            </InputGroup>

                            <ListGroup flush>
                                {this.state.todos.map((todos) => {
                                    return <ListGroupItem
                                        disabled
                                        href = "#"
                                        tag = "a">
                                        {todos.task}
                                        <Input onClick={this.complete} type={'checkbox'} value={todos.id} checked={todos.isCompleted}/>
                                    </ListGroupItem>
                                })}
                            </ListGroup>
                            <br/>
                            <Progress color="success" value={this.state.completeTask * 100 / this.state.todos.length}/>
                            <br/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

App.propTypes = {};

export default App;