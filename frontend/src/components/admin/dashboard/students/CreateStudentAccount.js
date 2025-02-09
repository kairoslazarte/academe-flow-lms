import axios from "axios"
import React, { useEffect, useState } from "react"

const CreateStudentAccount = () => {
    const [categories, setCategories] = useState()
    const [levels, setLevels] = useState()
    const [sections, setSections] = useState()
    const [step, setStep] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState('')

    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";

    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }

    const getAllLevels = async (id) => {
        try {
            const { data } = await axios.post('/api/admins/get-levels', {
                category: id
            })
            setLevels(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllSections = async (id) => {
        try {
            const { data } = await axios.post('/api/admins/get-sections', {
                levelID: id
            })
            setSections(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/admins/get-categories')
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }

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

    useEffect(() => {
        getAllCategories()

        if (step == 1) {
            getAllLevels(document.getElementById('category').value)
        } else if (step == 2) {
            getAllSections(document.getElementById('levelID').value)
        } 
    }, [setCategories, step])

    const createStudentAcc = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/admins/create-student', {
                first_name: e.target.first_name.value,
                middle_name: e.target.middle_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                address: e.target.address.value,
                password: e.target.password.value,
                image: image,
                parent_fName: e.target.parent_fName.value,
                parent_mName: e.target.parent_mName.value,
                parent_lName: e.target.parent_lName.value,
                parent_email: e.target.parent_email.value,
                phone: e.target.phone.value,
                relationship: e.target.relationship.value,
                categoryID: e.target.category.value,
                levelID: e.target.levelID.value,
                sectionID: e.target.sectionID.value,
                birthdate: e.target.birthdate.value,
            })
            alert('Successfully created student account!')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
            <div className="flex flex-col space-y-8">
                <h1 className="font-bold text-4xl">Create account for a Student</h1>

                <div className="border-2 border-gray-300 rounded-md p-8 h-full">
                    {categories && (
                        <form onSubmit={createStudentAcc} className="flex flex-col space-y-6 divide-y">
                            {/* Student Information */}
                            <div className="flex flex-row">
                                <div className="w-[30%] border-r">
                                    <h2 className="text-xl font-semibold">Student Information</h2>
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
                                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                                            <input type="text" id="first_name" name="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
                                        </div>
                                        <div>
                                            <label htmlFor="middle_name" className="block mb-2 text-sm font-medium text-gray-900">Middle name</label>
                                            <input type="text" id="middle_name" name="middle_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                        <div>
                                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                                            <input type="text" id="last_name" name="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required />
                                        </div>
                                        <div>
                                            <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">Birth Date</label>
                                            <input type="date" id="birthdate" name="birthdate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter birthdate" required />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                                        <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@email.com" required />
                                    </div> 
                                    <div className="mb-6">
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Home address</label>
                                        <input type="text" id="address" name="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Home address" required />
                                    </div> 
                                    <div className="mb-6">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Auto generated password</label>
                                        <input type="text" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={"academeFlowTestStudentAccount@123"} value={"academeFlowTestStudentAccount@123"} required disabled />
                                    </div> 
                                </div>
                            </div>

                             {/* Parent or Guardian Information */}
                             <div className="flex flex-row pt-6">
                                <div className="w-[30%] border-r">
                                    <h2 className="text-xl font-semibold">Parent or Guardian Information</h2>
                                </div>
                                <div className="w-[70%] pl-6">
                                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="parent_fName" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                                            <input type="text" id="parent_fName" name="parent_fName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
                                        </div>
                                        <div>
                                            <label htmlFor="parent_mName" className="block mb-2 text-sm font-medium text-gray-900">Middle name</label>
                                            <input type="text" id="parent_mName" name="parent_mName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                        <div>
                                            <label htmlFor="parent_lName" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                                            <input type="text" id="parent_lName" name="parent_lName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required />
                                        </div>
                                    
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="parent_email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                                            <input type="parent_email" id="parent_email" name="parent_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@email.com" />
                                        </div> 
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
                                            <input type="number" id="phone" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0987-7654-321" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                                        </div> 
                                        <div>
                                            <label htmlFor="relationship" className="block mb-2 text-sm font-medium text-gray-900">Relationship</label>
                                            <input type="text" id="relationship" name="relationship" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Father, Mother, Guardian..." required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row pt-6">
                                <div className="w-[30%] border-r">
                                    <h2 className="text-xl font-semibold">Student Education Information</h2>
                                </div>
                                <div className="w-[70%] pl-6">
                                    {/* Student Category */}
                                    <div className={`flex flex-col space-y-4 mb-6 w-[40%] ${step == 0 ? 'opacity-100' : 'opacity-60 pointer-events-none'}`}>
                                        <label htmlFor="category" className="text-center font-medium text-xl">
                                            Student category level
                                        </label>
                                        <select 
                                            id="category" 
                                            name="category"
                                            className={`relative block w-full appearance-none rounded-md border pl-2 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                        >
                                            {categories?.map((category) => (
                                                <option value={category?._id} key={category?._id}>{category?.category}</option>    
                                            ))}
                                        </select>
                                        {step == 0 && (
                                            <div className="flex justify-center">
                                                <button 
                                                    type="button" 
                                                    onClick={() => setStep(1)}
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                                >
                                                    Select
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Student Level */}
                                    <div className={`flex flex-col space-y-4 mb-6 w-[40%] ${step == 1 ? 'opacity-100' : 'opacity-60 pointer-events-none'}`}>
                                        <label htmlFor="levelID" className="text-center font-medium text-xl">
                                            Student level
                                        </label>
                                        <select 
                                            id="levelID" 
                                            name="levelID"
                                            className={`relative block w-full appearance-none rounded-md border pl-2 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                        >
                                            {levels?.map((level) => (
                                                <option value={level?._id} key={level?._id}>{level?.level}</option>    
                                            ))}
                                        </select>
                                        {step == 1 && (
                                            <div className="flex justify-center space-x-3">
                                                <button 
                                                    type="button" 
                                                    onClick={() => setStep(0)}
                                                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                                >
                                                    Back
                                                </button>
                                                <button 
                                                    type="button" 
                                                    onClick={() => setStep(2)}
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                                >
                                                    Select
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Student Section */}
                                    <div className={`flex flex-col space-y-4 mb-6 w-[40%] ${step == 2 ? 'opacity-100' : 'opacity-60 pointer-events-none'}`}>
                                        <label htmlFor="sectionID" className="text-center font-medium text-xl">
                                            Student section
                                        </label>
                                        {sections?.length != 0 ? (
                                            <select 
                                                required
                                                id="sectionID" 
                                                name="sectionID"
                                                className={`relative block w-full appearance-none rounded-md border pl-2 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                >
                                                {sections?.map((section) => (
                                                    <option value={section?._id} key={section?._id}>{section?.section}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div>
                                                <p className="text-gray-800 font-medium text-sm">No section yet for this level, please create atleast one section first to continue.</p>
                                            </div>
                                        )}
                                       
                                        {step == 2 && (
                                           <div className="flex justify-center space-x-3">
                                                <button 
                                                    type="button" 
                                                    onClick={() => setStep(1)}
                                                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                                >
                                                    Back
                                                </button>
                                                {sections?.length != 0 && (
                                                    <button 
                                                        type="submit" 
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                                    >
                                                        Create new Student
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateStudentAccount