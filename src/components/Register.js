import React,{useState, useEffect} from 'react'
import ReactDOM from 'react-dom';
import validator from 'validator'
import axios from 'axios'


const Register = (props)=> {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})

    const errors ={}

    const handleChange = (e)=>{
        const attr = e.target.name

        if(attr==='username'){
            setUsername(e.target.value)
        }else if(attr==='email'){
            setEmail(e.target.value)
        }else if(attr==='password'){
            setPassword(e.target.value)
        }
    }   

    const runValidations=()=>{
        if(username.trim().length===0){
            errors.username = "username can't be blank"
        }
        if(password.trim().length===0){
            errors.password = "password can't be blank"
        }
        if(email.trim().length===0){
            errors.email = "email can't be blank"
        }else if(!validator.isEmail(email)){
            errors.email = "email format incorrect"
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length===0){
            setFormErrors({})
            const formData = {
                username : username,
                email : email,
                password : password
            }
            console.log('formData', formData)
            setUsername('')
            setPassword('')
            setEmail('')

            axios.post('http://dct-user-auth.herokuapp.com/users/register',formData)
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.message)
                }else{
                    alert('Successfully Created User')
                    props.history.push('/login')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else{
            setFormErrors(errors)
            console.log('formErrors', errors)
        }

        
        
    }

  return(
    <div>
        <h3>Register ONCE!</h3>
        <form onSubmit={handleSubmit}>
            <input type='text' value = {username} onChange={handleChange} name='username' placeholder='Enter Username'></input><br/>
            {
                formErrors.username && <div><span style={{color:'red'}}>{formErrors.username}</span><br/></div>
            }
            <input type='text' value = {email} onChange={handleChange} name='email' placeholder='Enter Email'></input><br/>
            {
                formErrors.email && <div><span style={{color:'red'}}>{formErrors.email}</span><br/></div>
            }
            <input type='text' value = {password} onChange={handleChange} name='password' placeholder='Enter Password'></input><br/>
            {
                formErrors.password && <div><span style={{color:'red'}}>{formErrors.password}</span><br/></div>
            }
            <input type='submit' value='Register'></input>
        </form>
    </div>
  )
}

export default Register
