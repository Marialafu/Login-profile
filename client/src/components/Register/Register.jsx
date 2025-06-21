import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth';
import { auth, provider } from '../../lib/config/firebase.config';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
	const { setFormValues, setUser } = useContext(AuthContext);

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
			<div>
				<h3 onClick={() => signInWithGoogle(setUser, setFormValues, navigate)}>
					Sign in with google
				</h3>
			</div>
			<span>
				¿Ya tienes cuenta? <Link to={'/login'}>Inicia sesión</Link>
			</span>
		</>
	);
};

//siempre que le doy a google me deja entrar bien. aunque ya me haga registrado con eso. Si registro normal, y luego me meto con google también me deja. Coge el mismo usuario.
const signInWithGoogle = async (setUser, setFormValues, navigate) => {
	signInWithPopup(auth, provider)
		.then(result => {
			// result recibe el resultado de la función anterior
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			setUser(user);
			console.log('usuario conectado por google');
			setFormValues({ email: user.email, name: user.displayName });
			navigate('/');
			// IdP data available using getAdditionalUserInfo(result)
		})
		.catch(error => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error?.customData?.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
};

const sendForm = async (event, navigate, setError, setFormValues) => {
	event.preventDefault();
	const formData = event.target;
	const email = formData.email.value;
	const password = formData.password.value;
	const name = formData.name.value;

	setFormValues({ email: email, name: name });

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
