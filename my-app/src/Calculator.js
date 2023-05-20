import * as math from 'mathjs';
import styles from './Calculator.module.css';
import { useState } from 'react';

export const Calculator = () => {
	const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	const operators = ['+', '-'];
	const [displayOnScreen, setDisplayOnScreen] = useState('');
	const [sumAllColor, setSumAllColor] = useState(false);
	const [allSummed, setAllSummed] = useState(false);

	const createNumbers = () => {
		return digits.map((num) => (
			<button
				className={styles.btn}
				key={num}
				onClick={() => updateDisplayNum(num)}
			>
				{num}
			</button>
		));
	};

	const updateDisplayNum = (value) => {
		setSumAllColor(false);
		if (operators.includes(value)) setAllSummed(false);
		if (
			(operators.includes(value) &&
				operators.includes(displayOnScreen.slice(-1))) ||
			(operators.includes(value) && displayOnScreen === '') ||
			(value === 0 && displayOnScreen === '') ||
			(value === 0 && allSummed)
		)
			return;
		if (allSummed && typeof value === 'number') {
			setDisplayOnScreen(value.toString());
			setAllSummed(false);
		} else setDisplayOnScreen(displayOnScreen + value);
	};

	const clearDisplayNum = () => {
		setDisplayOnScreen('');
		setSumAllColor(false);
		setAllSummed(false);
	};

	const sumAll = () => {
		if (operators.includes(displayOnScreen.slice(-1)) || !displayOnScreen) return;
		const sumAll = math.evaluate(displayOnScreen);
		setDisplayOnScreen(sumAll.toString());
		setSumAllColor(true);
		setAllSummed(true);
	};

	return (
		<div className={styles.calculator}>
			<div className={styles.screen}>
				<span className={sumAllColor ? styles.active : ''}>
					{displayOnScreen || '0'}
				</span>
			</div>
			<div className={styles.keyboard}>
				<div className={styles.btnNumbers}>{createNumbers()}</div>
				<div className={styles.btnSymbols}>
					<button className={styles.btn} onClick={clearDisplayNum}>
						C
					</button>
					<button
						className={styles.btn}
						onClick={() => {
							updateDisplayNum('+');
						}}
					>
						+
					</button>
					<button
						className={styles.btn}
						onClick={() => {
							updateDisplayNum('-');
						}}
					>
						-
					</button>
					<button className={styles.btn} onClick={sumAll}>
						=
					</button>
				</div>
			</div>
		</div>
	);
};
