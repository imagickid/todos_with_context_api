import styles from './App.module.css';
import { useState } from 'react';

const initialState = {
	email: '',
	login: '',
	password: '',
};

const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		resetState: () => setState(initialState),
	};
};

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState, resetState } = useStore();

	const onSubmit = (event) => {
		event.preventDefault();
		sendData(getState());
	};

	const { email, login, password } = getState();

	const onChange = ({ target }) => updateState(target.name, target.value);

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<form onSubmit={onSubmit}>
					<input
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						onChange={onChange}
					/>
					<input
						type="text"
						name="login"
						value={login}
						placeholder="Login"
						onChange={onChange}
					/>
					<input
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						onChange={onChange}
					/>
					<button type="button" onClick={resetState}>
						Reset
					</button>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};
