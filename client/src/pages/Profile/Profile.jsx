import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
	const { user, finalUser } = useContext(AuthContext);
	const [isEditing, setIsEditing] = useState(false);

	//alternativa de navigate, se pone el componente por que no puedes retornar una función.
	if (!user) return <Navigate to={'/'} />;
	return (
		<>
			{!isEditing && (
				<>
					<h2>Your profile</h2>
					<div>
						<p>nombre: {finalUser.name}</p>
						<p>correo: {finalUser.email}</p>
					</div>
					<div>
						<button onClick={() => setIsEditing(true)}>Editar datos</button>
					</div>
				</>
			)}
			{isEditing && (
				<>
					<h2>Edit your profile</h2>
					<div>
						<div>
							<label>NAME</label>
							<input name='name' type='text' defaultValue={finalUser.name} />
						</div>
						<div>
							<label>EMAIL</label>
							<input name='email' type='text' defaultValue={finalUser.email} />
						</div>
						<a href=''>Cambiar contraseña</a>
					</div>
					<div>
						<button onClick={() => setIsEditing(false)}>Guardar datos</button>
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
