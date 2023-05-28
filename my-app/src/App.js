import styles from './App.module.css';
import { XsOsContainer } from './XsOsContainer';

export const App = () => {
	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<XsOsContainer />
			</div>
		</div>
	);
};
