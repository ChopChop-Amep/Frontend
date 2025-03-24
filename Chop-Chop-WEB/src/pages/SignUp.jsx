import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './SignUp.css';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Add to .env.local
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Add to .env.local
//const supabaseUrl = 'https://wldvmdxarlazwsswoywc.supabase.co'; // Replace <your_supabase_url>
//const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZHZtZHhhcmxhendzc3dveXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMzEyNDUsImV4cCI6MjA1NzcwNzI0NX0.j5lqbDl4mY1kIuNtUeCst_gRWvyDhFG4pRyB9oqLjHE'; // Replace <your_supabase_anon_key>
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
        const { user, error } = await supabase.auth.signUp({
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
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
          />
          <input
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            type="text"
            placeholder="Surname"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />        
        <br />       
          <button className="button-style-su" type="submit">
            Sign Up
          </button>
      </form>
      {errorN && <p style={{ margin: '1rem', color: 'red' }}>{errorN}</p>}
      {errorS && <p style={{ margin: '1rem', color: 'red' }}>{errorS}</p>}
      {errorE && <p style={{ margin: '1rem', color: 'red' }}>{errorE}</p>}
      {errorP && <p style={{ margin: '1rem', color: 'red' }}>{errorP}</p>}
    </main>
  );
}

export default SignUp;