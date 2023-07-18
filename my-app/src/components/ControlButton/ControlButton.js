import styles from '../App/App.module.css';

const ControlButton = ({ onControl, todo, children }) => {
	return (
		<button className={styles.editButton} onClick={() => onControl(todo.id)}>
			{children}
		</button>
	);
};

export default ControlButton