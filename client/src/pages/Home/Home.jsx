import { useContext } from 'react';
import Menu from '../../components/Menu/Menu';
import { AuthContext } from '../../contexts/AuthContext';

const Home = () => {
	const { user } = useContext(AuthContext);
	const name = user.email.toUpperCase();
	return (
		<>
			<Menu />
			{user && <h1>BIENVENIDO {name}</h1>}
			{!user && <h1>¡HOLA! ¿ERES NUEVO POR AQUÍ?, REGÍSTRATE</h1>}
		</>
	);
};

export default Home;
