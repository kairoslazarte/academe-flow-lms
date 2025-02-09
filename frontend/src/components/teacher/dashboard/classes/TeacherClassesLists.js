import Loader from "../../../../components/reusable/Loader"
import axios from "axios"
import { useEffect, useState } from "react"
import TeacherSubjectDetails from "./TeacherSubjectDetails"

const TeacherClassesLists = ({ teacherDetails }) => {
    const [subjects, setSubjects] = useState(null)   
    const [levels, setLevels] = useState(null)
    const [sections, setSections] = useState(null)
    const [openSubjectDetails, setOpenSubjectDetails] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState(null)

    const getTeacherSubjects = async() => {
        var subjectIDS = []

        teacherDetails?.classes?.map((teacherClass) => {
            subjectIDS.push(teacherClass?.subjectID)
        })

        try {
            const { data } = await axios.post("/api/teachers/get-teacher-subjects", {
                subjectIDs: subjectIDS
            })
            setSubjects(data.subjects)
            setLevels(data.levels)
            setSections(data.sections)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTeacherSubjects()
    }, [setSubjects])

    return (
        teacherDetails ? (
            teacherDetails?.classes?.length != 0 ? (
                !openSubjectDetails ? (
                    <div className="grid grid-cols-3 gap-4">
                        {subjects?.map((subject) => (
                            sections?.map((section) => (
                                section?.subjects?.map((sectionSubject) => (
                                    sectionSubject?.subjectID == subject?._id && (
                                        <div 
                                            key={subject?._id}
                                            className="flex flex-col bg-[#1D5B79] border border-[#1D5B79] rounded-md px-5 py-7 shadow-md cursor-pointer transition duration-200 hover:scale-105 hover:bg-white group"
                                            onClick={() =>
                                                setOpenSubjectDetails(
                                                    (open) => !open,
                                                    setSelectedSubject(subject),
                                                )
                                            }
                                        >
                                            {levels?.map((level) => (
                                                level?.sections?.map((levelSection) => (
                                                    levelSection?.sectionID == section?._id && (
                                                        <h2 key={levelSection?.sectionID} className="font-bold text-xl text-white group-hover:text-[#1D5B79]">{level?.level} - {levelSection?.section} </h2>
                                                    )
                                                ))
                                            ))}
                                            <h3 className="font-medium text-lg text-white pt-8 group-hover:text-[#1D5B79]">Subject: {subject?.subject}</h3>
                                            <h3 className="text-md text-white group-hover:text-[#1D5B79]">Students: {section?.students?.length}</h3>
                                        </div>
                                    )
                                ))
                            ))
                        ))}
                    </div>
                ) : (
                    <TeacherSubjectDetails openSubjectDetails={openSubjectDetails} setOpenSubjectDetails={setOpenSubjectDetails} subjectDetails={selectedSubject}/>
                )
            ) : (
                <h1>No classes yet..</h1>
            )
        ) : (
            <Loader />
        )
    )
}

export default TeacherClassesLists