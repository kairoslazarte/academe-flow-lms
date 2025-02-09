import { useEffect, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon as XMarkIcon  } from '@heroicons/react/outline'
import axios from 'axios'

const StudentDetailsSlideover = ({ open, setOpen, studentDetails }) => {
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
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="flex flex-row space-x-4 items-center">
                                                <div>
                                                    <img 
                                                        className='h-24 w-24 rounded-full object-cover'
                                                        src={studentDetails?.image}
                                                    />
                                                </div>
                                                <div className='flex flex-col space-y-2'>
                                                    <p className='text-2xl font-bold uppercase leading-6 text-gray-900'>
                                                        {studentDetails?.first_name + ' ' + studentDetails?.last_name}
                                                    </p>
                                                    <p>
                                                        {studentDetails?._id}
                                                    </p>
                                                </div>
                                            </Dialog.Title>
                                        </div>
                                        <div className='px-4 pt-10 flex flex-col space-y-10'>
                                            <div className="w-full text-md bg-white shadow-md rounded">
                                                <div className='grid grid-cols-2'>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Email</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{studentDetails?.email}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Birth Date</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{new Date(studentDetails?.birthdate).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Address</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{studentDetails?.address}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Category</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{studentDetails?.category}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Level</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{studentDetails?.level}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Section</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{studentDetails?.section}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex flex-col space-y-4'>
                                                <h2 className='text-2xl font-bold text-black uppercase'>Parent/Guardian details</h2>
                                                <div className='grid grid-cols-2'>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">First name</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{studentDetails?.parent_guardian?.first_name}</p>
                                                    </div>
                                                    {studentDetails?.middle_name && (
                                                        <>
                                                         <div className="border-b">
                                                            <h3 className="text-left p-3 px-5">Middle name</h3>
                                                        </div>
                                                        <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                            <p className="p-3 px-5">{studentDetails?.parent_guardian?.middle_name}</p>
                                                        </div>
                                                        </>
                                                    )}
                                                   <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Last name</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{studentDetails?.parent_guardian?.last_name}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Relationship</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{studentDetails?.parent_guardian?.relationship}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Email</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{studentDetails?.parent_guardian?.email}</p>
                                                    </div>
                                                    <div className="border-b">
                                                        <h3 className="text-left p-3 px-5">Phone number</h3>
                                                    </div>
                                                    <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                        <p className="p-3 px-5">{studentDetails?.parent_guardian?.phone_number}</p>
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


export default StudentDetailsSlideover