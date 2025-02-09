import { AdminLoginContext } from "../../../contexts/admin/AdminLoginContexts"
import { useContext, useState } from "react"
import axios from "axios"
import { Eye } from 'lucide-react';
import { toast } from "react-toastify";
import { SpinningWhiteCircleLoader } from "../../common/Loaders";


const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const { admin, setAdmin } = useContext(AdminLoginContext)
    const [errorLogin, setErrorLogin] = useState(false)

    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: admin } = await axios.post('/api/admins/login', {
                email: e.target.email.value,
                password: e.target.password.value
            });
            if (admin?.error) throw new Error(admin?.error);
            setAdmin(admin);
        } catch (error) {
            setErrorLogin(true);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        // <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#B3FFAE]">
        //     <div className="w-full max-w-md shadow-md rounded-md p-8 bg-[#F8FFDB]">
        //         <div>
        //             <a href="/admin">
        //                 <img
        //                     className="mx-auto h-20 w-auto animate-pulse"
        //                     src="/static/images/dhm-logo-sm.png"
        //                     alt="DHM logo small"
        //                 />
        //             </a>
        //             <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 animate-bounce">
        //                 Sign in as Admin
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
        //                     <label htmlFor="email-address" className="sr-only">
        //                         Email address
        //                     </label>
        //                     <input
        //                         id="email-address"
        //                         name="email"
        //                         type="email"
        //                         autoComplete="email"
        //                         required
        //                         className={`relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm ${errorLogin ? `border-red-600` : `border-gray-300`}`}
        //                         placeholder="Email address"
        //                     />
        //                 </div>
        //                 <div>
        //                     <label htmlFor="password" className="sr-only">
        //                         Password
        //                     </label>
        //                     <input
        //                     id="password"
        //                         name="password"
        //                         type="password"
        //                         autoComplete="current-password"
        //                         required
        //                         className={`relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm ${errorLogin ? `border-red-600` : `border-gray-300`}`}
        //                         placeholder="Password"
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
                    <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-gray-900 text-center">Login as a Admin</h1>
        
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

export default AdminLogin