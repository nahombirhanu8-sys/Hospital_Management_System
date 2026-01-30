import { useEffect, useState } from 'react'
import styles from './styles/updateDoctor.module.css'

export default function Updatedoctor() {
  const [name, setName] = useState('')
  const [edit,setEdit] = useState(false)
  const [editForm,setEditForm] = useState(null)
  const [message, setMessage] = useState('')
  const [doctorInfo,setDoctorInfo] = useState([])
  function handleEdit(){
    setEdit(prev=>!prev)
  }
  function handleForm(e) {
    setName(e.target.value)
    console.log(name)
  }
  async function loadDoctorInfo(){
    const url = "http://localhost/hospital/api/admin/getDoctor.php"
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    const body = JSON.stringify({"name": name})
    const res = await fetch(url,{
      method: 'POST',
      headers: headers,
      body: body
    })
    const rows = await res.json()
    setDoctorInfo(rows)
    console.log(doctorInfo)
}
  function handleSubmit(e) {
    e.preventDefault()
    loadDoctorInfo()
  }
  async function updateDoctor(e){
      e.preventDefault()
      const url = "http://localhost/hospital/api/admin/updateDoctor.php"
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
      const body = JSON.stringify(editForm)
      const res = await fetch(url,{
        method: 'POST',
        headers: headers,
        body: body
      })
      const message = await res.json()
      setMessage(message.message)
  }
  function editValue(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  return (
    <>
     <form className={styles.updateForm} onSubmit={handleSubmit}>
      <label>
        Name 
        <input type="text" className={styles.name} value={name} name="name" onChange={handleForm}/>
      </label>
      <button type='submit' className={styles}>Search</button>
     </form>
     {doctorInfo&& 
     (<table className={styles.updateTable}>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>password</th>
          <th>phone</th>
          <th>salary</th>
          <th>specialization</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
            {doctorInfo.map((row,index)=>{return(
               <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.password}</td>
                  <td>{row.phone}</td>
                  <td>{row.salary}</td>
                  <td>{row.specialization}</td>
                  <td>{row.email}</td>
                  <td><button onClick={()=>{
                    setEditForm(row)
                    handleEdit()
                  }} className={styles.editDoctor}>Edit</button></td>
              </tr>
            )
          })}
          </tbody>
   </table>)}
   {edit&&(
      <form className={styles.editForm} onSubmit={updateDoctor}>
        {message&&<p>{message}</p>}
        <label>
          id
          <input value={editForm.id} disabled/>
        </label>
        <label htmlFor="">
          name
          <input value={editForm.name} name='name' onChange={editValue} type='text'/>
        </label>
        <label htmlFor="">
          address
          <input value={editForm.address} name='address' onChange={editValue} type='text'/>
        </label>
        <label htmlFor="">
          salary
          <input value={editForm.salary} name='salary' onChange={editValue} type='number'/>  
        </label>
        <label htmlFor="">
          specialization
          <input value={editForm.specialization} name='specialization' onChange={editValue}  type='text'/>
        </label>
        <label htmlFor="">
          email
          <input value={editForm.email} name='email' onChange={editValue} type='email'/>
        </label>
        <label htmlFor="">
          password
          <input value={editForm.password} name='password' onChange={editValue} type='password'/>
        </label>
        <button>Update</button>
      </form>
   )}
     
  
      
    </>
  )
}
