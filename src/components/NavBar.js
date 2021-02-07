import React from 'react'
import ReactDOM from 'react-dom';
import {Link, Route, withRouter}  from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Account from './Account'



const NavBar = (props)=> {
  const {userLoggedIn, userAuth} = props
  return(
    <div>
        <ul>
            <li><Link to='/'>Home</Link></li>
            {
                userLoggedIn ? (
                    <>
                        <li><Link to='/account'>Account</Link></li>
                        <li><Link onClick={()=>{
                            localStorage.removeItem('token')
                            alert("Successfully LoggedOut")
                            userAuth()
                            props.history.push('/')
                        }}>Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to='/register'>Register</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </>
                )
            }
        </ul>
        <Route path='/'  exact={true} component={Home}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/account' component={Account}></Route>
        <Route path='/login' render={(props)=>{
            return <Login {...props} userAuth={userAuth}/>
        }}>
        </Route>
    </div>
  )
}

const WrappedComponent = withRouter(NavBar) // withRouter is a Higher order component that accepts component as an input and returns     another component, this was used because NavBar did not have access to history object since it was not called within Route component.to enable access to history we used a withRouter higher order component.

export default WrappedComponent;