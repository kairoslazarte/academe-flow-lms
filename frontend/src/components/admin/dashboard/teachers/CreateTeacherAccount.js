import React, { useState } from 'react'
import axios from "axios"

const CreateTeacherAccount = () => {
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState('')

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const createTeacherAcc = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/admins/create-teacher', {
                first_name: e.target.first_name.value,
                middle_name: e.target.middle_name.value,
                last_name: e.target.last_name.value,
                phone: e.target.phone.value,
                email: e.target.email.value,
                password: e.target.password.value,
                image: image,
                birthdate: e.target.birthdate.value,
                address: e.target.address.value,
                zoom_link: e.target.zoom_link.value,
                zoom_id: e.target.zoom_id.value,
                zoom_password: e.target.zoom_password.value
            })

            alert('Successfully created teacher account!')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
            <div className="flex flex-col space-y-8">
                <h1 className="font-bold text-4xl">Create account for a Teacher</h1>

                <div className="border-2 border-gray-300 rounded-md p-8 h-full">
                    <form onSubmit={createTeacherAcc} className='flex flex-col space-y-6 divide-y'>
                        <div className="flex flex-row">
                            <div className="w-[30%] border-r">
                                <h2 className="text-xl font-semibold">Teacher Information</h2>
                            </div>
                            <div className="w-[70%] pl-6">
                                <div className="flex mb-6">
                                    <div className="max-w-2xl rounded-lg bg-gray-50">
                                        <div className="m-4">
                                            <label className="inline-block mb-2 font-semibold">Set profile photo</label>
                                            <div className="flex items-center justify-center w-full">
                                                {!image ? (
                                                        <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                                                        <div className="flex flex-col items-center justify-center pt-7">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                Attach photo
                                                            </p>
                                                        </div>
                                                        <input type="file" onChange={uploadFileHandler} className="opacity-0" />
                                                    </label>
                                                ) : (
                                                    <img 
                                                        className='h-24 w-24 rounded-full object-cover'
                                                        src={image}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First name <span className='text-red-500 font-bold'>*</span></label>
                                        <input type="text" id="first_name" name="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
                                    </div>
                                    <div>
                                        <label htmlFor="middle_name" className="block mb-2 text-sm font-medium text-gray-900">Middle name</label>
                                        <input type="text" id="middle_name" name="middle_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    </div>
                                    <div>
                                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last name <span className='text-red-500 font-bold'>*</span></label>
                                        <input type="text" id="last_name" name="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number <span className='text-red-500 font-bold'>*</span></label>
                                        <input type="number" id="phone" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0987-7654-321" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                                    </div>
                                    <div>
                                        <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">Birth Date <span className='text-red-500 font-bold'>*</span></label>
                                        <input type="date" id="birthdate" name="birthdate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter birthdate" required />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address <span className='text-red-500 font-bold'>*</span></label>
                                    <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@email.com" required />
                                </div> 
                                <div className="mb-6">
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Home address <span className='text-red-500 font-bold'>*</span></label>
                                    <input type="text" id="address" name="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Home address" required />
                                </div> 
                                <div className="mb-6">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Auto generated password</label>
                                    <input type="text" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={"academeFlowTestTeacherAccount@123"} value={"academeFlowTestTeacherAccount@123"} required disabled />
                                </div> 
                            </div>
                        </div>
                        
                        <div className="flex flex-row pt-6">
                            <div className="w-[30%] border-r">
                                <h2 className="text-xl font-semibold">Teacher Zoom Details (Optional)</h2>
                            </div>
                            <div className="w-[70%] pl-6">
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="zoom_link" className="block mb-2 text-sm font-medium text-gray-900">Zoom link</label>
                                        <input type="text" id="zoom_link" name="zoom_link" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter zoom link.." />
                                    </div>
                                    <div>
                                        <label htmlFor="zoom_id" className="block mb-2 text-sm font-medium text-gray-900">Zoom ID</label>
                                        <input type="text" id="zoom_id" name="zoom_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter zoom ID.."/>
                                    </div>
                                    <div>
                                        <label htmlFor="zoom_password" className="block mb-2 text-sm font-medium text-gray-900">Zoom password</label>
                                        <input type="text" id="zoom_password" name="zoom_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter zoom password.." />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex justify-center">
                            <button 
                                type="submit" 
                                className="bg-blue-500 border border-blue-500 text-white px-6 py-3 text-lg font-semibold rounded-lg transition duration-200 hover:bg-white hover:text-blue-500"
                            >
                                Create new account for Teacher
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTeacherAccount