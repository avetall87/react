import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'
import * as UIDGenerator from "uid-generator";

import './app.css';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            todoData: [
                this.createTodoItem('Выпить чашечку кофе !'),
                this.createTodoItem('Запилить крутую приложуху на JS !'),
                this.createTodoItem('Пойти на обед !'),
            ],
            term: '',
            filter: 'all' // active, all, done
        }
    }

    search(arr, term) {
        if (term.length === 0) {
            return arr;
        }

        return arr.filter((item) => {
                return item.label.toUpperCase().indexOf(term.toUpperCase()) > -1;
            }
        );
    }

    filter(arr, filter) {

        if (filter.length === 0) {
            return arr;
        }

        switch (filter) {
            case 'all':
                return arr;
            case 'active':
                return arr.filter((item) => !item.done);
            case 'done':
                return arr.filter((item) => item.done);
            default:
                return arr;
        }
    }

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
      this.setState({filter})
    };

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: new UIDGenerator().generateSync()
        }
    }

    addItem = (text) => {
        // generate id
        const newItem = this.createTodoItem(text);

        console.log(newItem.id);

        // add element to array (immutable !!!)
        this.setState(({todoData}) => {
            const newTodoData = [...todoData,
                newItem];

            return {
                todoData: newTodoData
            }
        });
    };

    toggleProperty(arr, id, propName) {

        const idx = arr.findIndex((el) => el.id === id);

        //1. update object in array
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]}; // create new object from old !!!

        //2. create new object
        return [...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)];
    }

    changeState(id, propName) {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, propName)
            };
        });
    }

    onToggleImportant = (id) => {
        this.changeState(id, 'important');
    };

    onToggleDone = (id) => {
        this.changeState(id, 'done');
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            // immutable state !!!!!
            const idx = todoData.findIndex((el) => el.id === id);
            const newTodoDate = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
            return {
                todoData: newTodoDate
            }
        });
    };

    render() {

        // destructurization
        const {todoData, term, filter} = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        const filteredData = this.filter(
            this.search(todoData, term), filter
        );

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList todos={filteredData}
                          onDeleted={(id) => this.deleteItem(id)}
                          onToggleImportant={(id) => this.onToggleImportant(id)}
                          onToggleDone={(id) => this.onToggleDone(id)}/>
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        )
    }
};


