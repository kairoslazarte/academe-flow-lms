import React, { useState, useEffect } from 'react'
import axios from 'axios';
import EditSubjectSlideover from './EditSubjectSlideover';

const Editsection = ({ sectionDetails }) => {
    const [teachers, setTeachers] = useState(null)
    const [section, setSection] = useState(sectionDetails)
    const [adviser, setAdviser] = useState(null)
    const [students, setStudents] = useState(null)
    const [selectedTeacher, setSelectedTeacher] = useState(null)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [onClickAddStudent, setOnClickAddStudent] = useState(false)
    const [onClickAddSubject, setOnClickAddSubject] = useState(false)
    const [newSubject, setNewSubject] = useState(null)
    const [open, setOpen] = useState(false)
    const [subjectDetails, setSubjectDetails] = useState(null)

    const getAllTeachers = async () => {
        try {
            const { data } = await axios.get("/api/admins/get-teachers");
            setTeachers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSection = async () => {
        try {
            const { data } = await axios.post("/api/admins/get-section", { id: section?._id })
            setSection(data.section)
            setAdviser(data.adviser)
        } catch (error) {
            console.log(error)
        }
    };

    const getAllStudents = async () => {
        try {
            const { data } = await axios.get("/api/admins/get-students");
            setStudents(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTeachers();
        getSection();
        getAllStudents();
    }, [setTeachers, setSection, setStudents]);

    const removeStudentFromSection = async (id) => {
        if (window.confirm(`Are you sure you want to remove this student from ${section?.section}?`)) {
            await axios.post("/api/admins/remove-student", { 
                studentID: id,
                sectionID: section?._id
            })
            getSection()
            if (onClickAddStudent) {
                setOnClickAddStudent(false)
                getAllStudents()
            }
        }
    };
    
    const removeSubjectFromSection = async (id) => {
        if (window.confirm(`Are you sure you want to remove this subject from ${section?.section}?`)) {
            await axios.post("/api/admins/remove-subject", { id: id })
            getSection()
            if (onClickAddStudent) {
                setOnClickAddStudent(false)
                getAllStudents()
            }
        }
    };

    const addStudentHandler = async (id) => {
        try {
            await axios.post("/api/admins/add-student-section", {
                studentID: id,
                sectionID: section?._id
            })
            getSection();
            setOnClickAddStudent(false)
            getAllStudents();
        } catch (error) {
            console.log(error)
        }
    };

    const addSubjectHandler = async () => {
        try {
            await axios.post("/api/admins/add-subject-section", {
                subjectName: newSubject,
                subjectTeacher: selectedTeacher,
                sectionID: section?._id
            })
            getSection();
            setOnClickAddSubject(false)
            getAllStudents();
        } catch (error) {
            console.log(error)
        }
    };

    const updateSection = async (e) => {
        e.preventDefault()

        try {
            await axios.post("/api/admins/update-adviser-section", {
                sectionID: section?._id,
                section: e.target.sectionName.value,
                adviser: e.target.adviser.value
            })
            alert('Section updated successfully!');
            getSection();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
            <div className="flex flex-col space-y-8">
                <div className='flex flex-col space-y-2'>
                    <h1 className="font-bold text-4xl">Edit Section {section?.section}</h1>
                    <h3 className='text-gray-700 italic'>{section?._id}</h3>
                </div>

                <div className="border-2 border-gray-300 rounded-md p-8 h-full">
                    <div className="flex flex-col space-y-6 divide-y">

                        {/* Section Basic Information */}
                        <div className="flex flex-row">
                            <div className="w-[30%] border-r">
                                <h2 className="text-xl font-semibold">Section Information</h2>
                            </div>
                            <div className="w-[70%] pl-6">
                                <form onSubmit={updateSection} className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="sectionName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section name</label>
                                        <input type="text" id="sectionName" name="sectionName" defaultValue={section?.section} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter section name.." required />
                                    </div>
                                    {teachers && (
                                        <div className="flex flex-col space-y-2">
                                            <label
                                                htmlFor="adviser"
                                                className="text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Adviser
                                            </label>
                                            <select
                                                required
                                                id="adviser"
                                                name="adviser"
                                                defaultValue={section.adviser}
                                                className={`relative block w-full appearance-none rounded-md border pl-4 pr-8 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                            >
                                                {teachers?.map((teacher) => (
                                                    <option value={teacher?._id} key={teacher?._id}>{teacher?.first_name} {teacher?.last_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    <button 
                                        type="submit" 
                                        className="text-white bg-green-500 rounded-md p-1 px-4 transition duration-200 hover:opacity-75 text-center mr-auto" 
                                    >
                                        Update Section name/adviser
                                    </button>
                                </form>
                                <div className="mb-6">
                                    <h1 className="text-sm font-medium text-gray-900 dark:text-white">Students</h1>
                                    <div className="flex flex-col space-y-4 relative overflow-x-auto pt-6">
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
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {section?.students.map((student) => (
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
                                                        <th className="px-6 py-3">
                                                            <button
                                                                className="text-white bg-red-500 rounded-md p-2 w-auto transition duration-200 hover:opacity-75" 
                                                                onClick={() => removeStudentFromSection(student?._id)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.2rem]">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <div className='flex flex-row items-center space-x-4'>
                                            <div>
                                                {!onClickAddStudent ?  (
                                                    <button
                                                        className="text-white bg-green-500 rounded-md p-1 px-3   w-auto transition duration-200 hover:opacity-75 flex items-center space-x-1" 
                                                        onClick={() => setOnClickAddStudent(true)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.3rem]">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <p className='text-md pr-0.5'>Add Student</p>
                                                    </button>
                                                ) : (
                                                     <div className="grid grid-cols-2 gap-6">
                                                        <select
                                                            required
                                                            id="student"
                                                            name="student"
                                                            className={`relative block w-full appearance-none rounded-md border pl-4 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                            onChange={(e) => setSelectedStudent(e.target.value)}
                                                        >
                                                            {students?.map(
                                                                (student) => (
                                                                    !student.section && (
                                                                        <option
                                                                            value={
                                                                                student?._id
                                                                            }
                                                                            key={
                                                                                student?._id
                                                                            }
                                                                        >
                                                                            {
                                                                                student?.first_name
                                                                            }{" "}
                                                                            {
                                                                                student?.last_name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )
                                                            )}
                                                        </select>
                                                        
                                                        <div className='grid grid-cols-2 gap-2'>
                                                                <button 
                                                                    type='submit'
                                                                    className="text-white bg-green-500 rounded-md p-1 px-3 w-full transition duration-200 hover:opacity-75 text-center" 
                                                                    onClick={() => addStudentHandler(selectedStudent)}
                                                                >
                                                                    Add Student
                                                                </button>
                                                            <button 
                                                                type='button'
                                                                className="text-white bg-red-500 rounded-md p-1 px-3 w-full transition duration-200 hover:opacity-75 text-center" 
                                                                onClick={() => setOnClickAddStudent(false)}
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
                        </div>

                        {/* Subjects */}
                        <div className="flex flex-row pt-6">
                            <div className="w-[30%] border-r">
                                <h2 className="text-xl font-semibold">Subjects</h2>
                            </div>
                            <div className="w-[70%] pl-6">
                                <div className="flex flex-col space-y-4 relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
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
                                                    Subject
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section?.subjects.map((subject) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={subject._id}
                                                >
                                                    <td className="px-6 py-3">
                                                        {subject.subjectID}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {subject.subject}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <div className="flex flex-row space-x-4 justify-end">
                                                            <button
                                                                className="text-white bg-yellow-400 rounded-md py-1 px-2 w-auto transition duration-200 hover:opacity-75" 
                                                                onClick={() => 
                                                                    setOpen(
                                                                        (open) => !open,
                                                                        setSubjectDetails(subject)
                                                                    )
                                                                }  
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.5rem]">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                className="text-white bg-red-500 rounded-md p-2 w-auto transition duration-200 hover:opacity-75" 
                                                                onClick={() => removeSubjectFromSection(subject.subjectID)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.2rem]">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    
                                    <div className='flex flex-row items-center space-x-4'>
                                        <div>
                                            {!onClickAddSubject ?  (
                                                <button
                                                    className="text-white bg-green-500 rounded-md p-1 px-3   w-auto transition duration-200 hover:opacity-75 flex items-center space-x-1" 
                                                    onClick={() => setOnClickAddSubject(true)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.3rem]">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className='text-md pr-0.5'>Add Subject</p>
                                                </button>
                                            ) : (
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <input
                                                            id="new_subject"
                                                            name="new_subject"
                                                            type="text"
                                                            autoComplete="new_subject"
                                                            required
                                                            onChange={(e) => setNewSubject(e.target.value)}
                                                            className={`relative block w-full appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                            placeholder="Enter subject name.."
                                                        />
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <label
                                                            htmlFor="subject_teacher"
                                                            className="font-medium text-gray-700"
                                                        >
                                                            Teacher
                                                        </label>
                                                        <select
                                                            required
                                                            id="subject_teacher"
                                                            name="subject_teacher"
                                                            className={`relative block w-full appearance-none rounded-md border pl-4 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                            onChange={(e) => setSelectedTeacher(e.target.value)}
                                                        >
                                                            {teachers?.map(
                                                                (teacher) => (
                                                                    <option
                                                                        value={
                                                                            teacher?._id
                                                                        }
                                                                        key={
                                                                            teacher?._id
                                                                        }
                                                                    >
                                                                        {
                                                                            teacher?.first_name
                                                                        }{" "}
                                                                        {
                                                                            teacher?.last_name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>

                                                    <div className='grid grid-cols-2 gap-2'>
                                                        <button 
                                                            type='submit'
                                                            className="text-white bg-green-500 rounded-md p-1 px-3 w-full transition duration-200 hover:opacity-75 text-center" 
                                                            onClick={addSubjectHandler}
                                                        >
                                                            Add Subject
                                                        </button>
                                                        <button 
                                                            type='button'
                                                            className="text-white bg-red-500 rounded-md p-1 px-3 w-full transition duration-200 hover:opacity-75 text-center" 
                                                            onClick={() => setOnClickAddSubject(false)}
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
                    </div>
                </div>
            </div>

            {open && (
                <EditSubjectSlideover open={open} setOpen={setOpen} subjectDetails={subjectDetails}/>
            )}
        </div>
    )
}

export default Editsection