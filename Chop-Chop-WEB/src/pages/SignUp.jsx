import React from 'react'
import { useState } from 'react'
import './SignUp.css'
import supabase from './utiles/Authenticator.jsx'

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [uType, setType] = useState('');
  const [password, setPassword] = useState('');
  const [nif, setNif] = useState('');
  const [errorN, setErrorN] = useState('');
  const [errorS, setErrorS] = useState('');
  const [errorE, setErrorE] = useState('');
  const [errorP, setErrorP] = useState('');
  const [errorT, setErrorT] = useState('');
  const [errorNif, setErrorNif] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorN('');
    setErrorS('');
    setErrorE('');
    setErrorP('');
    setErrorNif('');

    if (!name) setErrorN('Name is required');
    if (!surname) setErrorS('Surname is required');
    if (!email) setErrorE('Email is required');
    if (!password) setErrorP('Password is required');
    if (!uType) setErrorT('Type is required');
    if (!nif && (uType === 'professional' || uType === 'enterprise')) {
      setErrorNif('NIF is required for professional and enterprise users');
    }

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
              nif: uType === 'professional' || uType === 'enterprise' ? nif : null,
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

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <main>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="input-su"
            type="text"
            placeholder="Name"
            required
          />
          <br />
          <input
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            className="input-su"
            type="text"
            placeholder="Surname"
            required
          />
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input-su"
            type="text"
            placeholder="Email"
            required
          />
          <br />
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="input-su"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              style={{ flex: 1 }}
              required
            />
            <button type="button" onClick={toggleShowPassword} className="btn-show-su" style={{ marginLeft: '0.5rem' }}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <br />
          <select
            onChange={(e) => setType(e.target.value)}
            value={uType}
            className="select-su"
            placeholder="User Type"
            required
          >
            <option value="">Select User Type</option>
            <option value="particular">Particular</option>
            <option value="professional">Profesional</option>
            <option value="enterprise">Empresa</option>
          </select>
          <br />
          {/* Añadir modificaciones de lo que se pide segun el User Type escojido */}

          {(uType === 'professional' || uType === 'enterprise') && (
            <>
              <input
                onChange={(e) => setNif(e.target.value)}
                value={nif}
                className="input-su"
                type="text"
                placeholder="NIF"
                required
              />
              <br />
            </>
          )}

          <br />
          <button className='button-style-su' type='submit'>Sign Up</button>
        </form>
            {errorN && <p style={{margin: '1rem', color: 'red'}}>{errorN}</p>}
            {errorS && <p style={{margin: '1rem', color: 'red'}}>{errorS}</p>}
            {errorE && <p style={{margin: '1rem', color: 'red'}}>{errorE}</p>}
            {errorP && <p style={{margin: '1rem', color: 'red'}}>{errorP}</p>}
            {errorT && <p style={{margin: '1rem', color: 'red'}}>{errorT}</p>}
            {errorNif && <p style={{margin: '1rem', color: 'red'}}>{errorNif}</p>}
    </main>
  )
}

export default SignUp
