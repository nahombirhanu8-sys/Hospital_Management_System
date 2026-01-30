import React from 'react'
import{Routes,Route,useLocation} from 'react-router-dom'
import DoctorNav from '../../components/DoctorNav/DoctorNav'
import MyDetails from './MyDetails/MyDetails'
import AssignedPatient from './AssignedPatient/AssignedPatient'
import ChangeDoctorPassword from './ChangePassword/ChangePassword'
import DoctorLogin from '../Login/DoctorLogin/DoctorLogin'
import styles from './styles/doctor.module.css'

export default function Doctor(){
  const location = useLocation()
  const hideNavBarRoutes = [
    '/Doctor/login'
  ]
  const shouldShowNavbar = !hideNavBarRoutes.includes(location.pathname)
    return(
       <div className={styles["doctor-container"]}>
            {shouldShowNavbar&&<DoctorNav/>}
            <Routes>
                <Route path='/myDetails' element={<MyDetails/>}/>
                <Route path='/assignedPatient' element={<AssignedPatient/>}/>
                <Route path='/changeDoctorPassword' element={<ChangeDoctorPassword/>}/>
                <Route path='/login' element={<DoctorLogin/>}/>
            </Routes>
       </div>
    )
}