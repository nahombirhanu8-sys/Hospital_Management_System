import React from 'react'
import {useState} from 'react'

import Footer from '../../components/Footer/Footer'
import styles from './styles/contactus.module.css'

export default function ContactUs() {
    const [formValues,setFormValues] = useState({name: '',email: '',message: ''})
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
    async function sendMessage(){
        const res = await fetch("http://localhost/hospital/api/sendMessage.php",
            {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(formValues)
            }
        )
        const data = await res.json()
        setMessage(data.message)
    }
    function handleSubmit(e){
        e.preventDefault()
        sendMessage()
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                    <h1>Get in Touch</h1>
                    <p>we'd love to hear you! Reach out with questions,feedback, or just to say hi.</p>
                    <label>
                        Name
                        <input type="text" placeholder='Your Name' onChange={handleForm} name='name'/>
                    </label>
                    <label>
                        Email
                        <input type="email" placeholder='Your Email' onChange={handleForm} name='email'/>
                    </label>
                    <label>
                        Message
                        <textarea placeholder='Message' onChange={handleForm} name='message'></textarea>
                    </label>
                    <button type='submit'>Send Message</button>
                    {message&&<p>{message}</p>}
            </form>
            <Footer/>
        </>
    )
}
