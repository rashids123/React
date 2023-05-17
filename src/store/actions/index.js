import { SET_INITIAL_TODOS, ADD_TODO } from "./types"
import axios from 'axios';
const serverURL = 'http://localhost:4000'



export const getAllTodos = () => dispatch => {
    axios.get(`${serverURL}/todos`).then(res => {
        let todos = res.data;
        dispatch({
            type: SET_INITIAL_TODOS,
            payload: todos
        })
    }).catch(err => {
        console.log("err err ", err)
    })
}

export const addTodo = (task) => dispatch => {
    axios.post(`${serverURL}/todos`, {
        task
    }).then((res) => {
        let todos = res.data;
        dispatch({
            type: ADD_TODO,
            payload: todos
        });
        dispatch(getAllTodos())
    }).catch(err => {
        console.log("err err ", err)
    })
}

export const deleteTodo = (id) => dispatch => {
    axios.delete(`${serverURL}/todos/${id}`).then(res => {
        dispatch(getAllTodos())
    }).catch(err => {
        console.log("err err ", err)
    })
}


export const editTodo = (todo) => dispatch => {
    console.log("Todo todo todo action ::::::::: ", todo)
    axios.put(`${serverURL}/todos/${todo.id}`, {
        task: todo.task
    }).then((res) => {
        // let todos = res.data;
        // dispatch({
        //     type: ADD_TODO,
        //     payload: todos
        // });
        dispatch(getAllTodos())
    }).catch(err => {
        console.log("err err ", err)
    })
}