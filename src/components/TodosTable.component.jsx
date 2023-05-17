import React from 'react'
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteTodo, editTodo } from './../store/actions/index'
import { useState } from 'react';

const TodosTable = ({ todos, deleteTodo, editTodo }) => {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedTodo, setSelected] = useState({ task: '' });


    const openDeleteDialog = todo => {
        setModal(!modal);
        setSelected(todo);
    }

    const openEditDialog = todo => {
        setEditModal(!editModal);
        setSelected(todo);
    }

    const deleteTodoHandler = () => {
        setModal(false);
        deleteTodo(selectedTodo.id);
    }

    const editTodoHandler = value => {
        setSelected({
            ...selectedTodo,
            task: value
        })
    }

    const saveEditHandler = () => {
        editTodo(selectedTodo);
        setEditModal(false);
    }
    return (
        <Container className="pt-1 mt-3" >
            <Row>
                <Col md={{ offset: 5, size: 2 }}>
                    <h2>Todos List</h2>
                </Col>
                <Col md={{ offset: 2, size: 8 }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.length === 0 && (
                                <tr className="py-3">
                                    <td >
                                        <h4 style={{textAlign: 'right'}}>
                                            No Todos in the List
                                       </h4>
                                    </td>
                                </tr>
                            )}
                            {
                                todos.map((todo, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{todo.id}</td>
                                            <td>{todo.task}</td>
                                            <td>
                                                <Button onClick={() => {
                                                    openDeleteDialog(todo)
                                                }} style={{ width: '70px' }} color="danger" className="mr-3">Delete</Button>
                                                <Button onClick={() => {
                                                    openEditDialog(todo)
                                                }} style={{ width: '70px' }} color="warning">Edit  </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Modal isOpen={modal} toggle={() => setModal(!modal)} >
                    <ModalHeader toggle={() => setModal(!modal)}>Delete Todo</ModalHeader>
                    <ModalBody>
                        Are You Sure You Want to Delete this Todo?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => deleteTodoHandler()}>Yes</Button>
                        <Button color="secondary" onClick={() => setModal(!modal)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Row>

            <Row>
                <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)} >
                    <ModalHeader toggle={() => setEditModal(!editModal)}>Edit Todo</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Todo</Label>
                                <Input onChange={e => {
                                    editTodoHandler(e.target.value)
                                }} value={selectedTodo.task} type="email" name="email" id="exampleEmail" placeholder="Add Todo Here ..." />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => saveEditHandler()}>Save</Button>
                        <Button color="secondary" onClick={() => setEditModal(!editModal)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Row>
        </Container>
    )
}
const mapStateToProps = state => {
    return {
        todos: state.todos.todosList
    }
}

export default connect(mapStateToProps, { deleteTodo, editTodo })(TodosTable);