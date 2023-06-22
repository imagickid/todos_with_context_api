import styles from './App.module.css';
import { useEffect, useState } from 'react';

export const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		try {
			const fetchPosts = async () => {
				const res = await fetch('https://jsonplaceholder.typicode.com/todos');
				const data = await res.json();
				setTodos(data);
			};
			fetchPosts();
		} catch (err) {}
	}, []);

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<h1>List of things to complete</h1>
				<div className={styles.label}>
					{todos.map((todo) => {
						return (
							<label key={todo.id}>
								<span>{todo.id}.</span> {todo.title}
							</label>
						);
					})}
				</div>
				;
			</div>
		</div>
	);
};
