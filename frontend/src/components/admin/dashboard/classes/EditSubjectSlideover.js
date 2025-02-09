import { useEffect, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon as XMarkIcon  } from '@heroicons/react/outline'
import axios from 'axios'
import Loader from '../../../reusable/Loader'

const EditSubjectSlideover = ({ open, setOpen, subjectDetails }) => {
    const [teachers, setTeachers] = useState(null)
    const [subject, setSubject] = useState(subjectDetails)
    const [onClickAddSchedule, setOnClickAddSchedule] = useState(false)
    const [daySchedule, setDaySchedule] = useState("Monday")
    const [startTimeSchedule, setStartTimeSchedule] = useState("8")
    const [startTimezoneSchedule, setStartTimezonSchedule] = useState("AM")
    const [endTimezoneSchedule, setEndTimezonSchedule] = useState("AM")
    const [endTImeSchedule, setEndTimeSchedule] = useState("9")
    const [teacher, setTeacher] = useState(null)

    const getAllTeachers = async () => {
        try {
            const { data } = await axios.get("/api/admins/get-teachers");
            setTeachers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSubject = async () => {
        try {
            const { data } = await axios.post("/api/admins/get-subject", { id: subjectDetails.subjectID })
            setSubject(data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllTeachers()
        getSubject()
    }, [setTeachers, setSubject])

    const days = [
        {
            day: "Monday",
        },
        {
            day: "Tuesday",
        },
        {
            day: "Wednesday",
        },
        {
            day: "Thursday",
        },
        {
            day: "Friday",
        },
        {
            day: "Saturday",
        },
        {
            day: "Sunday",
        },
    ];

    const times = [
        {
            time: "01:00",
        },
        {
            time: "02:00",
        },
        {
            time: "03:00",
        },
        {
            time: "04:00",
        },
        {
            time: "05:00",
        },
        {
            time: "06:00",
        },
        {
            time: "07:00",
        },
        {
            time: "08:00",
        },
        {
            time: "09:00",
        },
        {
            time: "10:00",
        },
        {
            time: "11:00",
        },
        {
            time: "12:00",
        },
    ];

    const addScheduleHandler = async () => {
        try {
            await axios.post("/api/admins/add-subject-schedule", {
                subjectID: subject?._id,
                day: daySchedule,
                startTime: startTimeSchedule + startTimezoneSchedule,
                endTime: endTImeSchedule + endTimezoneSchedule
            })
            getSubject();
            setOnClickAddSchedule(false)
        } catch (error) {
            console.log(error)
        }
    }


    const removeScheduleFromSubject = async (id) => {
        if (window.confirm(`Are you sure you want to remove this schedule from ${subject?.subject}?`)) {
            await axios.post("/api/admins/delete-subject-schedule", { 
                scheduleID: id,
            })
            getSubject()
            if (onClickAddSchedule) {
                setOnClickAddSchedule(false)
            }
        }
    }

    const updateSubjectTeacher = async () => {
        try {
            await axios.post("/api/admins/update-subject-teacher", {
                teacher: teacher,
                subject: subject?.subject,
                subjectID: subject?._id
            })
            getSubject();
            alert('Set teacher successfully!')
        } catch (error) {
            console.log(error)
        }
    }

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
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-2xl">
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
                                                {subject?.subject}
                                            </Dialog.Title>
                                            <p>
                                                {subject?._id}
                                            </p>
                                        </div>
                                        <div className='px-4 pt-10 flex flex-col space-y-10'>
                                            <div className="w-full text-md flex flex-col space-y-8">
                                                <div className='flex flex-col space-y-4 px-5'>
                                                    <div className='grid grid-cols-2'>
                                                        <div>
                                                            <h3 className="text-left py-3 font-medium text-gray-800">Teacher</h3>
                                                        </div>
                                                        <div >
                                                            {teachers ? (
                                                                <div className="flex flex-col space-y-2">
                                                                    <select
                                                                        required
                                                                        id="teacher"
                                                                        name="teacher"
                                                                        onChange={(e) => setTeacher(e.target.value)}
                                                                        defaultValue={subject?.teacher}
                                                                        className={`relative block w-full appearance-none rounded-md border pl-4 pr-8 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                    >
                                                                        {teachers?.map((teacher) => (
                                                                            <option value={teacher?._id} key={teacher?._id}>{teacher?.first_name} {teacher?.last_name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            ) : (
                                                                <Loader />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={updateSubjectTeacher}
                                                        className="text-white bg-green-500 rounded-md p-1 px-3 mr-auto transition duration-200 hover:opacity-75 flex items-center space-x-1" 
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.3rem]">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <p className='text-md pr-0.5'>Update Teacher</p>
                                                    </button>
                                                </div>
                                                

                                                <div className='flex flex-col space-y-4 px-5 border-t border-gray-200 pt-5'>
                                                    <div>
                                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                                <tr>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3"
                                                                    >
                                                                        Day
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3"
                                                                    >
                                                                        Start Time
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3"
                                                                    >
                                                                        End Time
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3"
                                                                    >
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {subject?.schedules?.map((schedule) => (
                                                                    <tr
                                                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                                        key={schedule?._id}
                                                                    >
                                                                        <td 
                                                                            scope="row"
                                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                                        >
                                                                            {schedule?.day}
                                                                        </td>
                                                                        <td
                                                                            scope="row"
                                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                                        >
                                                                            {schedule?.startTime}
                                                                        </td>
                                                                        <td
                                                                            scope="row"
                                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                                        >
                                                                            {schedule?.endTime}
                                                                        </td>
                                                                        <td className="px-6 py-3">
                                                                            <button
                                                                                className="text-white bg-red-500 rounded-md p-2 w-auto transition duration-200 hover:opacity-75" 
                                                                                onClick={() => removeScheduleFromSubject(schedule._id)}
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.2rem]">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                                </svg>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div className='pt-5'>
                                                       {!onClickAddSchedule ? (
                                                            <button
                                                                className="text-white bg-green-500 rounded-md p-1 px-3   w-auto transition duration-200 hover:opacity-75 flex items-center space-x-1" 
                                                                onClick={() => setOnClickAddSchedule(true)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.3rem]">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <p className='text-md pr-0.5'>Add Schedule</p>
                                                            </button>
                                                       ) : (
                                                            <div className='flex flex-col space-y-4'>
                                                                <div className="grid grid-cols-3 gap-4 pt-2 w-full">
                                                                    <div className="flex flex-col items-center space-y-2">
                                                                        <label
                                                                            htmlFor="day"
                                                                            className="font-medium text-center"
                                                                        >
                                                                            Day
                                                                        </label>
                                                                        <select
                                                                            required
                                                                            id="day"
                                                                            name="day"
                                                                            onClick={(e) => setDaySchedule(e.target.value)}
                                                                            className={`relative block w-[200px] appearance-none rounded-md border pl-4 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                        >
                                                                            {days?.map(
                                                                                (day) => (
                                                                                    <option
                                                                                        value={
                                                                                            day?.day
                                                                                        }
                                                                                        key={
                                                                                            day?.day
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            day?.day
                                                                                        }
                                                                                    </option>
                                                                                )
                                                                            )}
                                                                        </select>
                                                                    </div>
                                                                    <div className="flex items-center space-x-4 w-full">
                                                                        <div className="flex flex-col items-center space-y-2 w-full">
                                                                            <label
                                                                                htmlFor="startTime"
                                                                                className="font-medium text-center"
                                                                            >
                                                                                Start time
                                                                            </label>
                                                                            <div className="flex items-center space-x-2 w-full">
                                                                                <select
                                                                                    required
                                                                                    id="startTime"
                                                                                    name="startTime"
                                                                                    onClick={(e) => setStartTimeSchedule(e.target.value)}
                                                                                    className={`relative block w-[100px] appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                                >
                                                                                    {times?.map(
                                                                                        (
                                                                                            time
                                                                                        ) => (
                                                                                            <option
                                                                                                value={
                                                                                                    time?.time
                                                                                                }
                                                                                                key={
                                                                                                    time?.time
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    time?.time
                                                                                                }
                                                                                            </option>
                                                                                        )
                                                                                    )}
                                                                                </select>
                                                                                <select
                                                                                    required
                                                                                    id="startTimezone"
                                                                                    name="startTimezone"
                                                                                    onChange={(e) => setStartTimezonSchedule(e.target.value)}
                                                                                    className={`relative block w-[80px] appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                                >
                                                                                    <option value="AM">
                                                                                        AM
                                                                                    </option>
                                                                                    <option value="PM">
                                                                                        PM
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center space-x-4 w-full">
                                                                        <div className="flex flex-col items-center space-y-2 w-full">
                                                                            <label
                                                                                htmlFor="endTime"
                                                                                className="font-medium text-center"
                                                                            >
                                                                                End time
                                                                            </label>
                                                                            <div className="flex items-center space-x-2 w-full">
                                                                                <select
                                                                                    required
                                                                                    id="endTime"
                                                                                    name="endTime"
                                                                                    onChange={(e) => setEndTimeSchedule(e.target.value)}
                                                                                    className={`relative block w-[100px] appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                                >
                                                                                    {times?.map(
                                                                                        (
                                                                                            time
                                                                                        ) => (
                                                                                            <option
                                                                                                value={
                                                                                                    time?.time
                                                                                                }
                                                                                                key={
                                                                                                    time?.time
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    time?.time
                                                                                                }
                                                                                            </option>
                                                                                        )
                                                                                    )}
                                                                                </select>
                                                                                <select
                                                                                    required
                                                                                    id="endTimezone"
                                                                                    name="endTimezone"
                                                                                    onChange={(e) => setEndTimezonSchedule(e.target.value)}
                                                                                    className={`relative block w-[80px] appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                                >
                                                                                    <option value="AM">
                                                                                        AM
                                                                                    </option>
                                                                                    <option value="PM">
                                                                                        PM
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='grid grid-cols-2 gap-2 mr-auto pt-4'>
                                                                    <button 
                                                                        type='submit'
                                                                        className="text-white bg-green-500 rounded-md p-1 px-3 w-full transition duration-200 hover:opacity-75 text-center" 
                                                                        onClick={addScheduleHandler}
                                                                    >
                                                                        Add Schedule
                                                                    </button>
                                                                    <button 
                                                                        type='button'
                                                                        className="text-white bg-red-500 rounded-md p-1 px-3 w-full transition duration-200 hover:opacity-75 text-center" 
                                                                        onClick={() => setOnClickAddSchedule(false)}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                       )}
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

export default EditSubjectSlideover