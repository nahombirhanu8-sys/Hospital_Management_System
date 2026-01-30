import { useState,useEffect } from 'react'
import styles from './styles/viewpatient.module.css'

export default function ViewPatients(){
    const [patientInfo,setPatientInfo] = useState([])
    async function loadPatientInfo(){
        const url = "http://localhost/hospital/api/Reception/viewPatients.php"
        const headers = {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
        const res = await fetch(url,{
          method: 'GET',
          headers: headers,
        })
        const rows = await res.json()
        setPatientInfo(rows)
    }
    useEffect(()=>{
        loadPatientInfo()
    },[])
    return(
        
        <>
           {patientInfo&& 
                (<table>
                 <thead>
                   <tr>
                     <th>id</th>
                     <th>name</th>
                     <th>address</th>
                     <th>phone</th>
                     <th>disease</th>
                     <th>date</th>
                     <th>time</th>
                     <th>assigned to</th>
                   </tr>
                 </thead>
                 <tbody>
                       {patientInfo.map((row,index)=>{return(
                          <tr key={index}>
                             <td>{row.id}</td>
                             <td>{row.name}</td>
                             <td>{row.password}</td>
                             <td>{row.phone}</td>
                             <td>{row.disease}</td>
                             <td>{row.date}</td>
                             <td>{row.time}</td>
                             <td>{row.doctorId}</td>
                         </tr>
                       )
                     })}
                     </tbody>
              </table>)}
        </>
    )
}