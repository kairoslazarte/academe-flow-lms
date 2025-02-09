import { useEffect, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon as XMarkIcon  } from '@heroicons/react/outline'

const TeacherDetailsSlideover = ({ open, setOpen, teacherDetails }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen} open>
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
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xl">
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
                                        <div className="flex flex-col space-y-2 px-4 sm:px-6">
                                            <Dialog.Title className="text-2xl font-bold uppercase leading-6 text-gray-900">
                                                {teacherDetails?.first_name + ' ' + teacherDetails?.middle_name + ' ' + teacherDetails?.last_name}
                                            </Dialog.Title>
                                            <p>
                                                {teacherDetails?._id}
                                            </p>
                                        </div>
                                        <div className='px-4 pt-10'>
                                            <div className="w-full text-md bg-white shadow-md rounded">
                                                <div className='grid grid-cols-2'>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Email</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{teacherDetails?.email}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Birth Date</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5"> {new Date(teacherDetails?.birthdate).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Home address</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{teacherDetails?.address}</p>
                                                    </div>
                                                    <div className='border-b'>
                                                        <h3 className="text-left p-3 px-5">Phone</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{teacherDetails?.phone}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Advisory Class</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{teacherDetails?.advisoryClass.map((advisorySection) => advisorySection.section + ', ')}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Classes</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{teacherDetails?.classes.map((classInfo) => classInfo.subject + ', ')}</p>
                                                    </div>
                                                </div>
                                            </div>
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

export default TeacherDetailsSlideover