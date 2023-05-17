import React from 'react'
import { Container, Row, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { addTodo } from './../store/actions/index'
import { useState } from 'react';

const TodosForm = ({ todos, addTodo }) => {
    const [todo, setTodo ] = useState('')
    const addTodoHandler = () => {
        addTodo(todo);
        setTodo('')
    }
    return (
        <Container className="pt-1 mt-5" >
            <Row>
                <Col md={{ size: 6, offset: 3 }}>
                    <Form>
                        <FormGroup>
                            <Input onChange={e => {
                                setTodo(e.target.value)
                            }} value={todo} type="email" name="email" id="exampleEmail" placeholder="Add Todo Here ..." />
                        </FormGroup>
                        <Button onClick={addTodoHandler}>Add Todo</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
const mapStateToProps = state => {
    return {
        todos: state.todos.todosList
    }
}

export default connect(mapStateToProps, {addTodo})(TodosForm);