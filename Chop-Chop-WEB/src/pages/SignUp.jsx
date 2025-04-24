import React from 'react'
import { useState } from 'react'
import './SignUp.css'
import supabase from './Authenticator.jsx'

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [uType, setType] = useState('');
  const [password, setPassword] = useState('');
  const [errorN, setErrorN] = useState('');
  const [errorS, setErrorS] = useState('');
  const [errorE, setErrorE] = useState('');
  const [errorP, setErrorP] = useState('');
  const [errorT, setErrorT] = useState('');

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
    if (!uType) setErrorT('Type is required');

    if (name && surname && email && password) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
              surname: surname,
              type: uType,
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
  }

  return (
    <main>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setName(e.target.value)} value={name} className="input-su" type="text" placeholder="Name" />
          <br />
          <input onChange={(e) => setSurname(e.target.value)} value={surname} className="input-su" type="text" placeholder="Surname" />
          <br />
          <input onChange={(e) => setEmail(e.target.value)} value={email} className="input-su" type="text" placeholder="Email" />
          <br />
          <input onChange={(e) => setPassword(e.target.value)} value={password} className="input-su" type="password" placeholder="Password" />
          <br />
          <select onChange={(e) => setType(e.target.value)} value={uType} className="select-su" placeholder="User Type">
            <option value="">Select User Type</option>
            <option value="particular">Particular</option>
            <option value="profesional">Profesional</option>
            <option value="enterprise">Empresa</option>
            <option value="admin">Admin</option>
          </select>
          <br />
          <br />
          <button className='button-style-su' type='submit'>Sign Up</button>
        </form>
            {errorN && <p style={{margin: '1rem', color: 'red'}}>{errorN}</p>}
            {errorS && <p style={{margin: '1rem', color: 'red'}}>{errorS}</p>}
            {errorE && <p style={{margin: '1rem', color: 'red'}}>{errorE}</p>}
            {errorP && <p style={{margin: '1rem', color: 'red'}}>{errorP}</p>}
            {errorT && <p style={{margin: '1rem', color: 'red'}}>{errorT}</p>}
    </main>
  )
}

export default SignUp
