import axios from "axios"
import React, { useEffect, useState } from "react"

const EditStudentAccount = ({studentDetails}) => {
    const [categories, setCategories] = useState()
    const [levels, setLevels] = useState()
    const [sections, setSections] = useState()
    const [step, setStep] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [inputBirthDate, setInputBirthDate] = useState(false)
    const [image, setImage] = useState('')
    const [defaultBirthDate, setDefaultBirthDate] = useState(null)

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

    const getAllLevels = async (id, changedCategory) => {
        try {
            const { data } = await axios.post('/api/admins/get-levels', {
                category: id
            })
            setLevels(data)
            if (changedCategory) {
                getAllSections(data.find(({ category }) => category === id))
            }
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

    var birthYear = new Date(studentDetails?.birthdate).getFullYear();
    var birthMonth = new Date(studentDetails?.birthdate).getMonth()+1;
    var birthDate = new Date(studentDetails?.birthdate).getDate();

    if (birthDate.toString().length < 2) {
        birthDate = '0'+birthDate;
    }
    if (birthMonth.toString().length < 2) {
        birthMonth = '0'+birthMonth;
    }

    useEffect(() => {
        setDefaultBirthDate(`${birthYear}-${birthMonth}-${birthDate}`)
        getAllCategories()
        getAllLevels(studentDetails?.categoryID)
        getAllSections(studentDetails?.levelID)
    }, [setCategories, step, setDefaultBirthDate])

    const updateStudentAcc = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/admins/update-student', {
                id: studentDetails?._id,
                first_name: e.target.first_name.value,
                middle_name: e.target.middle_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                address: e.target.address.value,
                image: !image ? studentDetails?.image : image,
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
            alert(`Student's account updated successfully!`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
            <div className="flex flex-col space-y-8">
                <h1 className="font-bold text-4xl">Update/Edit student account</h1>

                <div className="border-2 border-gray-300 rounded-md p-8 h-full">
                    {categories && (
                        <form onSubmit={updateStudentAcc} className="flex flex-col space-y-6 divide-y">

                            {/* Student's Information */}
                            <div className="flex flex-row">
                                <div className="w-[30%] border-r">
                                    <h2 className="text-xl font-semibold">Student Information</h2>
                                </div>
                                <div className="w-[70%] pl-6">
                                    <div className="flex mb-6">
                                        <div className="max-w-2xl rounded-lg bg-gray-50">
                                            <div className="m-4">
                                                <label className="mb-2 font-semibold flex flex-col items-center cursor-pointer hover:scale-110 transition transform duration-200">
                                                    Set profile photo
                                                    <img 
                                                        className='h-24 w-24 rounded-full object-cover mt-3'
                                                        src={!image ? studentDetails?.image : image}
                                                    />
                                                    <input type="file" onChange={uploadFileHandler} className="opacity-0 w-0 h-0" />
                                                </label>
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                            <input type="text" id="first_name" name="first_name" defaultValue={studentDetails?.first_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                        </div>
                                        <div>
                                            <label htmlFor="middle_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                                            <input type="text" id="middle_name" name="middle_name" defaultValue={studentDetails?.middle_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                            <input type="text" id="last_name" name="last_name" defaultValue={studentDetails?.last_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                                        </div>
                                        <div>
                                            <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Date</label>
                                            {!inputBirthDate ? (
                                                <input 
                                                    type="date" 
                                                    id="birthdate" 
                                                    name="birthdate" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Enter birthdate" 
                                                    required 
                                                    onChange={() => setInputBirthDate(true)} 
                                                    value={defaultBirthDate} 
                                                />
                                            ) : (
                                                <input 
                                                    type="date" 
                                                    id="birthdate" 
                                                    name="birthdate" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Enter birthdate" 
                                                    required 
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                        <input type="email" id="email" name="email" defaultValue={studentDetails?.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@email.com" required />
                                    </div> 
                                    <div className="mb-6">
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Home address</label>
                                        <input type="text" id="address" name="address" defaultValue={studentDetails?.address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Home address" required />
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
                                            <label htmlFor="parent_fName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                            <input type="text" id="parent_fName" defaultValue={studentDetails?.parent_guardian?.first_name} name="parent_fName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                        </div>
                                        <div>
                                            <label htmlFor="parent_mName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                                            <input type="text" id="parent_mName" defaultValue={studentDetails?.parent_guardian?.middle_name} name="parent_mName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="parent_lName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                            <input type="text" id="parent_lName" defaultValue={studentDetails?.parent_guardian?.last_name} name="parent_lName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                                        </div>
                                    
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="parent_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                            <input type="parent_email" id="parent_email"  defaultValue={studentDetails?.parent_guardian?.email} name="parent_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@email.com" required />
                                        </div> 
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                            <input type="number" id="phone" defaultValue={studentDetails?.parent_guardian?.phone_number} name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0987-7654-321" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                                        </div> 
                                        <div>
                                            <label htmlFor="relationship" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Relationship</label>
                                            <input type="text" id="relationship" name="relationship" defaultValue={studentDetails?.parent_guardian?.relationship} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Father, Mother, Guardian..." required />
                                        </div>
                                    </div>
                                </div>
                            </div>


                             {/* Student's Education Information */}
                            <div className="flex flex-row pt-6">
                                <div className="w-[30%] border-r">
                                    <h2 className="text-xl font-semibold">Student Education Information</h2>
                                </div>
                                <div className="w-[70%] pl-6">
                                    {!categories && !levels && !sections && (
                                        <h2 className="text-xl font-semibold">Create a Class first!</h2>
                                    )}
                                    {/* Student Category */}
                                    {categories && (
                                        <div className={`flex flex-col space-y-4 mb-6 w-[40%]`}>
                                            <label htmlFor="category" className="text-center font-medium text-xl">
                                                Student category level
                                            </label>
                                            <select 
                                                id="category" 
                                                defaultValue={studentDetails?.categoryID}
                                                onChange={(e) => getAllLevels(e.target.value, true)}
                                                name="category"
                                                className={`relative block w-full appearance-none rounded-md border pl-2 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                            >
                                                {categories?.map((category) => (
                                                    <option value={category?._id} key={category?._id}>{category?.category}</option>    
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {/* Student Level */}
                                    {levels && (
                                        <div className={`flex flex-col space-y-4 mb-6 w-[40%]`}>
                                            <label htmlFor="levelID" className="text-center font-medium text-xl">
                                                Student level
                                            </label>
                                            <select 
                                                id="levelID" 
                                                name="levelID"
                                                onChange={(e) => getAllSections(e.target.value)}
                                                defaultValue={studentDetails?.levelID}
                                                className={`relative block w-full appearance-none rounded-md border pl-2 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                            >
                                                {levels?.map((level) => (
                                                    <option value={level?._id} key={level?._id}>{level?.level}</option>    
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    

                                    {/* Student Section */}
                                    {sections && (
                                        <div className={`flex flex-col space-y-4 mb-6 w-[40%]`}>
                                            <label htmlFor="sectionID" className="text-center font-medium text-xl">
                                                Student section
                                            </label>
                                            <select 
                                                required
                                                id="sectionID" 
                                                name="sectionID"
                                                defaultValue={studentDetails?.sectionID}
                                                className={`relative block w-full appearance-none rounded-md border pl-2 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                            >
                                                {sections?.map((section) => (
                                                    <option value={section?._id} key={section?._id}>{section?.section}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="pt-8 flex justify-center">
                                <button type="submit" className="bg-blue-500 border border-blue-500 text-white px-6 py-3 text-lg font-semibold rounded-lg transition duration-200 hover:bg-white hover:text-blue-500">
                                    Update Student Account
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditStudentAccount