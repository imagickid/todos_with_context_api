import styles from './App.module.css';
import * as yup from 'yup';
import { useState, useRef } from 'react';

const loginChangeScheme = yup
	.string()
	.matches(/^[\w_]*$/, 'Incorrect password. Use letters, symbols and _')
	.max(20, 'No more than 20 symbols');

const loginBlurScheme = yup.string().min(3, 'Incorrect password. More than 3 symbols');

const validateAndGetErrorMessage = (scheme, value) => {
	let errorMessage = null;

	try {
		scheme.validateSync(value, { abortEarly: false });
	} catch ({ errors }) {
		errorMessage = errors.join('\n');
		console.log(errors.join('\n'));
	}

	return errorMessage;
};

export const App = () => {
	const [login, setLogin] = useState('');
	const [loginError, setLoginError] = useState(null);

	const submitButtonRef = useRef(null);

	const onLoginChange = ({ target }) => {
		setLogin(target.value);

		const error = validateAndGetErrorMessage(loginChangeScheme, target.value);

		setLoginError(error);

		if (target.value.length === 20) {
			submitButtonRef.current.focus();
		}
	};

	const onLoginBlur = () => {
		const error = validateAndGetErrorMessage(loginBlurScheme, login);
		setLoginError(error);
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
					<button
						ref={submitButtonRef}
						type="submit"
						disabled={loginError !== null}
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};
