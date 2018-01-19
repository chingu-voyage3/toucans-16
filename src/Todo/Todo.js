import React, { Component } from "react";
import _ from "lodash";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import Hideable from "../Hideable";
import "./Todo.css";

class Todo extends Component {
    state = {
        option: "ALL",
        todos: []
    };
    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload);
        this.loadSavedData();
    }
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload);
    }
    onUnload = () => {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
    };
    loadSavedData = () => {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        for (let i = 0; i < todos.length; i += 1) {
            todos[i].id = _.uniqueId();
        }
        this.setState({
            todos
        });
    };
    handleNewTodo = item => {
        if (item) {
            this.setState({
                todos: [
                    ...this.state.todos,
                    {
                        value: item,
                        deleted: false,
                        completed: false,
                        editing: false,
                        id: _.uniqueId()
                    }
                ]
            });
        }
    };
    handleDeleteTodo = id => {
        this.setState({
            todos: this.state.todos.filter(todo => id !== todo.id)
        });
    };
    filterList = type => {
        switch (type) {
        case "ACTIVE":
            return this.state.todos.filter(todo => !todo.completed);
        case "COMPLETED":
            return this.state.todos.filter(todo => todo.completed);
        default:
            return this.state.todos;
        }
    };
    filterType = opt => {
        this.setState({ option: opt });
    };
    handleDrop = (id1, id2) => {
        const idx1 = this.state.todos.findIndex(todo => todo.id === id1);
        const idx2 = this.state.todos.findIndex(todo => todo.id === id2);
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id1) return this.state.todos[idx2];
                if (todo.id === id2) return this.state.todos[idx1];
                return todo;
            })
        });
    };
    handleCompleted = id => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id)
                    return {
                        completed: !todo.completed,
                        id: todo.id,
                        value: todo.value,
                        deleted: todo.deleted
                    };
                return todo;
            })
        });
    };
    handleEdit = id => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id)
                    return {
                        ...todo,
                        editing: true
                    };
                return todo;
            })
        });
    };
    handleBlur = id => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id)
                    return {
                        ...todo,
                        editing: false
                    };
                return todo;
            })
        });
    };
    render() {
        const visibleTodos = this.filterList(this.state.option);
        return (
            <Hideable
                className="todo-container"
                label="Todo"
                dir="bottom"
                align="flex-end"
                margin="1vmin 2vmin 1.5vmin 0"
                childMargin="0 1vmin 0 0"
            >
                <div className="todo">
                    <h4
                        style={{
                            color: "#d3d3d3",
                            textAlign: "left",
                            height: "4vh"
                        }}
                    >{`${visibleTodos.length} to do`}</h4>
                    {this.state.todos.length === 0 ? (
                        <div className="todo__nothing">
                            <h2>There is nothing to do!</h2>
                            <h1>&#x263A;</h1>
                        </div>
                    ) : (
                        <ul className="todo__list">
                            {visibleTodos.map(todo => (
                                <TodoItem
                                    id={todo.id}
                                    key={todo.id}
                                    value={todo.value}
                                    editing={todo.editing}
                                    completed={todo.completed}
                                    onDeleteTodo={this.handleDeleteTodo}
                                    onDrop={this.handleDrop}
                                    onDragLeave={this.handleDragLeave}
                                    onCompleted={this.handleCompleted}
                                    onEdit={this.handleEdit}
                                    onBlur={this.handleBlur}
                                />
                            ))}
                        </ul>
                    )}
                    <TodoInput onNewTodo={this.handleNewTodo} />
                    <hr />
                    <div className="todo__filter">
                        <TodoFilter
                            value="ALL"
                            option={this.state.option}
                            onOptionClick={this.filterType}
                        />
                        <TodoFilter
                            value="ACTIVE"
                            option={this.state.option}
                            onOptionClick={this.filterType}
                        />
                        <TodoFilter
                            value="COMPLETED"
                            option={this.state.option}
                            onOptionClick={this.filterType}
                        />
                    </div>
                </div>
            </Hideable>
        );
    }
}

export default Todo;
