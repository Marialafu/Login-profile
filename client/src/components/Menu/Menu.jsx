import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Menu = () => {
	const { user } = useContext(AuthContext);
	return (
		<nav>
			<ul>
				{!user && (
					<>
						<li>
							<Link to={'/login'}>LOGIN</Link>
						</li>
						<li>
							<Link to={'/register'}>REGISTER</Link>
						</li>
					</>
				)}
				{user && (
					<li>
						<Link to={'/profile'}>PROFILE</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Menu;
