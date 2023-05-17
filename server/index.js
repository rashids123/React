const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const data = require('./db')
const cors = require('cors');
let DATA = data.data;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json(data)
})

app.get('/todos', (req, res) => {
    let todos = DATA.todosList;
    res.json(todos)
});

app.get('/todos/:id', (req, res) => {
    let todo = DATA.todosList[req.params.id];
    res.json(todo)
});

app.delete('/todos/:id', (req, res) => {
    let currentIndex = DATA.todosList.findIndex(todo => todo.id == req.params.id);
    DATA.todosList.splice(currentIndex, 1);
    return res.json(DATA.todosList)
})
app.post('/todos', (req, res) => {
    let newId = DATA.todosList[DATA.todosList.length - 1].id;
    newId = newId + 1;
    let newTodo = {
        id: newId,
        task: req.body.task
    }
    DATA.todosList.push(newTodo);
    res.json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    let currentIndex = DATA.todosList.findIndex(todo => todo.id == req.params.id);
    let todo = DATA.todosList[currentIndex];
    todo = {
        ...todo,
        task: req.body.task
    };
    DATA.todosList[currentIndex] = todo;
    res.json(todo);
});

app.listen(4000, (req, res) => {
    console.log("Server Listening on PORT : 4000")
})