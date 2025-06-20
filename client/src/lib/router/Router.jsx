import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import LoginAndRegister from '../../pages/LoginAndRegister/LoginAndRegister';
import Profile from '../../pages/Profile/Profile';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/:action' element={<LoginAndRegister />} />
			{/* la ruta dinámica:action permite meterte en login o register según te metas. Para saber en cual te has metido hay que poner, en el element(loginandregister) const {action} = useParams() */}
			<Route path='/profile' element={<Profile />} />
		</Routes>
	);
};

export default Router;
