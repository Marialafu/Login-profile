import { useEffect, useState } from 'react';
import { auth } from '../lib/config/firebase.config';
import { AuthContext } from '../contexts/AuthContext';
import { createUser } from '../lib/utils/api.users';

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [formValues, setFormValues] = useState(null);
	const [finalUser, setFinalUser] = useState(null);

	console.log(formValues);

	useEffect(() => {
		//el user de la función es el de firebase y nosotros decidimos donde guardarlo
		const unsuscribe = auth.onAuthStateChanged(user => {
			if (user) {
				console.log('Usuario autentificado: ', user);
				setUser(user);
			} else {
				console.log('Usuario NO autentificado');
				setUser(null);
				setFormValues(null);
				setFinalUser(null);
			}
		});

		return () => unsuscribe();
	}, []);

	useEffect(() => {
		if (formValues && user) {
			const defineMongoUser = { firebaseId: user.uid, ...formValues };
			setUser(defineMongoUser);
			console.log(`Enviado a mongo: ${JSON.stringify(defineMongoUser)}`);

			try {
				createUser(defineMongoUser);
				console.log(`Creado en mongo: ${JSON.stringify(defineMongoUser)}`);
			} catch (error) {
				console.log(error);
			}
		}
	}, [formValues]);

	return (
		<AuthContext.Provider value={{ user, setFormValues, setUser, finalUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
