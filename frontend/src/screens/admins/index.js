import { useState, useMemo } from "react"
import AdminLogin from "../../components/admin/forms/AdminLogin"
import { AdminLoginContext } from "../../contexts/admin/AdminLoginContexts"
import CreateTeacherAccount from "../../components/admin/dashboard/teachers/CreateTeacherAccount"
import CreateStudentAccount from "../../components/admin/dashboard/students/CreateStudentAccount"
import Sidebar from "../../components/admin/dashboard/partials/Sidebar"
import { AdminSidebarContexts } from "../../contexts/admin/AdminSidebarContexts"
import ViewAllTeachers from "../../components/admin/dashboard/teachers/ViewAllTeachers"
import CreateNewClass from "../../components/admin/dashboard/classes/CreateNewClass"
import ViewAllClasses from "../../components/admin/dashboard/classes/ViewAllClasses"
import ViewAllStudents from "../../components/admin/dashboard/students/ViewAllStudents"
import CreateNewsUpdates from "../../components/admin/dashboard/newsUpdates/CreateNewsUpdates"
import NewsUpdatesAdminLists from "../../components/admin/dashboard/newsUpdates/NewsUpdatesAdminLists"
import UploadNewslettersMemos from "../../components/admin/dashboard/newslettersMemos/UploadNewsletterMemos"

const Admin = () => {
    const [admin, setAdmin] = useState(null)
    const userValue = useMemo(() => ({admin, setAdmin}), [admin, setAdmin])
    
    const [activeComponent, setActiveComponent] = useState(0 + ' ' + 'Teachers')
    const sidebarValue = useMemo(() => ({activeComponent, setActiveComponent}), [activeComponent, setActiveComponent])

    return (
        <>
            <AdminLoginContext.Provider value={userValue}>
                {!admin 
                ? 
                    <main className="h-full">
                        <AdminLogin /> 
                    </main>
                : 
                    <AdminSidebarContexts.Provider value={sidebarValue}>
                        <main className="h-full">
                            <div className="flex items-center h-full">
                                <div className="flex flex-col h-full">
                                    <Sidebar />
                                </div>

                                <div className="xl:pl-[18rem] h-full w-full">
                                    {activeComponent == '0 Teachers' && <ViewAllTeachers />}
                                    {activeComponent == '1 Teachers' && <CreateTeacherAccount />}
                                    {activeComponent == '0 Students' && <ViewAllStudents />}
                                    {activeComponent == '1 Students' && <CreateStudentAccount />}
                                    {activeComponent == '0 Classes' && <ViewAllClasses />}
                                    {activeComponent == '1 Classes' && <CreateNewClass />}
                                    {activeComponent == '0 News and updates' && <NewsUpdatesAdminLists />}
                                    {activeComponent == '1 News and updates' &&  <CreateNewsUpdates />}
                                    {activeComponent == '0 General Newsletters / Memos' &&  <UploadNewslettersMemos />}
                                </div>
                            </div>
                        </main>
                    </AdminSidebarContexts.Provider>
                }
            </AdminLoginContext.Provider>
        </>
    )
}

export default Admin