import styles from './App.module.css';
import Select from 'react-select';

const productOptions = [
	{ value: 'tv', label: 'Television' },
	{ value: 'smartphone', label: 'Smartphone' },
	{ value: 'laptop', label: 'Laptop' },
];

const colorOptions = [
	{ value: 'black', label: 'Black' },
	{ value: 'silver', label: 'Silver' },
	{ value: 'white', label: 'White' },
];

export const App = () => {
	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<Select options={productOptions} defaultValue={productOptions[0]} />
				<Select
					isMulti
					options={colorOptions}
					defaultValue={[colorOptions[0], colorOptions[1]]}
				/>
			</div>
		</div>
	);
};
