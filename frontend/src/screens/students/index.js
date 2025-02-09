import ViewNewsAndUpdates from "../../components/reusable/ViewNewsAndUpdates"
import StudentClassesLists from "../../components/student/dashboard/classes/StudentClassesLists"
import ViewStudentNewslettersMemos from "../../components/student/dashboard/newslettersMemos/ViewStudentNewslettersMemos"
import StudentHeader from "../../components/student/dashboard/partials/StudentHeader"
import StudentSidebar from "../../components/student/dashboard/partials/StudentSidebar"
import ViewUpdateStudentProfile from "../../components/student/dashboard/profile/ViewUpdateStudentProfile"
import StudentLogin from "../../components/student/forms/StudentLogin"
import { StudentLoginContext } from "../../contexts/student/StudentLoginContexts"
import { StudentSidebarContexts } from "../../contexts/student/StudentSidebarContexts"
import { useEffect, useMemo, useState } from "react"
import ArrowBackButton from "../../components/reusable/ArrowBackButton"
import MessagesContainer from "../../components/common/messages/MessagesContainer"
import StudentMessagesSidebar from "../../components/student/dashboard/partials/StudentMessagesSidebar"
import useListenMessages from "../../hooks/messages/useListenMessages"
import useStudentGetAllTeachers from "../../hooks/student/useStudentGetAllTeachers"
import { useUsersContext } from "../../contexts/users/UsersContext"

const Student = () => {
    const { teachers } = useStudentGetAllTeachers();
    const { setUsers } = useUsersContext();

    useListenMessages({users: teachers});

    const [student, setStudent] = useState(null)
    const userValue = useMemo(() => ({student, setStudent}), [student, setStudent])
    
    const [activeComponent, setActiveComponent] = useState("Home")
    const sidebarValue = useMemo(() => ({activeComponent, setActiveComponent}), [activeComponent, setActiveComponent])

    useEffect(() => {
        if (teachers) setUsers(teachers);
    }, [teachers]);

    return (
        <>
            <StudentLoginContext.Provider value={userValue}>
            {
                !student 
                    ? 
                        <main className="h-full">
                            <StudentLogin /> 
                        </main>
                    : 
                    <StudentSidebarContexts.Provider value={sidebarValue}>
                        <main className="h-[100vh] bg-gray-50">
                            <div className="flex items-center h-full">
                                <div className="flex flex-col h-full">
                                    <StudentSidebar studentDetails={student} />
                                </div>

                                <div className="lg:pl-[18rem] xl:pl-[20rem] h-full w-full">
                                    <StudentHeader studentDetails={student} />

                                    <div className="flex flex-row w-full bg-gray-50">
                                        <div className="w-full 2xl:px-8 px-4 mt-5">
                                            {activeComponent === "Messages" ? (
                                                <ArrowBackButton component={"student"} />
                                            ) : <></>}

                                            <div className="mt-5">
                                                {activeComponent == "Home" && (
                                                    <ViewNewsAndUpdates />
                                                )}
                                                {activeComponent == `${student?.first_name} ${student?.last_name}` && (
                                                    <ViewUpdateStudentProfile studentDetails={student} />
                                                )}
                                                {activeComponent == `${student?.level} - ${student?.section}` && (
                                                    <StudentClassesLists studentDetails={student} />
                                                )}
                                                {activeComponent == "Messages" && (
                                                   <>
                                                        <div className="lg:hidden flex flex-col h-[12rem] w-full overflow-y-scroll mb-5 border border-gray-200 py-3 rounded-md">
                                                            <StudentMessagesSidebar />
                                                        </div>
                                                        <MessagesContainer />
                                                   </> 
                                                )}
                                                {activeComponent == 'General Newsletters / Memos' && (
                                                    <ViewStudentNewslettersMemos />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </StudentSidebarContexts.Provider>
                }
            </StudentLoginContext.Provider>
        </>
    )
}

export default Student