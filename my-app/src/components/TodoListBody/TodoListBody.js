import { useContext } from 'react';
import ControlButton from '../ControlButton/ControlButton';
import styles from './TodoListBody.module.css'
import { AppContext } from '../../Contexts';

const TodoListBody = () => {
	let {currentTodo} = useContext(AppContext)
	
	const {
		searchInput,
		handleEditTodos,
		handleDeleteTodos,
		sorted,
		handleCheck,
	} = useContext(AppContext)

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
										onChange={() => handleCheck(todo.id)}
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

export default TodoListBody