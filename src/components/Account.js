import React,{useState, useEffect} from 'react'
import axios from 'axios'
const Account = (props)=>{
    const [user, setUser] = useState({})

    useEffect(()=>{
        axios.get('http://dct-user-auth.herokuapp.com/users/account',{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            setUser(result)
        })
        .catch((err)=>{

        })
    },[])

    const myObj = {
        UserName : user.username,
        Email : user.email
    }

    return (
        <div>
            <h3>Account Info below</h3>
            <ul>
                {Object.keys(myObj).map((userinfo)=>{
                    return <li>{userinfo} - {myObj[userinfo]}</li>
                })}
            </ul>
        </div>
    )
}

export default Account