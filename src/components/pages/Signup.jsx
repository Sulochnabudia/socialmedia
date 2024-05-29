import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setStorageUsers, storageUsers } from '../storageOperation/StorageOperation'

function Signup({ setUpdate }) {

    console.log(setUpdate)
    // Use States for input values
    const [user, setUser] = useState({})

    //Use States for formisSubmitted and Error Object
    const [error, setError] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    //use navigate state
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
                    console.log(data.email)
                    console.log("sss", user.email)
                    exists = true
                }
            });
            return exists
        }
    }

    // verify function
    const verify = () => {
        let localError = {}
        let returnVerified = true;

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

        const addErrorMessage = (key, msg) => {
            localError[key] = msg
            returnVerified = false
        }

        //for Name
        if (!user.name) {
            addErrorMessage("name", "Please Enter name")
        } else if (user.name?.length < 2) {
            addErrorMessage("name", "Name should have atleast 2 char")
        }

        //for email
        if (!user.email) {
            addErrorMessage("email", "Please Enter Email")
        } else if (!emailRegex.test(user.email)) {
            addErrorMessage("email", "Please enter a valid email")
        } else if (userExists()) {
            console.log(userExists())
            addErrorMessage("email", "User already exits")
        }

        // for password
        if (!user.password) {
            addErrorMessage("password", "Please,enter password")
        } else if (!passwordRegex.test(user.password)) {
            addErrorMessage("password", "Password must contain a number,special char,capital and small chars,8-32 length ")
        } else if (user.password !== user.confirmpassword) {
            addErrorMessage("confirmpassword", "Password does not match")
        }

        // terms
        if (!user.terms) {
            addErrorMessage("terms", "Please check this box")
        }
        setError(localError)
        return returnVerified
    }


    const handleSubmit = () => {
        // console.log('called')
        setIsSubmitted(true)

        if (verify()) {
            if (storageUsers()) {
                setStorageUsers(storageUsers().concat(user))
            }
            else {
                setStorageUsers([user])
            }

            setIsSubmitted(false)
            setUser({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: false
            })
            navigate("/signin")
        }
    }


    useEffect(() => {
        verify()
    }, [user])




    return (
        <>
            {/* <Toaster /> */}
            <div>
                <h1 className='text-center alert alert-primary'>SignUp</h1>
                <div className='w-50 m-auto mt-3 p-4 shadow'>

                    <h6 className='text-center '>Create Your Account</h6> <br />

                    {/* user name */}
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">User Name</label>
                        <input type="text" className="form-control " placeholder="Enter Your Name" value={user.name} id="name" name="name" onChange={handleChange} />
                        {error.name && isSubmitted && <p className='text-danger'>{error.name}</p>}
                    </div>

                    {/* Email address */}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control " placeholder="Enter your Email Address" value={user.email} id="email" name="email" onChange={handleChange} />
                        {error.email && isSubmitted && <p className='text-danger'>{error.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="pwd" className="form-label">Password</label>
                        <input type="password" className="form-control" id="pwd" placeholder="Enter Password" value={user.password} name="password" onChange={handleChange} />
                        {error.password && isSubmitted && <p className='text-danger'>{error.password}</p>}
                    </div>

                    {/* Conform Password */}
                    <div className="form-group">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm-password" placeholder="Enter Confirm Password" value={user.confirmPassword} name="confirmpassword" onChange={handleChange} />
                        {error.confirmPassword && isSubmitted && <p className='text-danger'>{error.confirmPassword}</p>}
                    </div> <br />

                    {/* terms */}
                    <div className='form-group form-check '>
                        <label className='form-label' htmlFor=" examplecheck1">Agree terms and condition</label>
                        <input type="checkbox" name='terms' checked={user.terms} className='form-check-input' id="terms" onChange={handleChange} />
                        {error.terms && isSubmitted && <p className='text-danger'>{error.terms}</p>}
                    </div><br />

                    <button type="submit" className="btn btn-primary " onClick={handleSubmit}>SignUp</button>

                    <hr />
                    <Link to="/Signin">Already registered</Link>
                </div>
            </div>
        </>
    )
}

export default Signup