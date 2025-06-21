import { useEffect, useState } from 'react';
import { auth } from '../lib/config/firebase.config';
import { AuthContext } from '../contexts/AuthContext';
import { createUser } from '../lib/utils/api.users';

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [formValues, setFormValues] = useState(null);
	const [userCreatedInMongo, setUserCreatedInMongo] = useState(false);

	console.log(user);
	console.log(formValues);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged(user => {
			if (user) {
				console.log('Usuario autentificado: ', user);
				setUser(user);
			} else {
				console.log('Usuario NO autentificado');
				setUser(null);
			}
		}, []);

		return () => unsuscribe();
	});

	useEffect(() => {
		if (formValues && user && !userCreatedInMongo) {
			const defineMongoUser = { firebaseId: user.uid, ...formValues };
			console.log(`Enviado a mongo: ${defineMongoUser}`);

			try {
				createUser(defineMongoUser);
				setUserCreatedInMongo(true);
			} catch (error) {
				console.log(error);
			}
		}
	}, [formValues, user, userCreatedInMongo]);

	return (
		<AuthContext.Provider value={{ user, setFormValues, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
