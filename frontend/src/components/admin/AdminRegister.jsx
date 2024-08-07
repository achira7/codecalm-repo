import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

const baseUrl = "http://127.0.0.1:8000/api/register/";

function AdminRegister() {
    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const is_staff = 'True';
    const is_superuser = 'True';

    const registerFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(baseUrl, {
                first_name,
                last_name,
                email,
                password,
                is_staff,
                is_superuser
            }, { withCredentials: true });
            setRegisterSuccess(true);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    if (registerSuccess) {
        console.log("Admin Sucessfully created!")
        //return <Navigate to="/admin/allemployees" />;
    }

    return (
        <div className='items-center'>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <Link to="/admin/allemployees">
                    <div className='flex items-center mx-5 hover: transition-transform duration-300 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-sky-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p className='text-sky-500 font-semibold font google text-lg mx-3'>
                            Back to All Admins
                        </p>
                    </div>
                </Link>

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900 font-google">
                        Add an Admin
                    </h2>

                    <h3 className='font-google text-center text-sky-500'>
                        to CodeCalm
                    </h3>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form method="POST" onSubmit={registerFormSubmit}>
                            <div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 font-google" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            name="first_name"
                                            type="text"
                                            placeholder="First Name"
                                            onChange={e => setFirst_Name(e.target.value)}
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 font-google" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            name="last_name"
                                            type="text"
                                            placeholder="Last Name"
                                            onChange={e => setLast_Name(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">
                                    E-mail Address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        id="name"
                                        name="email"
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="User's company email"
                                        type="email"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        onChange={e => setPassword(e.target.value)}
                                        name="password"
                                        type="password"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <span className="block w-full rounded-md shadow-sm">
                                    <button
                                        className="flex w-full justify-center rounded-md bg-green-300 px-3 py-1.5 font-google text-sm font-semibold leading-6 text-neutral-950 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                                        type="submit"
                                    >
                                        Create Admin Account
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminRegister;
