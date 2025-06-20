import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';

const Login = () => {
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	return (
		<>
			<h2>LOGIN</h2>
			<form onSubmit={event => sendForm(event, setError, navigate)}>
				<div>
					<label>EMAIL</label>
					<input name='email' type='text' />
					{error && <span>{error}</span>}
				</div>
				<div>
					<label>PASSWORD</label>
					<input name='password' type={showPassword ? 'text' : 'password'} />
					<button type='button' onClick={() => setShowPassword(!showPassword)}>
						show password
					</button>
				</div>
				<input type='submit' value='login'></input>
			</form>
			<span>
				¿No tienes cuenta? <Link to={'/register'}>Regístrate</Link>
			</span>
		</>
	);
};

const sendForm = async (event, setError, navigate) => {
	event.preventDefault();
	const form = event.target;
	const email = form.email.value;
	const password = form.password.value;

	try {
		await signInWithEmailAndPassword(auth, email, password);
		navigate('/');
	} catch (err) {
		setError('*Invalid user');
		console.log(err);
	}
};

export default Login;
