import { useEffect, useState } from 'react';
import { auth } from '../lib/config/firebase.config';
import { AuthContext } from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [formValues, setFormValues] = useState(null);

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

	if (formValues) {
		console.log(formValues);
	}

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
