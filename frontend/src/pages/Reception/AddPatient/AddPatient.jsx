import { useEffect, useState } from 'react'
import styles from './styles/addpatient.module.css'

export default function AddPatient() {
  const [doctors, setDoctors] = useState([])
  const [formValues, setFormValues] = useState({name: '',address: '',phone: '',case: '',date: '',time: '',assignedTo: ''})

  async function loadDoctor() {
    try {
      const res = await fetch('http://localhost/hospital/api/admin/viewDoctors.php', {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })

      const data = await res.json()
      setDoctors(data)
    } catch (error) {
      console.error("Error loading doctors:", error)
    }
  }

  useEffect(() => {
    loadDoctor()
  }, [])
  function handleForm(e) {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }))
    console.log({ ...formValues, [name]: value }) 
  }
  async function addPatient(){
    const res = await fetch('http://localhost/hospital/api/Reception/addPatient.php',{
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formValues)
    })
    const result = await res.json()
    console.log(result)
  }
  function handleSubmit(e) {
    e.preventDefault()
    addPatient()
    console.log(formValues)
  }

  return (
    <form className={styles["container"]} onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" name="name" onChange={handleForm} />
      </label>
      <label>
        Address
        <input type="text" name="address" onChange={handleForm} />
      </label>
      <label>
        Phone No.
        <input type="text" name="phone" onChange={handleForm} />
      </label>
      <label>
        Case
        <input type="text" name="case" onChange={handleForm} />
      </label>
      <label>
        Date
        <input type="date" name="date" onChange={handleForm} />
      </label>
      <label>
        Time
        <input type="time" name="time" onChange={handleForm} />
      </label>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <label htmlFor="assign-doctor">Assign doctor</label>
        <select
          id="assign-doctor"
          name="assignedTo"
          value={formValues.assignedTo}
          onChange={handleForm}
        >
          <option value="">Select a Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.buttons}>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
