import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
	const { user } = useContext(AuthContext);
	const [isEditing, setIsEditing] = useState(false);

	//alternativa de navigate, se pone el componente por que no puedes retornar una función.
	if (!user) return <Navigate to={'/'} />;
	return (
		<>
			{!isEditing && (
				<>
					<h2>Your profile</h2>
					<div>
						<p>nombre: {user.uid}</p>
						<p>correo: {user.email}</p>
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
							<input name='name' type='text' defaultValue={user.uid} />
						</div>
						<div>
							<label>EMAIL</label>
							<input name='email' type='text' defaultValue={user.email} />
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
