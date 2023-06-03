import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const [login, setLogin] = useState('');
	const [loginError, setLoginError] = useState(null);

	const onLoginChange = ({ target }) => {
		setLogin(target.value);

		let error = null;

		if (!/^[\w_]*$/.test(target.value)) {
			error = 'Incorrect pasword. use letters, symbols and _';
		} else if (target.value.length > 20) {
			error = 'No more than 20 symbols';
		}

		setLoginError(error);
	};

	const onLoginBlur = () => {
		if (login.length < 3) {
			setLoginError('Incorrect password. More than 3 symbols');
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(login);
	};

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<form onSubmit={onSubmit}>
					{loginError && <div className={styles.errorLabel}>{loginError}</div>}
					<input
						type="text"
						name="login"
						value={login}
						placeholder="Login"
						onChange={onLoginChange}
						onBlur={onLoginBlur}
					/>
					<button type="submit" disabled={loginError !== null}>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};
