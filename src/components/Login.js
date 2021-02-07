import React,{useState, useEffect} from 'react'
import ReactDOM from 'react-dom';
import validator from 'validator'
import axios from 'axios'



const Login = (props)=> {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})


    const errors = {}

    const handleChange = (e)=>{
        const attr = e.target.name

        if(attr==='email'){
            setEmail(e.target.value)
        }else if(attr==='password'){
            setPassword(e.target.value)
        }
    }   

    const runValidations=()=>{
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
            const formDataLogin = {
                email : email,
                password : password
            }
            console.log('formData', formDataLogin)
            setPassword('')
            setEmail('')

            axios.post('https://dct-user-auth.herokuapp.com/users/login',formDataLogin)
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(Object.keys(result).includes('errors')){
                    alert(result.errors)
                }else{
                    alert('User Successfully Logged In !!!!!')
                    localStorage.setItem('token', result.token)
                    props.history.push('/')
                    props.userAuth()
                }
            })
            .catch((err)=>{
                alert(err)
            })
        }
        else{
            setFormErrors(errors)
            console.log('formErrors', errors)
        }
    }
  return(
    <div>
        <h2>Login Here</h2>
        <form onSubmit={handleSubmit}>
        <input type='text' value = {email} onChange={handleChange} name='email' placeholder='Enter Email'></input><br/>
        {
            formErrors.email && <div><span style={{color:'red'}}>{formErrors.email}</span><br/></div>
        }
        <input type='text' value = {password} onChange={handleChange} name='password' placeholder='Enter Password'></input><br/>
        {
            formErrors.password && <div><span style={{color:'red'}}>{formErrors.password}</span><br/></div>
        }
            <input type='submit' value='Submit'></input>
        </form>
    </div>
  )
}

export default Login;
