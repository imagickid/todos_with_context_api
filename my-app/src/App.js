import styles from './App.module.css';
import { useEffect, useState } from 'react';

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
		<div className={styles.app}>
			<div className={styles.header}>
				<h1>List of things to complete</h1>

				<Button onClick={handleAddTodos}>Add Todo</Button>
				<SearchTodos
					className={styles.searchBar}
					searchInput={searchInput}
					setSearchInput={setSearchInput}
					todos={todos}
				/>
				<Button onClick={handleSort}>Sort Todos</Button>
				<TodoListBody
					currentTodo={currentTodo}
					searchInput={searchInput}
					handleEditTodos={handleEditTodos}
					handleDeleteTodos={handleDeleteTodos}
					sorted={sorted}
					setSorted={setSorted}
					onHandleCheck={handleCheck}
				/>
			</div>
		</div>
	);
};

const ControlButton = ({ onControl, todo, children }) => {
	return (
		<button className={styles.editButton} onClick={() => onControl(todo.id)}>
			{children}
		</button>
	);
};

const SearchTodos = ({ className, searchInput, setSearchInput }) => {
	return (
		<input
			type="text"
			className={className}
			placeholder="Search Todos"
			value={searchInput}
			onChange={(e) => setSearchInput(e.target.value)}
		/>
	);
};

const Button = ({ children, onClick }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{children}
		</button>
	);
};

const TodoListBody = ({
	currentTodo,
	searchInput,
	handleEditTodos,
	handleDeleteTodos,
	sorted,
	onHandleCheck,
}) => {
	if (sorted) {
		const sortedTodos = currentTodo
			.slice()
			.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));
		currentTodo = sortedTodos;
	}
	return (
		<div className={styles.content}>
			{currentTodo.length > 0 &&
				currentTodo
					.filter((todo) =>
						searchInput.toLowerCase() === ''
							? todo
							: todo.title.toLowerCase().includes(searchInput),
					)
					.map((todo) => {
						return (
							<label key={todo.id} className={styles.label}>
								<div>
									<input
										name="search"
										type="checkbox"
										className={styles.checkbox}
										checked={todo.checked}
										onChange={() => onHandleCheck(todo.id)}
									/>
									<span className={todo.checked ? styles.checked : ''}>
										{todo.title}
									</span>
								</div>
								<div className={styles.buttonGroup}>
									<ControlButton
										onControl={handleEditTodos}
										todo={todo}
									>
										Edit
									</ControlButton>
									<ControlButton
										styles={styles}
										todo={todo}
										onControl={handleDeleteTodos}
									>
										Delete
									</ControlButton>
								</div>
							</label>
						);
					})}
		</div>
	);
};
