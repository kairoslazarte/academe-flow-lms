import { useState } from "react"
import TeacherAdvisoryClassDetails from "./TeacherAdvisoryClassDetails"

const TeacherAdvisoryClassesLists = ({ teacherDetails }) => {
    const [teacher, setTeacher] = useState(teacherDetails)
    const [selectedSection, setSelectedSection] = useState(null)
    const [openSectionDetails, setOpenSectionDetails] = useState(false)
    return (
        !openSectionDetails ? (
            <div className="flex flex-col space-y-8">
                <h1 className="font-bold text-4xl">Advisory Classes: </h1>
                <div className="grid grid-cols-3 gap-6 pt-5">
                    {teacher?.advisoryClass?.map((advClass) => (
                        <div
                            key={advClass?._id}
                            className="bg-white shadow-lg p-6 rounded-md flex flex-col space-y-6 hover:scale-105 transition duration-200 cursor-pointer border-2 border-[#7EAA92] hover:bg-[#7EAA92] group"
                            onClick={() => setOpenSectionDetails((open) => !open, setSelectedSection(advClass?.sectionID))}
                        >
                            <h2 className="font-bold text-[#7EAA92] tracking-wide text-xl group-hover:text-white">{advClass?.section}</h2>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <TeacherAdvisoryClassDetails sectionID={selectedSection} setOpenSectionDetails={setOpenSectionDetails} />
        )
    )
}

export default TeacherAdvisoryClassesLists