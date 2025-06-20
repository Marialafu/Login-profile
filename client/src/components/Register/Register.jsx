import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
	const { setFormValues } = useContext(AuthContext);

	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<h2>REGISTER</h2>
			<form
				onSubmit={event => sendForm(event, navigate, setError, setFormValues)}
			>
				<div>
					<label>NAME</label>
					<input name='name' type='text' />
				</div>
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
				<input type='submit' value='register'></input>
			</form>
			<span>
				¿Ya tienes cuenta? <Link to={'/login'}>Inicia sesión</Link>
			</span>
		</>
	);
};

const sendForm = async (event, navigate, setError, setFormValues) => {
	event.preventDefault();
	const formData = event.target;
	const email = formData.email.value;
	const password = formData.password.value;
	const name = formData.name.value;

	setFormValues(email, name);

	try {
		await createUserWithEmailAndPassword(auth, email, password);
		navigate('/');
	} catch (err) {
		//conseguir que salga el error concreto
		setError(err.message);
		console.log(err);
	}
};

export default Register;
