import { useEffect, useState } from "react"
import axios from "axios"

const ViewUpdateTeacherProfile = ({ teacherDetails }) => {
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

    const updateTeacherAcc = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/admins/update-teacher', {
                id: teacherDetails?._id,
                first_name: teacherDetails?.first_name,
                middle_name: teacherDetails?.middle_name,
                last_name: teacherDetails?.last_name,
                phone: e.target.phone.value,
                email: teacherDetails?.email,
                image: !image ? teacherDetails?.image : image,
                birthdate: teacherDetails?.birthdate,
                address: teacherDetails?.address,
                zoom_link: teacherDetails?.zoom_link,
                zoom_id: teacherDetails?.zoom_id,
                zoom_password: teacherDetails?.zoom_password
            })
            alert(`Teacher's account updated successfully!`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-white rounded-lg px-8 py-10 shadow-lg">
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
                                        Set/Update profile photo
                                        <img 
                                            className='h-24 w-24 rounded-full object-cover mt-3'
                                            src={!image ? teacherDetails?.image : image}
                                        />
                                        <input type="file" onChange={uploadFileHandler} className="opacity-0 w-0 h-0" />
                                    </label>

                                    {image && (
                                        <div className="pl-6 pt-8 flex justify-center">
                                            <button type="submit" className="bg-blue-500 border border-blue-500 text-white px-6 py-3 text-lg font-semibold rounded-lg transition duration-200 hover:bg-white hover:text-blue-500">
                                                Update Profile Photo
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div> 
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">First name</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {teacherDetails?.first_name}    
                                </div>
                            </div>
                            {teacherDetails?.middle_name && (
                                <div>
                                    <h3 className="block mb-2 text-sm font-medium text-gray-900">Middle name</h3>
                                    <div 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    >
                                        {teacherDetails?.middle_name}    
                                    </div>
                                </div>
                            )}
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Last name</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {teacherDetails?.last_name}    
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number <span className='text-red-500 font-bold'>*</span></label>
                                <input type="number" id="phone" name="phone" defaultValue={teacherDetails?.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0987-7654-321" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                            </div>
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Birth date</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {new Date(teacherDetails?.birthdate).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})} 
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="block mb-2 text-sm font-medium text-gray-900">Email</h3>
                            <div 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                {teacherDetails?.email}    
                            </div>
                        </div>
                        <div>
                            <h3 className="block mb-2 text-sm font-medium text-gray-900">Home address</h3>
                            <div 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                {teacherDetails?.address}    
                            </div>
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
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Zoom Link</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {teacherDetails?.zoom_link ? teacherDetails?.zoom_link : 'N/A'}     
                                </div>
                            </div>
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Zoom ID</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                {teacherDetails?.zoom_id ? teacherDetails?.zoom_id : 'N/A'}
                                </div>
                            </div>
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Zoom password</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                {teacherDetails?.zoom_password ? teacherDetails?.zoom_password : 'N/A'}
                                </div>
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
    )
}

export default ViewUpdateTeacherProfile