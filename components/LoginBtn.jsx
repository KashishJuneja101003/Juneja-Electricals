import React from 'react'
import { Link } from 'react-router-dom'
const LoginBtn = () => {

    return (
        <Link to="/Login">
            <button className="bg-emerald-400 p-2 rounded-2xl cursor-pointer text-gray-700 font-semibold">Login</button>
        </Link>
    )
}

export default LoginBtn