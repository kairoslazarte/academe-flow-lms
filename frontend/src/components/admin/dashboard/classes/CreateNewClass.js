import axios from "axios";
import React, { useState, useEffect } from "react";

const CreateNewClass = () => {
    const [step, setStep] = useState(0);
    const [createNewCategory, setCreateNewCategory] = useState(false);
    const [createNewLevel, setCreateNewLevel] = useState(false);
    const [createNewSection, setCreateNewSection] = useState(false);
    const [addSchedule, setAddSchedule] = useState(false);

    const [categories, setCategories] = useState(null);
    const [levels, setLevels] = useState(null);
    const [teachers, setTeachers] = useState(null);
    const [sections, setSections] = useState(null);

    const [category, setCategory] = useState(null);
    const [level, setLevel] = useState(null);
    const [section, setSection] = useState(null);
    const [subject, setSubject] = useState(null);

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

    const getAllLevels = async (id) => {
        try {
            const { data } = await axios.post("/api/admins/get-levels", {
                category: id,
            });
            setLevels(data);

            if (data.sections.length == 0) {
                setCreateNewSection(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("/api/admins/get-categories");
            setCategories(data);

            if (data.length == 0) {
                setCreateNewCategory(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllTeachers = async () => {
        try {
            const { data } = await axios.get("/api/admins/get-teachers");
            setTeachers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllSections = async (id) => {
        try {
            const { data } = await axios.post("/api/admins/get-sections", {
                levelID: id,
            });
            setSections(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTeachers();
        getAllCategories();
    }, [setTeachers, setCategories, setCreateNewCategory]);

    const createClassCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/admins/create-category", {
                category: e.target.category.value,
            });
            setCategory(data);
            getAllLevels(data._id);
            setStep(1);
        } catch (error) {
            console.log(error);
        }
    };

    const createLevel = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/admins/create-level", {
                category: category._id,
                level: e.target.level.value,
            });
            setLevel(data);
            getAllSections(data._id);
            setStep(2);
        } catch (error) {
            console.log(error);
        }
    };

    const createSection = async (e) => {
        e.preventDefault();
        try {
            if (!createNewSection && !createNewCategory && !createNewLevel) {
                const { data } = await axios.post(
                    "/api/admins/create-section",
                    {
                        level: level._id,
                        section: e.target.section.value,
                    }
                );
                setSection(data);
                setStep(3);
            } else {
                const { data } = await axios.post(
                    "/api/admins/create-section",
                    {
                        level: level._id,
                        section: e.target.section.value,
                        adviser: e.target.adviser.value,
                    }
                );
                setSection(data);
                setStep(3);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createSubject = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/admins/create-subject", {
                subject: e.target.subject.value,
                section: section._id,
                teacher: e.target.teacher.value,
            });
            setSubject(data);
            setStep(4);
        } catch (error) {
            alert("Subject already exists for this Section!");
            console.log(error);
        }
    };

    const createSchedule = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/admins/create-schedule", {
                subject: subject._id,
                day: e.target.day.value,
                startTime:
                    e.target.startTime.value + e.target.startTimezone.value,
                endTime: e.target.endTime.value + e.target.endTimezone.value,
            });
            setStep(5);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
            <div className="flex flex-col space-y-8">
                <h1 className="font-bold text-4xl">Create a new class:</h1>

                <div className="border-2 border-gray-300 rounded-md p-8 h-full">
                    <div className="flex flex-row">
                        <div className="w-[30%] border-r">
                            <ul className="flex flex-col divide-y pr-6">
                                <li
                                    className={`text-lg p-3 ${
                                        step == 0
                                            ? "opacity-100 text-white bg-green-700 rounded-md font-bold"
                                            : "opacity-60 text-gray-500 font-semibold"
                                    }`}
                                >
                                    Category
                                </li>
                                <li
                                    className={`text-lg p-3 ${
                                        step == 1
                                            ? "opacity-100 text-white bg-green-700 rounded-md font-bold"
                                            : "opacity-60 text-gray-500 font-semibold"
                                    }`}
                                >
                                    Level
                                </li>
                                <li
                                    className={`text-lg p-3 ${
                                        step == 2
                                            ? "opacity-100 text-white bg-green-700 rounded-md font-bold"
                                            : "opacity-60 text-gray-500 font-semibold"
                                    }`}
                                >
                                    Section
                                </li>
                                <li
                                    className={`text-lg p-3 ${
                                        step == 3
                                            ? "opacity-100 text-white bg-green-700 rounded-md font-bold"
                                            : "opacity-60 text-gray-500 font-semibold"
                                    }`}
                                >
                                    Subject
                                </li>
                                <li
                                    className={`text-lg p-3 ${
                                        step == 4
                                            ? "opacity-100 text-white bg-green-700 rounded-md font-bold"
                                            : "opacity-60 text-gray-500 font-semibold"
                                    }`}
                                >
                                    Schedule
                                </li>
                            </ul>
                        </div>
                        <div className="w-[70%] pl-6 relative">
                            <div className="pb-5">
                                {step > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="bg-white text-black border border-black rounded-md px-4 py-2 mr-auto font-medium transition duration-200 hover:bg-black hover:text-white"
                                    >
                                        Go back
                                    </button>
                                )}
                            </div>

                            {step == 0 || step == 1 || step == 2 ? (
                                <div className="flex flex-col space-y-6">
                                    {/* For Category */}
                                    <div
                                        className={
                                            step == 0
                                                ? "opacity-100"
                                                : "opacity-50"
                                        }
                                    >
                                        <form
                                            onSubmit={createClassCategory}
                                            className="flex flex-col space-y-4"
                                        >
                                            <fieldset
                                                className="flex flex-col space-y-2 mr-auto"
                                                disabled={
                                                    step == 0 ? false : true
                                                }
                                            >
                                                {!createNewCategory ? (
                                                    <div className="flex flex-col space-y-4">
                                                        <label
                                                            htmlFor="category"
                                                            className="font-medium text-xl"
                                                        >
                                                            Choose a Category
                                                        </label>
                                                        <select
                                                            required
                                                            id="category"
                                                            name="category"
                                                            className={`relative block w-full appearance-none rounded-md border pl-2 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                        >
                                                            {categories?.map(
                                                                (category) => (
                                                                    <option
                                                                        value={
                                                                            category?.category
                                                                        }
                                                                        key={
                                                                            category?._id
                                                                        }
                                                                    >
                                                                        {
                                                                            category?.category
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                        {step == 0 && (
                                                            <div className="flex items-center space-x-4">
                                                                <button
                                                                    type="submit"
                                                                    className="font-medium text-white bg-red-500 px-4 py-2 rounded-md transition duration-200 hover:opacity-70"
                                                                >
                                                                    Select
                                                                    category
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-white bg-blue-500 px-4 py-2 rounded-md transition duration-200 hover:opacity-70"
                                                                    onClick={() =>
                                                                        setCreateNewCategory(
                                                                            true
                                                                        )
                                                                    }
                                                                >
                                                                    Create a new
                                                                    category
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col space-y-4">
                                                        <label
                                                            htmlFor="category"
                                                            className="font-medium text-xl"
                                                        >
                                                            Create new class
                                                            Category
                                                        </label>
                                                        <input
                                                            id="category"
                                                            name="category"
                                                            type="text"
                                                            autoComplete="category"
                                                            required
                                                            className={`relative block w-full appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                            placeholder="Enter class category.."
                                                        />
                                                        {step == 0 && (
                                                            <div className="flex items-center space-x-4">
                                                                <button
                                                                    type="submit"
                                                                    className="bg-blue-500 px-5 py-2 mx-auto rounded-md text-white font-medium transition duration-200 hover:opacity-70"
                                                                >
                                                                    Create
                                                                    category
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </fieldset>
                                        </form>
                                    </div>

                                    {/* For Level */}
                                    <div
                                        className={
                                            step == 1
                                                ? "opacity-100"
                                                : "opacity-50"
                                        }
                                    >
                                        <form
                                            onSubmit={createLevel}
                                            className="flex flex-col space-y-4"
                                        >
                                            <fieldset
                                                className="flex flex-col mr-auto space-y-2"
                                                disabled={
                                                    step == 1 ? false : true
                                                }
                                            >
                                                {!createNewCategory ? (
                                                    !createNewLevel ? (
                                                        <div className="flex flex-col space-y-4">
                                                            <label
                                                                htmlFor="level"
                                                                className="font-medium text-xl"
                                                            >
                                                                Choose a level
                                                            </label>
                                                            <select
                                                                required
                                                                id="level"
                                                                name="level"
                                                                className={`relative block w-full appearance-none rounded-md border pl-2 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                            >
                                                                {levels?.map(
                                                                    (level) => (
                                                                        <option
                                                                            value={
                                                                                level?.level
                                                                            }
                                                                            key={
                                                                                level?._id
                                                                            }
                                                                        >
                                                                            {
                                                                                level?.level
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            {step == 1 && (
                                                                <div className="flex items-center space-x-4">
                                                                    <button
                                                                        type="submit"
                                                                        className="font-medium text-white bg-red-500 px-4 py-2 rounded-md transition duration-200 hover:opacity-70"
                                                                    >
                                                                        Select
                                                                        level
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="font-medium text-white bg-blue-500 px-4 py-2 rounded-md transition duration-200 hover:opacity-70"
                                                                        onClick={() =>
                                                                            setCreateNewLevel(
                                                                                true
                                                                            )
                                                                        }
                                                                    >
                                                                        Create a
                                                                        new
                                                                        level
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col space-y-4">
                                                            <label
                                                                htmlFor="level"
                                                                className="font-medium text-xl"
                                                            >
                                                                Create new class
                                                                Level
                                                            </label>
                                                            <input
                                                                id="level"
                                                                name="level"
                                                                type="text"
                                                                autoComplete="level"
                                                                required
                                                                className={`relative block w-full appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                placeholder="Enter level.."
                                                            />
                                                            {step == 1 && (
                                                                <button
                                                                    type="submit"
                                                                    className="bg-blue-500 px-5 py-2 mx-auto rounded-md text-white font-medium transition duration-200 hover:opacity-75"
                                                                >
                                                                    Create level
                                                                </button>
                                                            )}
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="flex flex-col space-y-4">
                                                        <label
                                                            htmlFor="level"
                                                            className="font-medium text-xl"
                                                        >
                                                            Level
                                                        </label>
                                                        <input
                                                            id="level"
                                                            name="level"
                                                            type="text"
                                                            autoComplete="level"
                                                            required
                                                            className={`relative block w-full appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                            placeholder="Enter level.."
                                                        />
                                                        {step == 1 && (
                                                            <button
                                                                type="submit"
                                                                className="bg-blue-500 px-5 py-2 mx-auto rounded-md text-white font-medium transition duration-200 hover:opacity-75"
                                                            >
                                                                Create level
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </fieldset>
                                        </form>
                                    </div>

                                    {/* For Section */}
                                    <div
                                        className={
                                            step == 2
                                                ? "opacity-100"
                                                : "opacity-50"
                                        }
                                    >
                                        <form
                                            onSubmit={createSection}
                                            className="flex flex-col space-y-4"
                                        >
                                            <fieldset
                                                className="flex flex-col mr-auto space-y-2"
                                                disabled={
                                                    step == 2 ? false : true
                                                }
                                            >
                                                {!createNewLevel &&
                                                !createNewCategory ? (
                                                    !createNewSection ? (
                                                        <div className="flex flex-col space-y-4">
                                                            <label
                                                                htmlFor="section"
                                                                className="font-medium text-xl"
                                                            >
                                                                Choose a section
                                                            </label>
                                                            <select
                                                                required
                                                                id="section"
                                                                name="section"
                                                                className={`relative block w-full appearance-none rounded-md border pl-2 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                            >
                                                                {sections?.map(
                                                                    (
                                                                        section
                                                                    ) => (
                                                                        <>
                                                                            <option
                                                                                value={
                                                                                    section?.section
                                                                                }
                                                                                key={
                                                                                    section?._id
                                                                                }
                                                                            >
                                                                                {
                                                                                    section?.section
                                                                                }
                                                                            </option>
                                                                        </>
                                                                    )
                                                                )}
                                                            </select>
                                                            {step == 2 && (
                                                                <div className="flex items-center space-x-4">
                                                                    <button
                                                                        type="submit"
                                                                        className="font-medium text-white bg-red-500 px-4 py-2 rounded-md transition duration-200 hover:opacity-70"
                                                                    >
                                                                        Select
                                                                        section
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="font-medium text-white bg-blue-500 px-4 py-2 rounded-md transition duration-200 hover:opacity-70"
                                                                        onClick={() =>
                                                                            setCreateNewSection(
                                                                                true
                                                                            )
                                                                        }
                                                                    >
                                                                        Create a
                                                                        new
                                                                        section
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex items-center space-x-4 pb-2">
                                                                <div className="flex flex-col space-y-4">
                                                                    <label
                                                                        htmlFor="section"
                                                                        className="font-medium text-xl"
                                                                    >
                                                                        Section
                                                                    </label>
                                                                    <input
                                                                        id="section"
                                                                        name="section"
                                                                        type="text"
                                                                        autoComplete="section"
                                                                        required
                                                                        className={`relative block w-full appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                        placeholder="Enter section name.."
                                                                    />
                                                                </div>
                                                                <div className="flex flex-col space-y-4">
                                                                    <label
                                                                        htmlFor="adviser"
                                                                        className="font-medium text-xl"
                                                                    >
                                                                        Adviser
                                                                    </label>
                                                                    <select
                                                                        required
                                                                        id="adviser"
                                                                        name="adviser"
                                                                        className={`relative block w-full appearance-none rounded-md border pl-4 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                    >
                                                                        {teachers?.map(
                                                                            (
                                                                                teacher
                                                                            ) => (
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
                                                            </div>
                                                            {step == 2 && (
                                                                <button
                                                                    type="submit"
                                                                    className="bg-blue-500 px-5 py-2 mx-auto rounded-md text-white font-medium transition duration-200 hover:opacity-75"
                                                                >
                                                                    Create
                                                                    section
                                                                </button>
                                                            )}
                                                        </>
                                                    )
                                                ) : (
                                                    <>
                                                        <div className="flex items-center space-x-4 pb-2">
                                                            <div className="flex flex-col space-y-4">
                                                                <label
                                                                    htmlFor="section"
                                                                    className="font-medium text-xl"
                                                                >
                                                                    Section
                                                                </label>
                                                                <input
                                                                    id="section"
                                                                    name="section"
                                                                    type="text"
                                                                    autoComplete="section"
                                                                    required
                                                                    className={`relative block w-full appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                    placeholder="Enter section name.."
                                                                />
                                                            </div>
                                                            <div className="flex flex-col space-y-4">
                                                                <label
                                                                    htmlFor="adviser"
                                                                    className="font-medium text-xl"
                                                                >
                                                                    Adviser
                                                                </label>
                                                                <select
                                                                    required
                                                                    id="adviser"
                                                                    name="adviser"
                                                                    className={`relative block w-full appearance-none rounded-md border pl-4 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                                >
                                                                    {teachers?.map(
                                                                        (
                                                                            teacher
                                                                        ) => (
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
                                                        </div>
                                                        {step == 2 && (
                                                            <button
                                                                type="submit"
                                                                className="bg-blue-500 px-5 py-2 mx-auto rounded-md text-white font-medium transition duration-200 hover:opacity-75"
                                                            >
                                                                Create section
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* For Subject */}
                                    <div
                                        className={
                                            step == 3
                                                ? "opacity-100"
                                                : "opacity-0 absolute"
                                        }
                                    >
                                        <form
                                            onSubmit={createSubject}
                                            className="flex flex-col space-y-4"
                                        >
                                            <fieldset
                                                className="flex flex-col space-y-4 mr-auto"
                                                disabled={
                                                    step == 3 ? false : true
                                                }
                                            >
                                                <div className="flex flex-col space-y-4">
                                                    <div className="flex flex-col space-y-2 items-center">
                                                        <label
                                                            htmlFor="subject"
                                                            className="font-medium text-xl"
                                                        >
                                                            Subject
                                                        </label>
                                                        <input
                                                            id="subject"
                                                            name="subject"
                                                            type="text"
                                                            autoComplete="subject"
                                                            required
                                                            className={`relative block w-full appearance-none rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
                                                            placeholder="Enter subject.."
                                                        />
                                                    </div>
                                                    <div className="flex flex-col space-y-2 items-center">
                                                        <label
                                                            htmlFor="teacher"
                                                            className="font-medium text-xl"
                                                        >
                                                            Teacher
                                                        </label>
                                                        <select
                                                            required
                                                            id="teacher"
                                                            name="teacher"
                                                            className={`relative block w-full appearance-none rounded-md border pl-4 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm border-gray-300`}
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
                                                </div>
                                                {step == 3 && (
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-500 px-5 py-2 mx-auto rounded-md text-white font-medium transition duration-200 hover:opacity-75"
                                                    >
                                                        Create subject
                                                    </button>
                                                )}
                                            </fieldset>
                                        </form>
                                    </div>

                                    {/* For Schedules */}
                                    <div
                                        className={
                                            step == 4
                                                ? "opacity-100"
                                                : "opacity-0 absolute"
                                        }
                                    >
                                        <form
                                            onSubmit={createSchedule}
                                            className="flex flex-col space-y-4"
                                        >
                                            <fieldset
                                                className="flex flex-col space-y-4 mr-auto"
                                                disabled={
                                                    step == 4 ? false : true
                                                }
                                            >
                                                <div className="flex flex-col items-center pt-2 w-full space-y-2">
                                                    <h2 className="font-medium text-xl">
                                                        Schedule
                                                    </h2>
                                                    <div className="flex flex-col items-center space-y-2 pt-5">
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
                                                {step == 4 && (
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-500 px-5 py-2 mx-auto rounded-md text-white font-medium transition duration-200 hover:opacity-75"
                                                    >
                                                        Create schedule
                                                    </button>
                                                )}
                                            </fieldset>
                                        </form>
                                    </div>

                                    {/* For adding another schedule */}
                                    {step == 5 && (
                                        <button
                                            type="button"
                                            onClick={() => setStep(4)}
                                            className="bg-blue-500 px-5 py-2 mx-auto rounded-md text-white font-medium transition duration-200 hover:opacity-75"
                                        >
                                            Click to add another schedule for{" "}
                                            {subject?.subject}
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewClass;

// for error border in inputs:
// className={`relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 sm:text-sm ${errorLogin ? `border-red-600` : `border-gray-300`}`}
