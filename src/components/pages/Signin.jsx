import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loggedInUser, setLoggedInUser, storageUsers } from '../storageOperation/StorageOperation'

function Signin({ setUpdate }) {

    // console.log(setUpdate)

    // Use States for input values
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    //Use States for formSubmited and Error Object
    const [error, setError] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [existUser, setExistUser] = useState({})

    // use navigate state
    const navigate = useNavigate();

    // Handle Functions
    const handleChange = (e) => {
        if (e.target.name === 'terms') {
            setUser({ ...user, [e.target.name]: e.target.checked })
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const userExists = () => {
        if (storageUsers()) {
            let exists = false

            storageUsers().forEach(data => {
                if (data.email === user.email) {
                    exists = true
                    setExistUser(data)
                }
            });
            return exists
        }
    }

    const verify = () => {
        let localError = {}
        let returnVerified = true;

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        const addErrorMessage = (key, msg) => {
            localError[key] = msg
            returnVerified = false
        }

        //for email
        if (!true) {
            addErrorMessage("email", "Please Enter Email")
        } else if (!emailRegex.test(user.email)) {
            addErrorMessage("email", "Please enter a valid email")
        } else if (!userExists()) {
            addErrorMessage("email", "User does not exits")
        }

        // for password
        if (!user.password) {
            addErrorMessage("password", "Please,enter password")
        } else if (existUser.password !== user.password) {
            addErrorMessage("password", "incorrect password")
        }

        setError(localError)
        return returnVerified
    }

    const handleSubmit = () => {
        setIsSubmitted(true)

        if (verify()) {
            if (storageUsers()) {
                const userl = storageUsers().find(e => e.email === user.email)

                if (userl.password === user.password) {
                    setLoggedInUser(userl)
                    setUser({
                        email: "",
                        password: "",
                    })
                    setUpdate(1)
                    navigate("/")
                }
            }
            setIsSubmitted(false)
        }
    }


    useEffect(() => {
        verify()
    }, [user])

    useEffect(() => {
        if (!loggedInUser()) {
            navigate("/signin")
        } else {
            navigate("/")
        }

    }, [])


    return (
        < >
            <div>
                <h3 className='text-center alert alert-primary '>Login User</h3>
                <div className='container w-50 my-3 p-5 shadow ' style={{ borderRadius: "20px" }}>

                    {/* user Email */}
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' value={user.email} className='form-control' id='email' placeholder="Enter email" onChange={handleChange} />
                        {error.email && isSubmitted && <p className='text-danger'>{error.email}</p>}
                    </div>

                    {/* user Password */}
                    <div className='form-group'>
                        <label htmlFor="pwd">Password</label>
                        <input type="password" name='password' value={user.password} className='form-control' id='pwd' placeholder="Password" onChange={handleChange} />
                        {error.password && isSubmitted && <p className='text-danger'>{error.password}</p>}
                    </div>

                    {/* Submit button */}
                    <button onClick={handleSubmit} type='submit' className='btn btn-primary mt-2'>Submit</button>

                    {/* link */}
                    <hr />
                    <Link to="/Signup"> Create New Account</Link>
                </div>
            </div>
        </ >
    )
}

export default Signin