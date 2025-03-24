import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './SignUp.css';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL; 
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorN, setErrorN] = useState('');
  const [errorS, setErrorS] = useState('');
  const [errorE, setErrorE] = useState('');
  const [errorP, setErrorP] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorN('');
    setErrorS('');
    setErrorE('');
    setErrorP('');

    if (!name) setErrorN('Name is required');
    if (!surname) setErrorS('Surname is required');
    if (!email) setErrorE('Email is required');
    if (!password) setErrorP('Password is required');

    if (name && surname && email && password) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
              surname: surname,
            },
          },
        });

        if (error) {
          alert('Error: ' + error.message);
        } else {
          alert('User registered successfully.');
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
      }
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            type="text"
            placeholder="Surname"
          />
        </div>
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </div>
        <br />
        <div>
          <button className="button-style-su" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div>{errorN && <p style={{ margin: '1rem', color: 'red' }}>{errorN}</p>}</div>
      <div>{errorS && <p style={{ margin: '1rem', color: 'red' }}>{errorS}</p>}</div>
      <div>{errorE && <p style={{ margin: '1rem', color: 'red' }}>{errorE}</p>}</div>
      <div>{errorP && <p style={{ margin: '1rem', color: 'red' }}>{errorP}</p>}</div>
    </main>
  );
}

export default SignUp;