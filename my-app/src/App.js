import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';
import { useEffect, useRef } from 'react';

const fieldSchema = yup.object().shape({
	email: yup
		.string()
		.matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'),
	password: yup
		.string()
		.matches(
			/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
			'Incorrect Password. Use letters, numbers and symbols',
		)
		.matches(/[A-Z]/, 'Incorrect Password. Include at least 1 capital letter')
		.max(20, 'Use maximum 20 characters')
		.min(8, 'Use minimum 8 characters'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '', password: '', confirmPassword: '' },
		resolver: yupResolver(fieldSchema),
	});

	const errorMsg = errors.email
		? errors.email.message
		: errors.password
		? errors.password.message
		: errors.confirmPassword
		? errors.confirmPassword.message
		: null;

	const submitButtonRef = useRef(null);

	useEffect(() => {
		if (getValues('password') === getValues('confirmPassword'))
			submitButtonRef.current.focus();
	});

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<form className={styles.form} onSubmit={handleSubmit(sendFormData)}>
					{errorMsg && <div className={styles.errorLabels}>{errorMsg}</div>}
					<input
						type="email"
						name="email"
						placeholder="johnson@gmail.com"
						{...register('email')}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						{...register('password')}
					/>
					<input
						type="password"
						name="password"
						placeholder="Confirm  password"
						{...register('confirmPassword')}
					/>
					<button
						className={styles.button}
						ref={submitButtonRef}
						type="submit"
						disabled={!!errorMsg}
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};
