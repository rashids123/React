import { SET_INITIAL_TODOS, ADD_TODO, DELETE_TODO } from "../actions/types";
let initState = {
    todosList: [],
    newTodo: {},
    selectedTodoIndex: null
}

const todos = (state = initState, action) => {
    switch (action.type) {
        case SET_INITIAL_TODOS:
            let todos = action.payload;
            return {
                ...state,
                todosList: todos
            }
        case ADD_TODO:
            let newTodo = action.payload;
            let updatedTodos = state.todosList;
            updatedTodos.push(newTodo)

            return {
                ...state,
                todosList: [...updatedTodos]
            }
        case DELETE_TODO:
            let todoIndex = action.payload;
            let currentTodos = state.todosList;
            currentTodos.splice(todoIndex, 1);
            return {
                ...state,
                todosList: [...currentTodos]
            }
        default:
            return state
    }
}
export default todos;