import {useData} from '../hooks/useDataSignUp.js'
import './LogIn.css'

function SignIn() {
  const {email, updateEmail, errorE, password, updatePassword, errorP} = useData()

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!errorE && !errorP) {
      alert('Signed In correctly.');
      window.location.href = '/';
    }
  }
  const handleChangeEmail = (event) => {
    updateEmail(event.target.value)
  }
  const handleChangePassword = (event) => { 
    updatePassword(event.target.value)
  }


  return (
    <main>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input className="inputEmail" onChange={handleChangeEmail} value={email} type="text" placeholder="Email" />
          <br />
          <input className="inputPassword" onChange={handleChangePassword} value={password} type="password" placeholder="Password" />
          <br />
          <br />
          <button className='button-style-li' type='submit'>Log In</button>
        </form>
          {errorE && <p style={{margin: '1rem', color: 'red'}}>{errorE}</p>}
          {errorP && <p style={{margin: '1rem', color: 'red'}}>{errorP}</p>}
        
    </main>
  )
}

export default SignIn