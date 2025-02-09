const StudentSubjectDetails = ({ subjectDetails, setOpenSubjectDetails, teacher }) => {
    return (
        <div>
            <button
                className="bg-red-700 px-4 py-2 text-white rounded-md hover:opacity-70 transition duration-200 mr-auto"
                onClick={() => setOpenSubjectDetails(false)}
            >
                Go back
            </button>

            <div className="flex flex-col space-y-2 pt-4">
                <h2 className="text-3xl font-bold">{subjectDetails?.subject}</h2>
                <h3 className="font-medium text-lg">
                    Teacher: {teacher?.first_name} {teacher?.last_name}
                </h3>
                {teacher?.zoom_link && (
                    <h3 className="font-medium text-md">
                        Zoom link: <a href={teacher?.zoom_link} className="text-blue-500 italic text-md hover:underline" target="_blank" rel="noreferrer">{teacher?.zoom_link}</a>
                    </h3>
                )}
            </div>

            <div className="pt-7">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white shadow-md rounded-md">
                    <thead className="text-md text-white uppercase bg-[#1D5B79] rounded-t-md">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3"
                            >
                                Day
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3"
                            >
                                Start Time
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3"
                            >
                                End Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectDetails?.schedules?.map((schedule) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={schedule?._id}
                            >
                                <td 
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {schedule?.day}
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {schedule?.startTime}
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {schedule?.endTime}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pt-10">
                <h2 className="text-gray-800 font-medium text-2xl">Files</h2>

                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center 2xl:justify-start pt-5">
                    {subjectDetails?.files?.map((subjectFile) => (
                        <a
                            key={subjectFile?._id}
                            className="sm:ml-4 mt-4 sm:w-[300px] border-2 border-[#e42222] hover:bg-[#e42222] px-4 py-8 shadow-lg rounded-md text-center group hover:scale-105 transition duration-200 group"
                            href={subjectFile?.file} 
                            download
                        >   <div className="flex flex-col justify-center h-full">
                                <span className="text-[#e42222] group-hover:text-white font-medium break-words">
                                    {subjectFile?.file?.replace("/uploads/subjectUploads/", "")}
                                </span>
                                <span className="text-blue-500 text-sm italic group-hover:underline pt-2">Click to download</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default StudentSubjectDetails