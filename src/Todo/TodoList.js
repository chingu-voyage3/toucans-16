import React, { Component } from "react";
import _ from "lodash";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";

class TodoList extends Component {
    state = {
        option: "ALL",
        todos: []
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
    render() {
        const visibleTodos = this.filterList(this.state.option);
        return (
            <div
                className="todo-list"
                style={{
                    visibility: this.props.visible ? "visible" : "hidden"
                }}
            >
                <h4>{visibleTodos.length} to do</h4>
                <ul>
                    {visibleTodos.map(todo => (
                        <TodoItem
                            id={todo.id}
                            key={todo.id}
                            value={todo.value}
                            completed={todo.completed}
                            onDeleteTodo={this.handleDeleteTodo}
                            onDrop={this.handleDrop}
                            onDragLeave={this.handleDragLeave}
                            onCompleted={this.handleCompleted}
                        />
                    ))}
                </ul>
                <TodoInput onNewTodo={this.handleNewTodo} />
                <div className="filter-options">
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
        );
    }
}

export default TodoList;
