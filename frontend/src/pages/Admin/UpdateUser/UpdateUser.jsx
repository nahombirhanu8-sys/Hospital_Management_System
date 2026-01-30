import { useEffect, useState } from 'react'
import styles from './styles/updateuser.module.css'

export default function UpdateUser() {
  const [name, setName] = useState('')
  const [edit,setEdit] = useState(false)
  const [editForm,setEditForm] = useState(null)
  const [message, setMessage] = useState('')
  const [userInfo,setUserInfo] = useState([])
  function loadDoctorToForm(doctor) {
    setFormValues(doctor)
    setShowUpdate(true)
  }
  function handleEdit(){
    setEdit(prev=>!prev)
  }
  function handleForm(e) {
    setName(e.target.value)
    console.log(name)
  }
  async function loadUserInfo(){
      const url = "http://localhost/hospital/api/admin/getUser.php"
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
      setUserInfo(rows)
      console.log(userInfo)
  }
  function handleSubmit(e) {
    e.preventDefault()
    loadUserInfo()
  }
  async function updateDoctor(e){
      e.preventDefault()
      const url = "http://localhost/hospital/api/admin/updateUser.php"
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
      <button type='submit' className={styles.searchButton}>Search</button>
     </form>
     {userInfo&& 
     (<table className={styles.updateTable}>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>address</th>
          <th>phone</th>
          <th>email</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
            {userInfo.map((row,index)=>{return(
               <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.address}</td>
                  <td>{row.phone}</td>
                  <td>{row.email}</td>
                  <td>{row.password}</td>
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
