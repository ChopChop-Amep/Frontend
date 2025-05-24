import { useState } from 'react';
import { useData } from '../hooks/useDataSignUp.js';
import './LogIn.css';
import supabase from './utiles/Authenticator.jsx';

function SignIn() {
  const { email, updateEmail, errorE, password, updatePassword, errorP } = useData();
  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null);

    if (!errorE && !errorP) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setLoginError('Invalid email or password.');
        } else {
            const { data } = await supabase.auth.getSession();
            if (data?.session?.access_token) {
            localStorage.setItem('authToken', data.session.access_token);
            } else {
            setLoginError('Failed to retrieve authentication token.');
            }
          alert('Signed In correctly.');
          window.location.href = '/';
        }
      } catch {
        setLoginError('An error occurred while logging in.');
      }
    }
  };

  const handleChangeEmail = (event) => {
    updateEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    updatePassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <main>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input className="input-li" onChange={handleChangeEmail} value={email} type="text" placeholder="Email" />
        <br />
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input className="input-li" onChange={handleChangePassword} value={password} type={showPassword ? 'text' : 'password'} placeholder="Password" />
          <button type="button" onClick={toggleShowPassword} className="btn-show" >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <br />
        <br />
        <button className="button-style-li" type="submit">
          Log In
        </button>
      </form>
      {errorE && <p style={{ margin: '1rem', color: 'red' }}>{errorE}</p>}
      {errorP && <p style={{ margin: '1rem', color: 'red' }}>{errorP}</p>}
      {loginError && <p style={{ margin: '1rem', color: 'red' }}>{loginError}</p>}
    </main>
  );
}

export default SignIn