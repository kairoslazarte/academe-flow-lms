import { useEffect, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon as XMarkIcon  } from '@heroicons/react/outline'

const AdvisoryClassStudentsListSlideover = ({ open, setOpen, sectionDetails }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={setOpen} open>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-5xl">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title>
                                                <div className='flex flex-col space-y-2'>
                                                    <p className='text-2xl font-bold uppercase leading-6 text-gray-900'>
                                                        {sectionDetails?.section} students
                                                    </p>
                                                    <p>
                                                        {sectionDetails?._id}
                                                    </p>
                                                </div>
                                            </Dialog.Title>
                                        </div>
                                        <div className='px-4 pt-10'>
                                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            Picture
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            ID
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            Student name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            Birth Date
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            Email
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sectionDetails?.students.map((student) => (
                                                        <tr
                                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                            key={student._id}
                                                        >
                                                            <th className="px-6 py-3">
                                                                <img 
                                                                    className='h-14 w-14 rounded-full object-cover'
                                                                    src={
                                                                        student.image 
                                                                        ? 
                                                                        student.image
                                                                        : 
                                                                        "/static/images/default_user.png"
                                                                    }
                                                                />
                                                            </th>
                                                            <th className="px-6 py-3">
                                                                {student._id}
                                                            </th>
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                            >
                                                                {student.first_name} {student.last_name}
                                                            </th>
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                            >
                                                                {new Date(student?.birthdate).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}
                                                            </th>
                                                            <th className="px-6 py-3">
                                                                {student.email}
                                                            </th>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AdvisoryClassStudentsListSlideover