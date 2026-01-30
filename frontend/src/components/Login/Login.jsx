import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'
import { createContext, useContext} from 'react';

import Admin from '../AdminNav/AdminNav'
import logo from '../../assets/logo.png'
import styles from './styles/login.module.css'
import leftArrow from '../../assets/left-arrow.png'

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState('')

  return (
    <AuthContext.Provider value={{ username, setUsername,password,setPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useUsername = () => {
    const { username } = useContext(AuthContext)
    return username
  }
export const usePassword = () =>{
    const {password} = useContext(AuthContext)
    return password
}

export default function Login({user}) {
    const { setUsername,setPassword } = useContext(AuthContext);
    const navigate = useNavigate()
    const initialValues = {username: "", password: ""}
    const [formValues,setFormValues] = useState(initialValues)
    const [errors,setErrors]= useState({})
    const handleChange = (e) =>{
         const {name,value} = e.target
         setFormValues(prevValues=>(
            {
                ...prevValues,
                [name]: value
             }
         ))
    }
    async function authenticate(){
        try{
            const response = await fetch('http://localhost/hospital/api/admin/login.php',
                {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "user": formValues.username,
                        "password": formValues.password,
                        "role": user,
                    }
                )
                }
                
            )  
            const result = await response.json()
            const res = await result.result
            return res
            
        }catch(err){
            console.log('error:' + err)
        }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const res = await authenticate()
        console.log(res)
        const validationErrors = validateForm()
        setErrors(validationErrors)
        setUsername(formValues.username)
        setPassword(formValues.password)
        if(Object.keys(validationErrors).length === 0){
            if(user === 'Admin' && res ==='success'){
                navigate('/Admin/addDoctor')
            }else if(user==='Doctor' && res==='success'){
                navigate('/Doctor/myDetails')
            }else if(user === 'Reception' && res==='success'){
                navigate('/Reception/addPatient')
            }else if(user === 'user'){
                navigate('/user')
            }else{
                setErrors((prev)=>(
                {
                    ...prev,
                    authentication: "username or password error"
                }
                ))
            }
        }
        
    }
    const validateForm = ()=>{
        const validationErrors = {}
        if(formValues.username === "" || formValues.password === ""){
            validationErrors.username = "username is required"
            validationErrors.password = "password is required"
        }
        if(formValues.username.length > 0 && formValues.username.length < 3){
            validationErrors.username = "Enter a username with 3 or more characters"
        }
        if(formValues.password.length > 0 && formValues.password.length < 3){
            validationErrors.password = "Enter a password with 3 or more characters"
        }
        return validationErrors
    }
    return(
        <section className={styles.login}>
            <img src={leftArrow} className={styles['left-arrow']} onClick={()=>navigate('/login')} alt="Back"/>
            <div className={styles['img-container']}>
                <img className={styles['login-logo']} src={logo} alt='logo'/>
            </div>
            <form onSubmit={handleSubmit} className={styles['login-form']}>
                <h1>{user} Login</h1>
                <div className={styles['input-container']}>
                    {errors.authentication && <p className={styles['error-text']}>{errors.authentication}</p>}
                    <label htmlFor='username'>
                        Username
                    </label>
                    <input 
                        type="text" 
                        id='username' 
                        placeholder='Enter your username'
                        name='username' 
                        onChange={handleChange}
                    />
                    {errors.username && <p className={styles['error-text']}>{errors.username}</p>}
                </div>
                <div className={styles['input-container']}>
                    <label htmlFor='password'>
                        Password
                    </label>
                    <input 
                        type="password" 
                        id='password' 
                        placeholder='******' 
                        name='password'
                        onChange={handleChange}
                    />
                    {errors.password && <p className={styles['error-text']}>{errors.password}</p>}
                </div>
                <button type='submit'>Login</button>
            </form>
        </section>
    )
}
 