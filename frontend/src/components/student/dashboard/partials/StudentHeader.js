import { Fragment, useContext, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    UserIcon,
    AcademicCapIcon,
    HomeIcon,
    NewspaperIcon,
    XIcon,
    MenuAlt2Icon,
    ChatIcon
} from '@heroicons/react/outline'
import { Disclosure } from '@headlessui/react'
import { StudentSidebarContexts } from '../../../../contexts/student/StudentSidebarContexts';

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const StudentHeader = ({ studentDetails }) => {
    const [openUserDropdown, setOpenUserDropdown] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

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
        <header className="w-full sticky top-0 bg-white border-b border-gray-200 z-20">
            <div className="pr-4 xl:pr-8 flex items-center py-2">
                <button
                    type="button"
                    className={`px-4 text-gray-500 border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden`}
                    onClick={() => setSidebarOpen(true)}>
                    <span className="sr-only">Open sidebar</span>
                    <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
                </button>
                <div className="ml-auto flex items-center space-x-4">
                    <h3 className="text-[#58c150] font-medium justify-end flex xl:text-base text-sm">
                        Hi, {studentDetails?.first_name} {studentDetails?.last_name}!
                    </h3>
                    <div className="relative">
                        <img 
                            className='h-10 w-10 rounded-full object-cover cursor-pointer'
                            src={studentDetails?.image ? studentDetails?.image : '/static/images/default_user.png'}
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

            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-50 flex xl:hidden"
                        onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full">
                            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <div className="absolute top-0 right-0 pt-2 -mr-12">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }>
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XIcon
                                                className="w-6 h-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex items-center flex-shrink-0 px-4">
                                    <img
                                        className="h-16 w-auto"
                                        src="/static/images/dhm-logo-sm.png"
                                        alt="DHM logo small"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 mt-5 overflow-y-auto overflow-x-hidden">
                                    <nav className="p-0 space-y-1">
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
                                                    setActiveComponent(item.name, setSidebarOpen(false))
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
                                    </nav>

                                    <div className="mt-auto pb-4 px-4">
                                        <span className="text-[#58c150] text-xs italic">Copyright © 2023 all rights reserved - Discovery House Montessori of Quezon City</span>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </header>
    )
}

export default StudentHeader