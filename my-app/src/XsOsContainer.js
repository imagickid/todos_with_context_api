import { useState } from 'react';
import XsOsLayout from './XsOsLayout';

export const XsOsContainer = () => {
	const [state, setState] = useState(Array(9).fill(null));
	const [xTurn, setXTurn] = useState(true);
	const [playing, setPlaying] = useState(true);

	const handleClick = (e) => {
		if (playing) {
			if (e.target.textContent) return;
			const newState = state.slice();
			newState[+e.target.dataset.index] = xTurn ? 'X' : 'O';
			setState(newState);
			setXTurn(!xTurn);
			checkWinner(newState);
		}
	};

	const handleNewGame = () => {
		setPlaying(true);
		setState(Array(9).fill(null));
		setXTurn(true);
	};

	const winners = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const checkWinner = (currentState) => {
		winners.forEach((winner) => {
			const [a, b, c] = winner;
			if (
				currentState[a] &&
				currentState[a] === currentState[b] &&
				currentState[a] === currentState[c]
			) {
				setPlaying(false);
			}
		});
	};

	return (
		<XsOsLayout
			state={state}
			handleClick={handleClick}
			xTurn={xTurn}
			handleNewGame={handleNewGame}
			playing={playing}
		/>
	);
};
