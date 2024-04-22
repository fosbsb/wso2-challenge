import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { useAuthContext } from '@asgardeo/auth-react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import Navbar from './components/Navbar';
import FormularioCadastro from './components/FormularioCadastro';
import Footer from './components/Footer';

function App() {
  const navigate = useNavigate(); // Antigo useHistory, utilizado para redirecionamento de rotas.
  const { state, signIn } = useAuthContext(); //  Resgata estado de autenticação e função de login

  useEffect(() => {
    // Redireciona para o dashboard caso o usuário esteja autenticado
    if (state.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [state.isAuthenticated, navigate]);

  return (
    <div>
      <Navbar isAuthenticated={state.isAuthenticated} signIn={signIn} />
      <div className="container">
        <FormularioCadastro />
      </div>
      <Footer />
    </div>
  );
}

export default App;
