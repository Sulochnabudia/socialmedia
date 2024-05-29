import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loggedInUser, removeLoggedInUser } from './storageOperation/StorageOperation';

function Navbar() {

    const Navigate = useNavigate();

    const logout = () => {
        removeLoggedInUser()
        Navigate("/signin")
    }
    const handleDropdown = (e) => {
        Navigate(e.target.value)
    }
    return (
        <>
            <div className='d-flex justify-content-between shadow p-2 align-items-center '>
                <div className='logo'>
                    <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/link--v1.png" alt="link--v1" />
                    <Link to="/"> LOGO</Link>
                </div>
                <div className='d-flex align-content-center'>

                    <div>
                        <img width="40" height="40" src="https://img.icons8.com/papercut/60/user.png" alt="user" />

                        <select className='' style={{ border: "none" }} onChange={handleDropdown}>
                            <option value="/" >{(loggedInUser()?.name)} </option>
                            <option value="/mypost">My Posts</option>
                        </select>
                    </div>

                    <Link to="/addpost" className='btn btn-primary mx-2'>+</Link>
                    <button className='btn btn-danger ' onClick={logout}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default Navbar