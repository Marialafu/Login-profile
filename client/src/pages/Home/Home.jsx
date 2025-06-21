import { useContext } from 'react';
import Menu from '../../components/Menu/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/config/firebase.config';
import { signOut } from 'firebase/auth';

const Home = () => {
	const { user } = useContext(AuthContext);
	const name = user?.email?.toUpperCase();
	const navigate = useNavigate();

	return (
		<>
			<Menu />
			{user && (
				<>
					<h1>BIENVENIDO {name}</h1>
					<button onClick={() => handleSignOut(navigate)}>Cerrar sesión</button>
				</>
			)}
			{!user && <h1>¡HOLA! ¿ERES NUEVO POR AQUÍ?, REGÍSTRATE</h1>}
		</>
	);
};

const handleSignOut = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Home;
