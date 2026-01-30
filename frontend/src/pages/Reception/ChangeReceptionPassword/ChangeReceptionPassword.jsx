import { useUsername } from '../../../components/Login/Login'
import { usePassword } from '../../../components/Login/Login'
import { useEffect, useState } from 'react'
import styles from './styles/changereceptionpassword.module.css'

export default function ChangeDoctorPassword(){
    const [formValues,setFormValues] = useState({oldPassword: '',newPassword: ''})
    const username = useUsername();
    const [message,setMessage] = useState('')
    function handleForm(e){
        e.preventDefault()
        const {name,value} = e.target
        setFormValues((prev) => ({
            ...prev,
            [name]: value
          }))
          console.log(formValues)
    }
    async function changePassword() {
        const url = "http://localhost/hospital/api/Reception/changePassword.php"
        const headers = {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
        const body = JSON.stringify({
          "oldPassword": formValues.oldPassword,
          "newPassword": formValues.newPassword,
          "name": username
        })
    
        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
          })
          const result = await res.json()
          setMessage(result.message)
        } catch (error) {
          console.error("Error:", error)
        }
      }
    function handleSubmit(e){
        e.preventDefault()
        changePassword()
        
    }
    return(
        <div>
            <form action="" onSubmit={handleSubmit} className={styles['container']}>
                <h1>Change Password</h1>
                {message&& <p>{message}</p>}
                <label>
                    old Password
                    <input type="text" placeholder='enter old password' onChange={handleForm} name='oldPassword'/>
                </label>
                <label>
                    New Password
                    <input type="text" placeholder='enter new password' onChange={handleForm} name='newPassword'/>
                </label>
                <button>update</button>
            </form>
            
        </div>
    )
}