import Loader from "../../../reusable/Loader"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentSubjectDetails from "./StudentSubjectDetails"

const StudentClassesLists= ({ studentDetails }) => {
    const [subjects, setSubjects] = useState(null)
    const [teachers, setTeachers] = useState(null)
    const [selectedSubject, setSelectedSubject] = useState(null)
    const [subjectTeacher, setSubjectTeacher] = useState(null)
    const [openSubjectDetails, setOpenSubjectDetails] = useState(false)
    const [section, setSection] = useState(null)
    const [adviser, setAdviser] = useState(null)

    const getTeachers = async(ids) => {
        try {
            const { data } = await axios.post('/api/students/get-teachers', { ids: ids})
            setTeachers(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getSubjects = async() => {
        var teacherIDS = []
        try {
            const { data } = await axios.post('/api/students/get-subjects', { sectionID: studentDetails?.sectionID })
            data.map((subject) => teacherIDS.push(subject?.teacher))
            getTeachers(teacherIDS)    
            setSubjects(data)
            setSelectedSubject(data[0])
        } catch (error) {
            console.log(error)
        }
    }

    const getSection = async() => {
        try {
            const { data } = await axios.post('/api/students/get-section', { id: studentDetails?.sectionID })
            setSection(data.section)
            setAdviser(data.adviser)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSubjects()
        getSection()
    }, [setSubjects, setTeachers, setSection])
    
    return (
        <div>
            {subjects ? (
                !openSubjectDetails ? (
                    <div className="flex flex-col">
                        <h1 className="font-bold text-gray-900 text-2xl sm:text-4xl uppercase">{studentDetails?.level} - {studentDetails?.section}</h1>
                        <h3 className="font-medium text-gray-900 text-lg sm:text-2xl pt-3">Adviser: <span className="font-bold">{adviser?.first_name} {adviser?.last_name}</span></h3>
                        
                        <div className="pt-5 sm:pt-10 flex flex-col space-y-6">
                            <h2 className="sm:text-xl font-medium tracking-wide">Weekly lesson guides: </h2>
                            {section?.files ? (
                                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center 2xl:justify-start">
                                    {section?.files?.map((file) => (
                                        <a
                                            key={file?._id}
                                            className="sm:ml-4 mt-4 sm:w-[300px] border-2 border-[#e42222] hover:bg-[#e42222] px-4 py-8 shadow-lg rounded-md text-center group hover:scale-105 transition duration-200 group"
                                            href={file?.name} 
                                            download
                                        >   <div className="flex flex-col justify-center h-full">
                                                <span className="text-[#e42222] group-hover:text-white font-medium break-words">
                                                    {file?.name?.replace("/uploads/sectionUploads/", "")}
                                                </span>
                                                <span className="text-blue-500 text-sm italic group-hover:underline pt-2">Click to download</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-sm sm:text-base">No files uploaded yet for this section..</span>
                            )}
                        </div>

                        <div className="pt-10 flex flex-col space-y-6">
                            <h2 className="sm:text-xl font-medium tracking-wide">Subjects: </h2>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center 2xl:justify-start">
                                {subjects?.map((subject) => (
                                    <div
                                        key={subject?._id} 
                                        className="sm:ml-4 mt-4 sm:w-[300px] bg-white shadow-lg p-6 rounded-md flex flex-col space-y-6 hover:scale-105 transition duration-200 cursor-pointer border-2 border-[#7EAA92] hover:bg-[#7EAA92] group"
                                        onClick={() =>
                                            setOpenSubjectDetails(
                                                (open) => !open,
                                                setSelectedSubject(subject),
                                                setSubjectTeacher(teachers?.find(({ _id }) => _id === subject?.teacher))
                                            )
                                        }
                                    >
                                        <div className="flex flex-col space-y-2">
                                            <h3 className="font-bold text-lg group-hover:text-white">{subject?.subject}</h3>
                                            <h4 className="font-medium group-hover:text-white">
                                                Teacher: {teachers?.find(({ _id }) => _id === subject?.teacher)?.first_name} {teachers?.find(({ _id }) => _id === subject?.teacher)?.last_name}
                                            </h4>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <h3 className="font-bold text-lg group-hover:text-white">Schedule/s:</h3>
                                            {subject?.schedules?.map((schedule) => (
                                                <div
                                                    key={schedule?._id} 
                                                    className="flex flex-col space-y-2"
                                                >
                                                    <h4 className="font-medium group-hover:text-white">{schedule?.day}: {schedule?.startTime} - {schedule?.endTime}</h4>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <StudentSubjectDetails 
                        subjectDetails={selectedSubject} 
                        setOpenSubjectDetails={setOpenSubjectDetails} 
                        teacher={subjectTeacher} 
                    />
                )
            ) : (
                <Loader />
            )}
           
        </div>
    )
}

export default StudentClassesLists