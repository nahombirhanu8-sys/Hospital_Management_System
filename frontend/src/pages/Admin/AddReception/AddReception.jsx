
import { useState } from 'react'
import styles from './styles/adminreception.module.css'

export default function AddReception(){
    const initialValues = {name: "",address: "",email: "",salary: "",password: ""}
    const [formValues,setFormValues] = useState(initialValues)
    const [message,setMessage] = useState('')
    function handleValues(e){
        const {name,value} = e.target
        setFormValues((prev)=>({
                prev,
                [name]: value
        }))
    }
    async function postReception(){
        try{
            const url = "http://localhost/hospital/api/admin/addReception.php"
            const headers =  {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
            const body = JSON.stringify(formValues)
            const res = await fetch(url,{
                method: 'POST',
                headers: headers,
                body: body
            })  
            const data = await res.json()
            const message =  data.message
            setMessage(message)
        }catch(err){
            setMessage(err)
        }
    }
    function handleSubmit(e){
        e.preventDefault()
        postReception()
        setFormValues(initialValues)
    }
    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            {message && <p>{message}</p>}
            <h1>Add Receptionist</h1>
            <label>
                Name 
                <input type="text" value={formValues.name} name="name" onChange={handleValues}/>
            </label>
            <label>
                Address
                <input type="text" value={formValues.address} name="address" onChange={handleValues}/>
            </label>
            <label>
                Email
                <input type="email" value={formValues.email} name='email' onChange={handleValues}/>
            </label>
            <label>
                Salary
                <input type="number" value={formValues.salary} name="salary" onChange={handleValues}/>
            </label>
            <label>
                Password
                <input type="password" value={formValues.password} name="password" onChange={handleValues}/>
            </label>
            <button className={styles.button} type="submit">Submit</button>
        </form>
    )
}