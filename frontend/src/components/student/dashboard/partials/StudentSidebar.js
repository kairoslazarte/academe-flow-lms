import { StudentSidebarContexts } from "../../../../contexts/student/StudentSidebarContexts";
import {
    UserIcon,
    AcademicCapIcon,
    HomeIcon,
    NewspaperIcon,
    ChatIcon
} from "@heroicons/react/outline";
import { useState, useContext } from "react";
import StudentMessagesSidebar from "./StudentMessagesSidebar";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const StudentSidebar= ({ studentDetails }) => {
    const { activeComponent, setActiveComponent } = useContext(StudentSidebarContexts)

    let navigation = [
        {
            name: "Home",
            icon: HomeIcon,
        },
        {
            name: studentDetails?.first_name + " " + studentDetails?.last_name,
            icon: UserIcon,
        },
        {
            name: studentDetails?.level + " - " + studentDetails?.section,
            icon: AcademicCapIcon
        },
        {
            name: "Messages",
            icon: ChatIcon
        },
        {
            name: "General Newsletters / Memos",
            icon: NewspaperIcon,
        },
    ];

    return (
        <aside>
            <div className="hidden lg:flex lg:w-[18rem] xl:w-[20rem] lg:flex-col lg:fixed lg:inset-y-0 bg-white shadow-lg pt-10 relative">
                <div className="flex flex-col flex-1 min-h-0 bg-oa-gray">
                    <div className="flex items-center flex-shrink-0 h-24 px-2 transition duration-200 mx-2 absolute top-0">
                        <img
                            className="h-16 w-auto"
                            src="/academe-flow-logo.png"
                            alt="DHM logo small"
                        />
                    </div>

                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pt-16">
                        <nav className="p-0 space-y-1">
                            {activeComponent === "Messages" ? (
                                <StudentMessagesSidebar />
                            ) : (
                                <>
                                    {navigation.map((item) =>
                                        <button
                                            key={item.name} 
                                            className={classNames(
                                                    item.name ==
                                                    activeComponent
                                                    ? "bg-[#58c150] text-white ml-2 hover:text-white"
                                                    : "text-[#58c150] hover:bg-[#58c150] hover:text-white mx-2",
                                                "group flex items-center px-2 py-2 font-medium rounded-md w-full xl:text-base text-sm"
                                            )}
                                            onClick={() =>
                                                setActiveComponent(item.name)
                                            }
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.name == activeComponent
                                                        ? "text-white group-hover:text-white"
                                                        : "text-[#58c150]  group-hover:text-white",
                                                    "mr-3 flex-shrink-0 h-8 w-8"
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </button>
                                    )}
                                    <button
                                        className="group flex items-center px-2 mx-2 py-2 text-sm font-medium rounded-md text-[#58c150] hover:bg-[#58c150] hover:text-white w-full"
                                        onClick={() => window.location.reload()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  className="text-[#58c150] group-hover:text-white mr-3 flex-shrink-0 h-8 w-8 font-medium">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                        Sign Out
                                    </button>
                                </>
                            )}
                        </nav>

                        <div className="mt-auto pb-4 px-4">
                            <span className="text-[#58c150] text-xs italic">Copyright © 2024 all rights reserved - Academe Flow</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default StudentSidebar
