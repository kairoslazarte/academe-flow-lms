import { TeacherLoginContext } from '../../../contexts/teacher/TeacherLoginContexts'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../../contexts/auth/AuthContext'
import TextField from '@mui/material/TextField';
import { Eye } from 'lucide-react';
import { SpinningWhiteCircleLoader } from '../../common/Loaders';
import { toast } from 'react-toastify';


const TeacherLogin = () => {
    const [loading, setLoading] = useState(false);
    const { teacher, setTeacher } = useContext(TeacherLoginContext)
    const { setAuthUser } = useAuthContext();
    const [errorLogin, setErrorLogin] = useState(false)

    const loginHandler = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const {data: teacher} = await axios.post('/api/teachers/login', {
                email: e.target.email.value,
                password: e.target.password.value
            })
            if (teacher?.error) throw new Error(teacher?.error);
            setTeacher(teacher);
            setAuthUser(teacher);
        } catch (error) {
            setErrorLogin(true);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        // <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#B3FFAE]">
        //     <div>
        //        <div className='flex flex-col justify-center pb-10'>
        //             <h2 className='text-gray-900 font-bold text-5xl text-center w-3/4 mx-auto font-serif'>“Train up a child in the way he should go; even when he is old he will not depart from it.“</h2>
        //             <span className='text-center pt-2 text-gray-800 text-2xl italic font-bold font-serif'>Proverbs 22:6</span>
        //        </div>
        //     </div>
        //     <div className="w-full max-w-md shadow-md rounded-md p-8 bg-[#F8FFDB]">
        //         <div>
        //             <a href="/teacher">
        //                 <img
        //                     className="mx-auto h-24 w-auto"
        //                     src="/static/images/dhm-logo-sm.png"
        //                     alt="DHM logo small"
        //                 />
        //             </a>
        //             <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
        //                 Sign in as Teacher
        //             </h2>
        //         </div>
        //         <form className="mt-4 space-y-6" onSubmit={loginHandler}>
        //             <div className="flex flex-col space-y-4 rounded-md shadow-sm relative">
        //                 <p 
        //                     className={`w-full text-red-600 text-center absolute left-[50%] transform translate-x-[-50%] ${errorLogin ? 'block' : 'hidden'}`}
        //                 >
        //                     Invalid email or password.
        //                 </p>
        //                 <div className="pt-5">
        //                     <TextField
        //                         margin="normal"
        //                         required
        //                         fullWidth
        //                         id="email"
        //                         label="Email Address"
        //                         name="email"
        //                         autoComplete="email"
        //                         onChange={() => setErrorLogin(false)}
        //                         className={`border bg-white  ${errorLogin ? `border-red-600 bg-red-50 shake` : `border-gray-300`}`}
        //                         autoFocus
        //                     />
        //                 </div>
        //                 <div>
        //                     <TextField
        //                         margin="normal"
        //                         required
        //                         fullWidth
        //                         name="password"
        //                         label="Password"
        //                         type="password"
        //                         id="password"
        //                         onChange={() => setErrorLogin(false)}
        //                         autoComplete="current-password"
        //                         className={`border bg-white  ${errorLogin ? `border-red-600 bg-red-50 shake` : `border-gray-300`}`}
        //                     />
        //                 </div>
        //             </div>
        
        //             <div className="pt-3">
        //                 <button
        //                     type="submit"
        //                     className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#FF6464] py-2 px-4 text-sm font-medium text-white hover:bg-opacity-75 transition duration-200 focus:outline-none focus:ring-2 focus:ring-greenborder-green-700 focus:ring-offset-2"
        //                 >
        //                     <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        //                     </span>
        //                     Login
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div className="flex flex-col lg:flex-row min-h-screen bg-white">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col sm:my-0 my-6">
            {/* Logo */}
                <div className="mb-8 lg:mb-20">
                    <div className="flex items-center">
                    <img className='w-10 h-10 mr-2' src="/academe-flow-logo.png" />
                    <span className="text-xl font-semibold text-gray-800">Academe Flow</span>
                    </div>
                </div>
        
                {/* Login Form */}
                <form 
                    className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center"
                    onSubmit={loginHandler}
                >
                    <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-gray-900 text-center">Login as a Teacher</h1>
        
                    {/* Form Fields */}
                    <div className="space-y-4 pt-2">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-0"
                        />
                        <div className="relative pb-4">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-0"
                            />
                            <button type="button" className="absolute right-3 top-3 text-gray-400">
                                <Eye size={20} />
                            </button>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                            {!loading ? 'Sign in' : <SpinningWhiteCircleLoader />}
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Section - Hidden on mobile by default, shown as bottom section */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-emerald-400 to-emerald-600 p-8 lg:p-12 flex flex-col items-center justify-center relative">
                {/* Sign Up Content */}
                <div className="text-center text-white py-8 lg:py-0">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Academe Flow - Learning Management System</h2>
                    <p className="text-lg lg:text-xl mb-8 px-4">Where learning and teaching can never be more easier!</p>
                    <a 
                        href="mailto:kairoslazarte05@gmail.com" 
                        className="bg-white text-emerald-500 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                    >
                        Let's get in touch!
                    </a>
                </div>
            </div>

            {/* Mobile Sign Up Button - Only shown on smallest screens */}
            {/* <div className="lg:hidden w-full p-6 bg-white border-t border-gray-200">
                <a 
                    href="mailto:kairoslazarte05@gmail.com" 
                    className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                    Let's get in touch!
                </a>
            </div> */}
        </div>
    )
}

export default TeacherLogin