import React from 'react';
import PropTypes from 'prop-types';
import styles from './XsOsLayout.module.css';

const XsOsLayout = ({ state, handleClick, xTurn, handleNewGame, playing }) => {
	const whosTurn = `${xTurn ? 'X' : 'O'}'s turn`;
	const whosWinner = `${xTurn ? 'O' : 'X'} wins`;

	return (
		<>
			<h1>{playing ? whosTurn : whosWinner}</h1>
			<div className={styles.board} onClick={handleClick}>
				{state.map((cellValue, id) => (
					<div className={styles.cells} key={id} data-index={id}>
						{cellValue}
					</div>
				))}
			</div>
			<button className={styles.btn} onClick={handleNewGame}>
				New game
			</button>
		</>
	);
};

XsOsLayout.propTypes = {
	state: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired,
	xTurn: PropTypes.bool.isRequired,
	handleNewGame: PropTypes.func.isRequired,
	playing: PropTypes.bool.isRequired,
};

export default XsOsLayout;
