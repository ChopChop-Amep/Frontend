import {useState, useEffect, useRef} from 'react'

export function useData () {
    //The name stored in the state.
    const [name, updateName] = useState('')
    const [errorN, setErrorN] = useState(null)
    const isFirstInputName = useRef(true)
    //The surname stored in the state.
    const [surname, updateSurname] = useState('')
    const [errorS, setErrorS] = useState(null)
    const isFirstInputSurname = useRef(true)
    //The email stored in the state.
    const [email, updateEmail] = useState('')
    const [errorE, setErrorE] = useState(null)
    const isFirstInputEmail = useRef(true)
    //The password stored in the state.
    const [password, updatePassword] = useState('')
    const [errorP, setErrorP] = useState(null)
    const isFirstInputPassword = useRef(true)

    useEffect(() => {
        if(isFirstInputName.current) {
            isFirstInputName.current = name === ''
            return
        }
        //The name can not be empty.
        if(name === '') {
            setErrorN('Enter a name please.')
            return
        }
    }, [name])

    useEffect(() => {
        if(isFirstInputSurname.current) {
            isFirstInputSurname.current = surname === ''
            return
        }
        //The surname can not be empty.
        if(surname === '') {
            setErrorS('Enter a surname please.')
            return
        }
    }, [surname])

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

    return {name, updateName, errorN, 
            surname, updateSurname, errorS,
            email, updateEmail, errorE,
            password, updatePassword, errorP}
}