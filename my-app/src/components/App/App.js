import { AppContext } from '../../Contexts';
import styles from './App.module.css';
import { useEffect, useState } from 'react';

import SearchTodos from '../SearchTodos/SearchTodos'
import Button from '../Button/Button'
import TodoListBody from '../TodoListBody/TodoListBody'

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [sorted, setSorted] = useState(false);

	let currentTodo = todos.slice();

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	useEffect(() => {
		try {
			const fetchPosts = async () => {
				const res = await fetch('http://localhost:3005/todos');
				const data = await res.json();
				setTodos(data);
			};
			fetchPosts();
		} catch (err) {
			console.error(err.message);
		}
	}, [refreshTodosFlag]);

	const handleAddTodos = () => {
		const inputTodo = prompt('What do you have on mind?');
		if (!inputTodo) return;

		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: todos[0]?.id ? todos.at(-1).id + 1 : 1,
				title: inputTodo,
				checked: false,
			}),
		});
		setSearchInput('');
		refreshTodos();
	};

	const handleEditTodos = (id) => {
		const inputTodo = prompt('Insert edited text');
		if (!inputTodo) return;

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id,
				title: inputTodo,
				checked: false,
			}),
		});
		refreshTodos();
	};

	const handleDeleteTodos = (id) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		});
		setSearchInput('');
		refreshTodos();
	};

	const handleSort = () => {
		setSorted((sorted) => !sorted);
	};

	const handleCheck = (id) => {
		const [todoToChecked] = todos.slice().filter((todo) => todo.id === id);
		const { idMain, title, checked } = todoToChecked;

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: idMain,
				title,
				checked: !checked,
			}),
		});
		refreshTodos();
	};

	return (
		<AppContext.Provider value={{
			searchInput,
			setSearchInput,
			todos,
			currentTodo,
			handleEditTodos,
			handleDeleteTodos,
			sorted,
			setSorted,
			handleCheck
			}}>
		<div className={styles.app}>
			<div className={styles.header}>
				<h1>List of things to complete</h1>

				<Button onClick={handleAddTodos}>Add Todo</Button>
				<SearchTodos/>
				<Button onClick={handleSort}>Sort Todos</Button>
				<TodoListBody/>
			</div>
		</div>
		</AppContext.Provider>
	);
};








