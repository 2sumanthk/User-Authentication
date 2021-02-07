import React,{useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar'


const App = (props)=> {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const userAuth = ()=>{
    setUserLoggedIn(!userLoggedIn)
  }
  useEffect(()=>{
    if(localStorage.getItem('token'))
    userAuth()
  },[])
  return(
    <div>
        <h1>User Authentication</h1>
        <NavBar userLoggedIn={userLoggedIn} userAuth={userAuth}/>
    </div>
  )
}

export default App;
