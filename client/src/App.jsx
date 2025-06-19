import { BrowserRouter } from 'react-router-dom';
import Router from './lib/router/Router';
import { GlobalStyles } from './styles/GlobalStyles';
import AuthProvider from './providers/AuthProvider';

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<AuthProvider>
				<Router />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
