import { useState } from "react"

const TeacherHeader = ({ teacherDetails }) => {
    const [openUserDropdown, setOpenUserDropdown] = useState(false)

    return (
        <div className="w-full sticky top-0 bg-white border-b border-gray-200 z-20">
            <div className="pr-10 flex items-center py-2">
                <div className="ml-auto flex items-center space-x-4">
                    <h3 className="text-[#58c150] font-medium justify-end flex">
                        Hi, {teacherDetails?.first_name} {teacherDetails?.last_name}!
                    </h3>
                    <div className="relative">
                        <img 
                            className='h-10 w-10 rounded-full object-cover cursor-pointer'
                            src={teacherDetails?.image ? teacherDetails?.image : '/static/images/default_user.png'}
                            onClick={() => setOpenUserDropdown((open) => !open)}
                        />
                        {openUserDropdown && (
                             <div className="absolute bg-white w-[200px] right-0 shadow-xl rounded-b-lg">
                                <button
                                    className="group flex items-center justify-center px-2 py-2 text-sm font-medium rounded-md text-[#58c150] hover:bg-[#58c150] hover:text-white w-full"
                                    onClick={() => window.location.reload()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  className="text-[#58c150] group-hover:text-white mr-3 flex-shrink-0 h-8 w-8 font-medium">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherHeader