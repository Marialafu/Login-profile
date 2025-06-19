import { useParams } from 'react-router-dom';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

const LoginAndRegister = () => {
	const { action } = useParams();
	// es action por que en la ruta dinámica lo hemos llamado así

	if (action === 'login') {
		return <Login />;
	}

	if (action === 'register') {
		return <Register />;
	}
};

export default LoginAndRegister;
