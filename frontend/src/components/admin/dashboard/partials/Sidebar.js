import {
    AdminSidebarContexts,
} from "../../../../contexts/admin/AdminSidebarContexts";
import {
    UserIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    NewspaperIcon,
} from "@heroicons/react/outline";
import { useState, useMemo, useContext } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
    const { activeComponent, setActiveComponent } =
        useContext(AdminSidebarContexts);
    const [activeDropDownSidebar, setActiveDropDownSidebar] =
        useState("Teachers");

    let navigation = [
        {
            name: "Teachers",
            icon: UserIcon,
            dropdownItems: [
                {
                    name: "View all teachers",
                },
                {
                    name: "Create account for teacher",
                },
            ],
        },
        {
            name: "Students",
            icon: AcademicCapIcon,
            dropdownItems: [
                {
                    name: "View all students",
                },
                {
                    name: "Create account for student",
                },
            ],
        },
        {
            name: "Classes",
            icon: BriefcaseIcon,
            dropdownItems: [
                {
                    name: "View all classes",
                },
                {
                    name: "Create a new class",
                },
            ],
        },
        {
            name: "News and updates",
            icon: NewspaperIcon,
            dropdownItems: [
                {
                    name: "View news and updates",
                },
                {
                    name: "Create news and updates",
                },
            ],
        },
        {
            name: "General Newsletters / Memos",
            icon: NewspaperIcon,
            dropdownItems: [
                {
                    name: "Upload newsletters or memos",
                },
            ],
        },
    ];

    return (
        <aside>
            <div className="hidden xl:flex md:w-[18rem] md:flex-col md:fixed md:inset-y-0 bg-gray-800">
                <div className="flex flex-col flex-1 min-h-0 bg-oa-gray">
                    <div className="flex items-center flex-shrink-0 h-24 px-2 transition duration-200 mx-2">
                        <img
                            className="h-16 w-auto"
                            src="/academe-flow-logo.png"
                            alt="DHM logo small"
                        />
                    </div>

                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <nav className="p-0 space-y-1 mx-2">
                            {navigation.map((item) =>
                               <div key={item.name}>
                                    <div className="flex items-center justify-between w-full text-gray-400">
                                        <button
                                            key={item.name}
                                            type="button"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                                            onClick={() =>
                                                setActiveDropDownSidebar(
                                                    item.name
                                                )
                                            }
                                        >
                                            <item.icon
                                                className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={classNames(
                                                    activeDropDownSidebar == item.name
                                                        ? "-rotate-90"
                                                        : "rotate-90",
                                                    "transform ml-auto"
                                                )}
                                                width="8"
                                                height="8"
                                                viewBox="0 0 8 8"
                                                fill="none"
                                            >
                                                <path
                                                    d="M0 0L8 4L0 8V0Z"
                                                    fill="#D1D5DB"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {activeDropDownSidebar == item.name && (
                                        <div className="pt-2 pl-5">
                                            {item.dropdownItems.map(
                                                (dItem, idx) => (
                                                    <button
                                                        key={dItem.name}
                                                        href={dItem.href}
                                                        className={classNames(
                                                            idx +
                                                                " " +
                                                                item.name ==
                                                                activeComponent
                                                                ? "bg-gray-900 text-white"
                                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                                                        )}
                                                        onClick={() =>
                                                            setActiveComponent(
                                                                idx +
                                                                    " " +
                                                                    item.name
                                                            )
                                                        }
                                                    >
                                                        {dItem.name}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                             <div>
                                <div className="flex items-center justify-between w-full text-gray-400">
                                    <button
                                        type="button"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                                        onClick={() => window.location.reload()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  
                                        className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
