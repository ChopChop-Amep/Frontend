import { useState, useEffect, useRef } from 'react'

export function useData() {

    //The email stored in the state.
    const [email, updateEmail] = useState('')
    const [errorE, setErrorE] = useState(null)
    const isFirstInputEmail = useRef(true)
    //The password stored in the state.
    const [password, updatePassword] = useState('')
    const [errorP, setErrorP] = useState(null)
    const isFirstInputPassword = useRef(true)

    //This are just examples of some errors
    //that can be shown to the user.
    //But the real error are if the email or the password
    //are registred or not in the database.

    useEffect(() => {
        if(isFirstInputEmail.current) {
            isFirstInputEmail.current = email === ''
            return
        }
        //The email can not be empty and must have the '@' and '.' characters.
        if(email === '' || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            setErrorE('Enter a valid email please.')
            return
        }
        setErrorE(null)
    }, [email])

    useEffect(() => {
        if(isFirstInputPassword.current) {
            isFirstInputPassword.current = password === ''
            return
        }
        //The password can not be empty.
        if(password === '') {
            setErrorP('Enter a password please.')
            return
        }
        //The password must have at least 6 characters.
        if(password.length < 6) {
            setErrorP('Password no long enough.')
            return
        }
        //The password can not have spaces.
        if(password.indexOf(' ') !== -1) {
            setErrorP('The password can not have spaces.')
            return
        }
        setErrorP(null)
    },[password])

    return {email, updateEmail, errorE,
        password, updatePassword, errorP}
}