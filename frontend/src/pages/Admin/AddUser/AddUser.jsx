import {useState,useEffect} from 'react'
import styles from './styles/adduser.module.css'

export default function AddUser(){
    const initialValues = {name: "",address: "",email: "",phone: "", password: ""}
    const [formValues,setFormValues] = useState(initialValues)
    const [message,setMessage] = useState('')
    function handleForm(e){
        const {name,value} = e.target
        setFormValues((prev)=>({
                ...prev,
                [name]: value
            
        }))
        console.log(name + ":" +value)
    }
    async function addUser() {
        const url = 'http://localhost/hospital/api/admin/addUser.php';
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        const body = JSON.stringify(formValues);
    
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });
            const data = await res.json(); 
            const message = data.message; 
            setMessage(message);
            console.log(message)
        } catch (error) {
            console.error("Error parsing JSON:", error);
            setMessage("Server error or invalid JSON response.");
        }
    }
    function handleSubmit(e){
        e.preventDefault()
        addUser()
        setFormValues(initialValues)
    }
    useEffect(()=>{
        if(message){
            setTimeout(()=>{
                setMessage('')
            },2000)
        }
    },[message])
    
    return(
         <form className={styles.form} onSubmit={handleSubmit}>
                    {message&&<p>{message}</p>}
                    <h1>Add User</h1>
                    <label>
                        Name
                        <input type="text" name="name" value={formValues.name} onChange={handleForm}/>
                    </label>
                    <label>
                        Address
                        <input type="text" name="address" value={formValues.address} onChange={handleForm}/>
                    </label>
                    <label>
                        Email
                        <input type="email" name="email" value={formValues.email} onChange={handleForm}/>
                    </label>
                    <label>
                        Phone No.
                        <input type="text" name="phone" value={formValues.phone} onChange={handleForm}/>
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" value={formValues.password} onChange={handleForm}/>
                    </label>
                    <button className={styles.button} type="submit">Submit</button>
                </form>
    )
}
