import styles from './App.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const fieldScheme = yup.object().shape({
	login: yup
		.string()
		.matches(/^[\w_]*$/, 'Use letters, numbers and _.')
		.max(20, 'Less than 20 symbols.')
		.min(3, 'More than 3 symbols.'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
		},
		resolver: yupResolver(fieldScheme),
	});

	const loginError = errors.login?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<form onSubmit={handleSubmit(onSubmit)}>
					{loginError && <div className={styles.errorLabels}>{loginError}</div>}
					<input type="text" name="login" {...register('login')} />
					<button type="submit" disabled={!!loginError}>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};
