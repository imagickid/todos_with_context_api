import styles from './App.module.css';
import { useForm } from 'react-hook-form';

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
		},
	});

	const loginProps = {
		minLength: { value: 3, message: 'More than 3 symbols.' },
		maxLength: { value: 20, message: 'Less than 20 symbols.' },
		pattern: { value: /^[\w_]*$/, message: 'Use letters, numbers and _.' },
	};

	const loginError = errors.login?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<form onSubmit={handleSubmit(onSubmit)}>
					{loginError && <div className={styles.errorLabels}>{loginError}</div>}
					<input type="text" name="login" {...register('login', loginProps)} />
					<button type="submit" disabled={!!loginError}>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};
