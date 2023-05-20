import styles from './App.module.css';
import {Calculator} from './Calculator'

export const App = () => {
	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<Calculator />
			</div>
		</div>
	);
};
