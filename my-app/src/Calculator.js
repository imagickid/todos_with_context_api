import * as math from 'mathjs';
import styles from './Calculator.module.css';
import { useState } from 'react';

export const Calculator = () => {
	const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'C', '+', '-', '='];
	const operators = ['+', '-'];
	const [displayOnScreen, setDisplayOnScreen] = useState('');
	const [sumAllColor, setSumAllColor] = useState(false);
	const [allSummed, setAllSummed] = useState(false);

	const CreateBtns = ({ sliceSt, sliceEnd, style, clickFunc }) => {
		return digits.slice(sliceSt, sliceEnd).map((num) => (
			<button className={style} key={num} onClick={() => clickFunc(num)}>
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
				<div className={styles.btnNumbers}>
					<CreateBtns
						sliceSt={0}
						sliceEnd={10}
						style={styles.btn}
						clickFunc={updateDisplayNum}
					/>
				</div>
				<div className={styles.btnSymbols}>
					<CreateBtns
						sliceSt={10}
						sliceEnd={11}
						style={styles.btn}
						clickFunc={clearDisplayNum}
					/>
					<CreateBtns
						sliceSt={11}
						sliceEnd={13}
						style={styles.btn}
						clickFunc={updateDisplayNum}
					/>
					<CreateBtns
						sliceSt={13}
						sliceEnd={15}
						style={styles.btn}
						clickFunc={sumAll}
					/>
				</div>
			</div>
		</div>
	);
};
