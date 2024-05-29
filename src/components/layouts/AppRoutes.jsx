import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes/routes'
import Signin from '../pages/Signin'
import { loggedInUser } from '../storageOperation/StorageOperation'


function AppRoutes() {

    const [update, setUpdate] = useState(0)


    return (
        < >
            <Routes>
                {loggedInUser() && privateRoutes.map((e, i) => (
                    <Route path={e.path} element={<e.element />} key={i} />
                ))
                }

                {
                    publicRoutes.map((e, i) => (
                        <Route path={e.path} element={<e.element setUpdate={setUpdate} />} key={i} />
                    ))
                }

                <Route path='*' element={<Signin setUpdate={setUpdate} />} />

            </Routes>
        </ >
    )
}

export default AppRoutes