import {useData} from '../hooks/useDatalogIn.js'
import './SignUp.css'

function SignUp() {
    const {name, updateName, errorN,
        surname, updateSurname, errorS,
        email, updateEmail, errorE,
        password, updatePassword, errorP
    } = useData()
  
    const handleSubmit = () => {
      event.preventDefault();
      if (!errorS && !errorN && !errorE && !errorP) {
        alert('Signed In correctly.');
        window.location.href = '/';
      }
    }
    const handleChangeName = (event) => {
      updateName(event.target.value)
    }
    const handleChangeSurname = (event) => {
        updateSurname(event.target.value)
    }
    const handleChangeEmail = (event) => {
      updateEmail(event.target.value)
    }
    const handleChangePassword = (event) => { 
      updatePassword(event.target.value)
    }

  return (
    <main>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChangeName} value={name} type="text" placeholder="Name" />
          <br />
          <input onChange={handleChangeSurname} value={surname} type="text" placeholder="Surname" />
          <br />
          <input onChange={handleChangeEmail} value={email} type="text" placeholder="Email" />
          <br />
          <input onChange={handleChangePassword} value={password} type="password" placeholder="Password" />
          <br />
          <br />
          <button className='button-style-su' type='submit'>Sign Up</button>
        </form>
            {errorN && <p style={{margin: '1rem', color: 'red'}}>{errorN}</p>}
            {errorS && <p style={{margin: '1rem', color: 'red'}}>{errorS}</p>}
            {errorE && <p style={{margin: '1rem', color: 'red'}}>{errorE}</p>}
            {errorP && <p style={{margin: '1rem', color: 'red'}}>{errorP}</p>}
    </main>
  )
}

export default SignUp
