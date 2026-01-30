import {useEffect, useState} from 'react'
import styles from './styles/addDoctor.module.css'
import { SetMealSharp } from '@mui/icons-material'

export default function AddDoctor(){
    const initialFormValues = {
        doctorId: "",
        name:"",
        email:"",
        phone:"",
        specialization:"",
        address: "",
        salary:"",
        password:""
    }
    const[formValues,setFormValues] = useState(initialFormValues)
    const [message,setMessage] = useState('')
    function onChange(e){
        const {name,value} = e.target
        setFormValues((prev)=>({
            ...prev,
            [name]: value
        }))
    }
    async function addDoctor(){
        const url = "http://localhost/hospital/api/admin/addDoctor.php"
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        const body = JSON.stringify(formValues)
        const res = await fetch(url,{
            method: 'POST',
            headers: headers,
            body: body
        })
        const result = await res.json()
        const message = await result.message
        setMessage(message)
    }
    function handleSubmit(e){
        e.preventDefault()
        addDoctor()
        setFormValues(initialFormValues)
    }
    useEffect(()=>{
        if(message){
            const timer = setTimeout(()=>{
                setMessage('')
            },2000)
        }
    },[message])
    return(
        <form className={styles.form} method='POST' onSubmit={handleSubmit}>
            {message&&<p>{message}</p>}
            <label>
                Name
                <input type="text" value={formValues.name} name='name' onChange={onChange}/>
            </label>
            <label>
                Address
                <input type="text" value={formValues.address} name='address' onChange={onChange} />
            </label>
            <label>
                Email
                <input type="email" value={formValues.email} name='email' onChange={onChange} />
            </label>
            <label>
                Phone No.
                <input type="text" value={formValues.phone} name='phone' onChange={onChange} />
            </label>
            <label>
                Specialization
                <input type="text" value={formValues.specialization} name='specialization' onChange={onChange}/>
            </label>
            <label>
                Salary
                <input type="number" value={formValues.salary} name='salary' onChange={onChange} />
            </label>
            <label>
                Password
                <input type="password" value={formValues.password} name='password' onChange={onChange}/>
            </label>
            <button className={styles.button} type="submit">Submit</button>
        </form>
    )
}