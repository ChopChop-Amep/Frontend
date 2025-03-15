import {useData} from '../hooks/useDataSignUp.js'

function SignIn() {
  const {email, updateEmail, errorE, password, updatePassword, errorP} = useData()

  const handleSubmit = () => {
    alert('Signed In correctly.')
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
            <div>
                <input className="inputEmail" onChange={handleChangeEmail} value={email} type="text" placeholder="Email" />
            </div>
            <div>
                <input className="inputPassword" onChange={handleChangePassword} value={password} type="password" placeholder="Password" />
            </div>
            <div>
                <button type='submit'>Sign In</button>
            </div>
        </form>
        <div>
          {errorE && <p style={{margin: '1rem', color: 'red'}}>{errorE}</p>}
        </div>
        <div>
          {errorP && <p style={{margin: '1rem', color: 'red'}}>{errorP}</p>}
        </div>
        
    </main>
  )
}

export default SignIn