import { useEffect, useState } from "react"
import axios from "axios"

const EditTeacherAccount = ({ teacherDetails }) => {
    const [uploading, setUploading] = useState(false)
    const [inputBirthDate, setInputBirthDate] = useState(false)
    const [image, setImage] = useState('')
    const [defaultBirthDate, setDefaultBirthDate] = useState(null)

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

    var birthYear = new Date(teacherDetails?.birthdate).getFullYear();
    var birthMonth = new Date(teacherDetails?.birthdate).getMonth()+1;
    var birthDate = new Date(teacherDetails?.birthdate).getDate();

    if (birthDate.toString().length < 2) {
        birthDate = '0'+birthDate;
    }
    if (birthMonth.toString().length < 2) {
        birthMonth = '0'+birthMonth;
    }

    useEffect(() => {
        setDefaultBirthDate(`${birthYear}-${birthMonth}-${birthDate}`)
    }, [setDefaultBirthDate])

    const updateTeacherAcc = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/admins/update-teacher', {
                id: teacherDetails?._id,
                first_name: e.target.first_name.value,
                middle_name: e.target.middle_name.value,
                last_name: e.target.last_name.value,
                phone: e.target.phone.value,
                email: e.target.email.value,
                image: !image ? teacherDetails?.image : image,
                birthdate: e.target.birthdate.value,
                address: e.target.address.value,
                zoom_link: e.target.zoom_link.value,
                zoom_id: e.target.zoom_id.value,
                zoom_password: e.target.zoom_password.value
            })
            alert(`Teacher's account updated successfully!`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
            <div className="flex flex-col space-y-8">
                <h1 className="font-bold text-4xl">Update/Edit teacher account</h1>

                <div className="border-2 border-gray-300 rounded-md p-8 h-full">
                    <form onSubmit={updateTeacherAcc} className='flex flex-col space-y-6 divide-y'>
                        <div className="flex flex-row">
                            <div className="w-[30%] border-r">
                                <h2 className="text-xl font-semibold">Teacher Information</h2>
                            </div>
                            <div className="w-[70%] pl-6">
                                <div className="flex mb-6">
                                    <div className="max-w-2xl rounded-lg bg-gray-50">
                                        <div className="m-4">
                                            <label className="mb-2 font-semibold flex flex-col items-center cursor-pointer hover:scale-110 transition transform duration-200">
                                                Set profile photo
                                                <img 
                                                    className='h-24 w-24 rounded-full object-cover mt-3'
                                                    src={!image ? teacherDetails?.image : image}
                                                />
                                                <input type="file" onChange={uploadFileHandler} className="opacity-0 w-0 h-0" />
                                            </label>
                                        </div>
                                    </div>
                                </div> 
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name <span className='text-red-500 font-bold'>*</span></label>
                                        <input type="text" id="first_name" name="first_name" defaultValue={teacherDetails?.first_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                    </div>
                                    <div>
                                        <label htmlFor="middle_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                                        <input type="text" id="middle_name" name="middle_name" defaultValue={teacherDetails?.middle_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name <span className='text-red-500 font-bold'>*</span></label>
                                        <input type="text" id="last_name" name="last_name" defaultValue={teacherDetails?.last_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number <span className='text-red-500 font-bold'>*</span></label>
                                        <input type="number" id="phone" name="phone" defaultValue={teacherDetails?.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0987-7654-321" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                                    </div>
                                    <div>
                                        <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Date <span className='text-red-500 font-bold'>*</span></label>
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
                                    <input type="email" id="email" name="email" defaultValue={teacherDetails?.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@email.com" required />
                                </div> 
                                <div className="mb-6">
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Home address <span className='text-red-500 font-bold'>*</span></label>
                                    <input type="text" id="address" name="address" defaultValue={teacherDetails?.address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Home address" required />
                                </div> 
                            </div>
                        </div>
                        
                        <div className="flex flex-row pt-6">
                            <div className="w-[30%] border-r">
                                <h2 className="text-xl font-semibold">Teacher Zoom Details</h2>
                            </div>
                            <div className="w-[70%] pl-6">
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="zoom_link" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zoom link</label>
                                        <input type="text" id="zoom_link" name="zoom_link" defaultValue={teacherDetails?.zoom_link} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter zoom link.." />
                                    </div>
                                    <div>
                                        <label htmlFor="zoom_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zoom ID</label>
                                        <input type="text" id="zoom_id" name="zoom_id" defaultValue={teacherDetails?.zoom_id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter zoom ID.."/>
                                    </div>
                                    <div>
                                        <label htmlFor="zoom_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zoom password</label>
                                        <input type="text" id="zoom_password" name="zoom_password" defaultValue={teacherDetails?.zoom_password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter zoom password.." />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex justify-center">
                            <button 
                                type="submit" 
                                className="bg-blue-500 border border-blue-500 text-white px-6 py-3 text-lg font-semibold rounded-lg transition duration-200 hover:bg-white hover:text-blue-500"
                            >
                                Update Teacher Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTeacherAccount