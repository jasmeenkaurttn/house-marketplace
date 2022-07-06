import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from'firebase/firestore'
import {db} from '../firebase.config'
import OAuth from '../components/OAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: ''
    })

    const { name, email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth() 

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user // we are getting user from that userCredential

            updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataCopy = {...formData} // copying everything which is in formData -> name, email & pwd
            delete formDataCopy.password // deleting pwd -> bcse we don't want to put it in db
            formDataCopy.timestamp = serverTimestamp() // setting TS to server's TS

            await setDoc(doc(db, 'users', user.uid), formDataCopy) // update the db & add our user to the user's collection

            navigate('/')
        } catch (error) {
            toast.error('Something went wrong with registration')
        }
    }
    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        WelcomeBack!
                    </p>
                </header>

                <form onSubmit={onSubmit}>
                    <input type="text" className="nameInput" placeholder='Name' id='name' value={name} onChange={onChange} />
                    <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange} />

                    <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange=
                            {onChange} />

                        <img src={visibilityIcon} alt="show password" className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)} />
                    </div>

                    <Link to='/forgot-password' className='forgotPasswordLink'>
                        Forgot Password
                    </Link>

                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>

                <OAuth />

                <Link to='/sign-in' className='registerLink'>
                    Sign In Instead
                </Link>
            </div>
        </>
    )
}

export default SignUp

  