import { useUsername } from '../../../components/Login/Login'
import { usePassword } from '../../../components/Login/Login'
import { useState,useEffect } from 'react'
import styles from './styles/mydetails.module.css'

export default function MyDetails(){
    const username = useUsername()
    const password = usePassword()
    const [details,setDetails] = useState({name: '',address: '',email: '',phone: '',specialization: '',salary:''}) 
    const url = "http://localhost/hospital/api/doctor/myDetails.php"
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    const body = JSON.stringify({
        "name": username,
        "password": password
    })
    useEffect(() => {
        const fetchDetails = async () => {
          try {
            const response = await fetch('http://localhost/hospital/api/doctor/myDetails.php', {
              method: 'POST',
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: username,
                password: password
              })
            })
            const result = await response.json()
            console.log(result)
            setDetails(result)
    
          } catch (error) {
            console.error("Failed to fetch details:", error)
          }
        }
    
        fetchDetails()
      }, [username, password])
    return(
        <div className={styles['mydetails-container']}>
            <table className={styles['mydetails-table']}>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Specialization</th>
                        <th>Salary</th>
                    </tr>
                    <tr>
                    <td>{details.name}</td>
                    <td>{details.address}</td>
                    <td>{details.email}</td>
                    <td>{details.phone}</td>
                    <td>{details.specialization}</td>
                    <td>{details.salary}</td>
                    </tr>
                </tbody>
            </table>
         <div className={styles['mobile-table']}>
            <h3>Name: {details.name}</h3>
            <h3>Address: {details.address}</h3>
            <h3>Email: {details.email}</h3>
            <h3>Phone: {details.phone}</h3>
            <h3>Specialization: {details.specialization}</h3>
            <h3>Salary: {details.salary}</h3>
         </div>
        </div>
        
    )
}