import { Link } from 'react-router-dom'
import { useUsername } from '../../../components/Login/Login'
import styles from './styles/assignedpatient.module.css'
import { useEffect,useState } from 'react';

export default function AssignedPatient(){
    const username = useUsername()
    const [patients,setPatients] = useState([])
    async function loadAssignedPatient() {
        const res = await fetch("http://localhost/hospital/api/doctor/assignedPatient.php", {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: username }) 
        })
      
        const data = await res.json()
        setPatients(data)
      }
      
    useEffect(()=>{
        loadAssignedPatient()
    },[])
    return(
        <> 
            {patients&& 
            (<table className={styles.patientTable}>
             <thead>
               <tr>
                 <th>name</th>
                 <th>address</th>
                 <th>date</th>
                 <th>disease</th>
                 <th>patientId</th>
                 <th>phone</th>
                 <th>time</th>
               </tr>
             </thead>
             <tbody>
                   {patients.map((row,index)=>{return(
                      <tr key={index}>
                         <td>{row.name}</td>
                         <td>{row.address}</td>
                         <td>{row.date}</td>
                         <td>{row.disease}</td>
                         <td>{row.patientId}</td>
                         <td>{row.phone}</td>
                         <td>{row.phone}</td>
                     </tr>
                   )
                 })}
                 </tbody>
          </table>)}
        </>
  )
}