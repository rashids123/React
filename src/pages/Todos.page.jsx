import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getAllTodos } from '../store/actions/index'
import TodosTable from '../components/TodosTable.component';
import TodosForm from '../components/TodosForm.component';
const TodosPage = ({ todos, getAllTodos }) => {
    useEffect(() => {
        getAllTodos()
    }, [])
    return (
        <div>
            <TodosTable />
            <TodosForm />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps, {getAllTodos})(TodosPage);