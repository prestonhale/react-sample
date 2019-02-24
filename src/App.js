import React, { Component } from 'react';
import './App.css';


var initialTodos = [
  {name: "Milk", id: 0},
  {name: "Bananas", id: 1},
  {name: "Eggs", id: 2},
  {name: "Bread", id: 3},
  {name: "Butter", id: 4},
]

window.id = 5;  // This is neat

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: initialTodos,
    }
  }

  // ES2015 () => syntax removes the need for .bind(this) everywhere

  addTodo = (todoName) => {
    var newTodos = this.state.todos.concat({
      name: todoName, id: window.id++
    });
    this.setState({todos: newTodos})
  }

  removeTodo = (todoId) => {
    var newTodos = this.state.todos.filter(todo => todo.id !== todoId);
    this.setState({todos: newTodos})
  }


  render() {
    return (
      <div className="App">
        <ToDoList 
          addTodo={this.addTodo}
          removeTodo={this.removeTodo}
          todos={this.state.todos}>
        </ToDoList>
      </div>
    );
  }
}


class ToDoList extends Component {
  renderTodos() {
    var renderedTodos = [];
    if (this.props.todos.length === 0){
      return <div>You're all done!</div>
    }
    for (var i = 0; i < this.props.todos.length; i ++){
      renderedTodos.push(
        <TodoItem 
          key={this.props.todos[i].id} 
          todo={this.props.todos[i]} 
          removeTodo={this.props.removeTodo}
        ></TodoItem>)
    }
    return renderedTodos;
  }

  render() {
    let input;
    let placeholder="Enter Todo";
    return (
      <div className="TodoList">
        <div className="TodoHeader">
          <div className="AddTodo">
            <form onSubmit={(e) => {
                e.preventDefault();
                this.props.addTodo(input.value);
                input.value="";
              }}>
              <input placeholder={placeholder} ref={node => {input = node;}} />
              <button type="submit">Add Todo </button>
            </form>
          </div>
          <h3>My Todos</h3>
          <div className="TodoItems">
            {this.renderTodos()}
          </div>
        </div>
      </div>
    );
  }
}


class TodoItem extends Component {
  removeTodo = () => {
    this.props.removeTodo(this.props.todo.id);
  }

  render() {
    return(
        <div className="Todo" key={this.props.todo.id}>
          <div className="TodoContent">
            <button className="TodoRemoveBtn" onClick={this.removeTodo}>X</button>
            <div className="TodoName">{this.props.todo.name}</div>
          </div>
        </div>
    )
  }
}

export default App;
