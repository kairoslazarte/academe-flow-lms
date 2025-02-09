import ViewNewsAndUpdates from "../../components/reusable/ViewNewsAndUpdates"
import TeacherAdvisoryClassesLists from "../../components/teacher/dashboard/advisoryClasses/TeacherAdvisoryClassesLists"
import TeacherClassesLists from "../../components/teacher/dashboard/classes/TeacherClassesLists"
import TeacherHeader from "../../components/teacher/dashboard/partials/TeacherHeader"
import TeacherSidebar from "../../components/teacher/dashboard/partials/TeacherSidebar"
import ViewUpdateTeacherProfile from "../../components/teacher/dashboard/profile/ViewUpdateTeacherProfile"
import TeacherLogin from "../../components/teacher/forms/TeacherLogin"
import { TeacherLoginContext } from "../../contexts/teacher/TeacherLoginContexts"
import { TeacherSidebarContexts } from "../../contexts/teacher/TeacherSidebarContext"
import { useEffect, useMemo, useState } from "react"
import ArrowBackButton from "../../components/reusable/ArrowBackButton"
import MessagesContainer from "../../components/common/messages/MessagesContainer"
import useTeacherGetAllStudents from "../../hooks/teacher/useTeacherGetAllStudents"
import useListenMessages from "../../hooks/messages/useListenMessages"
import { useUsersContext } from "../../contexts/users/UsersContext"

const Teacher = () => {
    const { students } = useTeacherGetAllStudents();
    const { setUsers } = useUsersContext();
    
    useListenMessages({users: students});
    const [teacher, setTeacher] = useState(null);
    const userValue = useMemo(() => ({teacher, setTeacher}), [teacher, setTeacher]);
    
    const [activeComponent, setActiveComponent] = useState("Home")
    const sidebarValue = useMemo(() => ({activeComponent, setActiveComponent}), [activeComponent, setActiveComponent]);

    useEffect(() => {
        if (students) setUsers(students);
    }, [students])

    return (
        <>
            <TeacherLoginContext.Provider value={userValue}>
                {
                !teacher 
                    ? 
                        <main className="h-full">
                            <TeacherLogin /> 
                        </main>
                    : 
                    <TeacherSidebarContexts.Provider value={sidebarValue}>
                        <main className="h-full bg-gray-50">
                            <div className="flex items-center h-full">
                                <div className="flex flex-col h-full">                                  
                                    <TeacherSidebar teacherDetails={teacher} />
                                </div>

                                <div className="lg:pl-[20rem] h-full w-full">
                                    <TeacherHeader teacherDetails={teacher} />

                                    <div className="flex flex-row w-full">
                                        <div className="w-full 2xl:px-8 px-4 mt-5">
                                            {activeComponent === "Messages" ? (
                                                <ArrowBackButton component={"teacher"} />
                                            ) : <></>}

                                            <div className="mt-5">
                                                {activeComponent == "Home" && (
                                                    <ViewNewsAndUpdates />
                                                )}
                                                {activeComponent == `${teacher?.first_name} ${teacher?.last_name}` && (
                                                    <ViewUpdateTeacherProfile teacherDetails={teacher} />
                                                )}
                                                {activeComponent == 'Classes' && (
                                                    <TeacherClassesLists teacherDetails={teacher} />
                                                )}
                                                {activeComponent == "Messages" && (
                                                    <MessagesContainer />
                                                )}
                                                {activeComponent == 'Advisory Classes' && (
                                                    <TeacherAdvisoryClassesLists teacherDetails={teacher} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </TeacherSidebarContexts.Provider>
                }
            </TeacherLoginContext.Provider>
        </>
    )
}

export default Teacher