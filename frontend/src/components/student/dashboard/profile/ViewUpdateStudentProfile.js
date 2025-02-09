import axios from "axios"
import { useState } from "react"

const ViewUpdateStudentProfile = ({ studentDetails }) => {
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

    const updateStudentAcc = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/admins/update-student', {
                id: studentDetails?._id,
                first_name: studentDetails?.first_name,
                middle_name: studentDetails?.middle_name,
                last_name: studentDetails?.last_name,
                email: studentDetails?.email,
                address: studentDetails?.address,
                image: !image ? studentDetails?.image : image,
                parent_fName: studentDetails?.parent_guardian?.first_name,
                parent_mName: studentDetails?.parent_guardian?.middle_name,
                parent_lName: studentDetails?.parent_guardian?.last_name,
                parent_email: studentDetails?.parent_guardian?.email,
                phone: studentDetails?.parent_guardian?.phone_number,
                relationship: studentDetails?.parent_guardian?.relationship,
                categoryID: studentDetails?.categoryID,
                levelID: studentDetails?.levelID,
                sectionID: studentDetails?.sectionID,
                birthdate: studentDetails?.birthdate,
            })
            if (window.confirm(`Profile photo updated successfully! Do you want to login again to reflect the change?`)) {
                window.location.reload()
            } 

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-white rounded-lg px-4 py-6 xl:px-8 xl:py-10 shadow-lg">
            <form onSubmit={updateStudentAcc} className="flex flex-col space-y-6 sm:divide-y">
                {/* Student's Information */}
                <div className="flex flex-col sm:flex-row w-full">
                    <div className="sm:w-[30%] sm:border-r">
                        <h2 className="text-xl font-semibold">Student Information</h2>
                    </div>
                    <div className="sm:w-[70%] sm:pl-6 sm:pt-0 pt-4">
                        <div className="flex mb-6">
                            <div className="max-w-2xl rounded-lg bg-gray-50">
                                <div className="m-4 flex flex-row items-center">
                                    <label className="mb-2 font-semibold flex flex-col items-center cursor-pointer hover:scale-110 transition transform duration-200 sm:text-base text-sm">
                                        Set/Update profile photo
                                        {studentDetails?.image ? (
                                            <img 
                                                className='h-24 w-24 rounded-full object-cover mt-3'
                                                src={studentDetails?.image}
                                            />
                                        ) : (
                                            <img 
                                                className='h-24 w-24 rounded-full object-cover mt-3'
                                                src={!image ? '/static/images/default_user.png' : image}
                                            />
                                        )}
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
                                    {studentDetails?.first_name}    
                                </div>
                            </div>
                            {studentDetails?.middle_name && (
                                <div>
                                    <h3 className="block mb-2 text-sm font-medium text-gray-900">Middle name</h3>
                                    <div 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    >
                                        {studentDetails?.middle_name ? studentDetails?.middle_name : "N/A"}    
                                    </div>
                                </div>  
                            )}
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Last name</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {studentDetails?.last_name}    
                                </div>
                            </div>
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Birth date</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {new Date(studentDetails?.birthdate).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})} 
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="block mb-2 text-sm font-medium text-gray-900">Email</h3>
                            <div 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                {studentDetails?.email}    
                            </div>
                        </div> 
                        <div className="mb-6">
                            <h3 className="block mb-2 text-sm font-medium text-gray-900">Home address</h3>
                            <div 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                {studentDetails?.address}    
                            </div>
                        </div> 
                    </div>
                </div>

                {/* Parent or Guardian Information */}
                <div className="flex flex-col sm:flex-row w-full">
                    <div className="sm:w-[30%] sm:border-r">
                        <h2 className="text-xl font-semibold">Parent or Guardian Information</h2>
                    </div>
                    <div className="sm:w-[70%] sm:pl-6 sm:pt-0 pt-4">
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">First name</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {studentDetails?.parent_guardian?.first_name}    
                                </div>
                            </div>
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Middle name</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {studentDetails?.parent_guardian?.middle_name ? studentDetails?.parent_guardian?.middle_name : "N/A"}    
                                </div>
                            </div>
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Last name</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {studentDetails?.parent_guardian?.last_name}    
                                </div>
                            </div>
                        
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Email</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {studentDetails?.parent_guardian?.email}    
                                </div>
                            </div> 
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Phone number</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {studentDetails?.parent_guardian?.phone_number}    
                                </div>
                            </div> 
                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900">Relationship</h3>
                                <div 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {studentDetails?.parent_guardian?.relationship}    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student's Education Information */}
                <div className="flex flex-col sm:flex-row w-full sm:pt-0 pt-5">
                    <div className="sm:w-[30%] sm:border-r">
                        <h2 className="text-xl font-semibold">Student Education <br/>Information</h2>
                    </div>
                    <div className="sm:w-[70%] sm:pl-6 sm:pt-0 pt-4">
                        {/* Student Category */}
                        <div className={`flex flex-col space-y-4 mb-6 sm:w-[40%]`}>
                            <h3 className="block sm:mb-2 text-sm font-medium text-gray-900">Student Category level</h3>
                            <div 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                {studentDetails?.category ? studentDetails?.category : "N/A"}    
                            </div>
                        </div>

                        {/* Student Level */}
                        <div className={`flex flex-col space-y-4 mb-6 sm:w-[40%]`}>
                            <h3 className="block sm:mb-2 text-sm font-medium text-gray-900">Student Level</h3>
                            <div 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                {studentDetails?.level ? studentDetails?.level : "N/A"}    
                            </div>
                        </div>
                        

                        {/* Student Section */}
                        <div className={`flex flex-col space-y-4 mb-6 sm:w-[40%]`}>
                            <h3 className="block sm:mb-2 text-sm font-medium text-gray-900">Student Section</h3>
                            <div 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                {studentDetails?.section ? studentDetails?.section : "N/A"}    
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ViewUpdateStudentProfile