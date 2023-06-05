import styles from './App.module.css';
import { useState, useRef } from 'react';

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState(null);
	let error = null;

	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(target.value)) {
			error = 'Invalid email format';
		}
		setErrorMsg(error);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		if (!/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(target.value)) {
			error = 'Incorrect Password. Use letters, numbers and symbols';
		} else if (!/[A-Z]/.test(target.value)) {
			error = 'Incorrect Password. Include at least 1 capital letter';
		} else if (!/(?=.{8,20}$)/.test(target.value))
			error = 'Use minimum 8 and maximum 20 characters';
		setErrorMsg(error);
	};

	const onConfirmPasswordChange = ({ target }) => {
		setConfirmPassword(target.value);
		if (target.value === password) submitButtonRef.current.focus();
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			setErrorMsg(error);
			setPassword('');
			setConfirmPassword('');
		}
		console.log(email);
		console.log(password);
		console.log(confirmPassword);
	};

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<form className={styles.form} onSubmit={handleSubmit}>
					{errorMsg && <div className={styles.errorLabels}>{errorMsg}</div>}
					<input
						type="email"
						name="email"
						value={email}
						placeholder="johnson@gmail.com"
						onChange={onEmailChange}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={onPasswordChange}
					/>
					<input
						type="password"
						name="password"
						placeholder="Confirm  password"
						value={confirmPassword}
						onChange={onConfirmPasswordChange}
					/>
					<button
						className={styles.button}
						ref={submitButtonRef}
						type="submit"
						disabled={errorMsg !== null}
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};
