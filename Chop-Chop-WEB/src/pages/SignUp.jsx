import {useData} from '../hooks/useDataLogIn.js'
import './SignUp.css'

function LogIn() {
    const {name, updateName, errorN,
        surname, updateSurname, errorS,
        email, updateEmail, errorE,
        password, updatePassword, errorP
    } = useData()
  
    const handleSubmit = () => {
        event.preventDefault();
        if (!errorN && !errorS && !errorE && !errorP)
        {
            alert('Loged In correctly.')
            window.location.href = '/'
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
            <div>
                <input onChange={handleChangeName} value={name} type="text" placeholder="Name" />
            </div>
            <div>
                <input onChange={handleChangeSurname} value={surname} type="text" placeholder="Surname" />
            </div>
            <div>
                <input onChange={handleChangeEmail} value={email} type="text" placeholder="Email" />
            </div>
            <div>
                <input onChange={handleChangePassword} value={password} type="password" placeholder="Password" />
            </div>
            <br />
            <div>
                <button className='button-style-su' type='submit'>Sign Up</button>
            </div>
        </form>
        <div>
            {errorN && <p style={{margin: '1rem', color: 'red'}}>{errorN}</p>}
        </div>
        <div>
            {errorS && <p style={{margin: '1rem', color: 'red'}}>{errorS}</p>}
        </div>
        <div>
            {errorE && <p style={{margin: '1rem', color: 'red'}}>{errorE}</p>}
        </div>
        <div>
            {errorP && <p style={{margin: '1rem', color: 'red'}}>{errorP}</p>}
        </div>
    </main>
  )
}

export default LogIn