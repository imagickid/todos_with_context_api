import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const [selectedProduct, setSelectedProduct] = useState('tv');
	const [selectedColors, setSelectedColors] = useState(['blacf', 'silver']);

	const onSelectedProductChange = ({ target }) => setSelectedProduct(target.value);

	const onSelectedColorsChange = ({ target }) => {
		const newSelectedColors = [...target.selectedOptions].map(
			(selectedTarget) => selectedTarget.value,
		);
		setSelectedColors(newSelectedColors);
	};

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<select value={selectedProduct} onChange={onSelectedProductChange}>
					<option value="tv">Television</option>
					<option value="smartphone">Smartphone</option>
					<option value="laptop">Laptop</option>
				</select>
				<select
					multiple={true}
					value={selectedColors}
					onChange={onSelectedColorsChange}
				>
					<option value="black">Black</option>
					<option value="silver">Silver</option>
					<option value="white">White</option>
				</select>
			</div>
		</div>
	);
};
