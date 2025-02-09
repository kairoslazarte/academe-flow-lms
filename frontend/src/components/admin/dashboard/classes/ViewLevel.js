import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ViewAllClasses from "./ViewAllClasses";
import SectionDetailsSlideover from "./SectionDetailsSlideover";
import EditSectionDetails from "./EditSectionDetails";

const ViewLevel = ({ level }) => {
    const [goBack, setGoBack] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [sections, setSections] = useState();
    const [teachers, setTeachers] = useState();
    const [selectAllRows, setSelectAllRows] = useState(false);

    const [open, setOpen] = useState(false);
    const [sectionDetails, setSectionDetails] = useState();

    const [onClickEditBtn, setOnClickEditBtn] = useState(false)

    const handleRowSelected = (id) => {
        const findIdx = selectedRows.indexOf(id);

        if (findIdx > -1) {
            setSelectedRows([
                ...selectedRows.slice(0, findIdx),
                ...selectedRows.slice(findIdx + 1),
            ]);
        } else {
            setSelectedRows((existingArr) => [...existingArr, id]);
        }
    };

    const getLevel = async () => {
        try {
            const { data } = await axios.post("/api/admins/get-level", {
                levelID: level.levelID,
            });
            setSections(data.sections);
            setTeachers(data.teachers);
        } catch (error) {
            console.log(error);
        }
    };

    var allSectionsID = [];

    useEffect(() => {
        getLevel();

        if (selectAllRows) {
            let allSections = document.getElementsByClassName(
                "js-sections-checkbox"
            );
            for (let i = 0; i < allSections.length; i++) {
                allSectionsID.push(allSections[i].value);
            }
            setSelectedRows(allSectionsID)
        } else {
            allSectionsID = [];
            setSelectedRows([]);
        }
    }, [setSections, setTeachers, selectAllRows]);

    const handleDeleteBtn = async (e) => {
        if (window.confirm(`Are you sure you want to delete?`)) {
            await axios.post("/api/admins/delete-sections", {
                ids: selectedRows,
            });
            getLevel();
        }
    };

    return !goBack ? (
       !onClickEditBtn ? (
            <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
                <div className="my-auto h-full">
                    <button
                        className="bg-red-700 px-4 py-2 text-white rounded-md mb-5 hover:opacity-70 transition duration-200"
                        onClick={() => setGoBack(true)}
                    >
                        Go back
                    </button>
                    <h1 className="font-bold text-5xl uppercase">
                        {level?.level}:
                    </h1>
                    <h2 className="pt-2 italic text-xl">{sections?._id}</h2>
                    <div className="pt-4">
                        {sections && (
                            <div>
                                <div className="flex flex-col relative">
                                    <div className="relative flex flex-row">
                                        <h1 className="font-semibold text-xl">
                                            Sections:
                                        </h1>
                                        <div className="flex justify-end absolute right-0 top-0">
                                            {selectedRows.length > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={handleDeleteBtn}
                                                    className="bg-red-700 text-white px-4 py-2 rounded-md"
                                                >
                                                    Delete {selectedRows.length}{" "}
                                                    item
                                                    {selectedRows.length > 1 && "s"}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative overflow-x-auto pt-6">
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th className="px-6 py-3">
                                                        <input
                                                            type="checkbox"
                                                            className="border border-gray-400 rounded-sm"
                                                            onChange={() =>
                                                                setSelectAllRows(
                                                                    (checked) =>
                                                                        !checked
                                                                )
                                                            }
                                                            checked={selectAllRows ? true : false}
                                                        />
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
                                                        Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Adviser
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Subjects
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    ></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sections?.map((section) => (
                                                    <tr
                                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                        key={section?._id}
                                                    >
                                                        <th className="px-6 py-3">
                                                            {selectAllRows ? (
                                                                <input
                                                                    type="checkbox"
                                                                    onChange={(e) =>
                                                                        setSelectAllRows(false, handleRowSelected(section?._id))
                                                                    }
                                                                    checked
                                                                    value={section?._id}
                                                                    className="js-sections-checkbox border border-gray-400 rounded-sm"
                                                                />
                                                            ) : (
                                                                <input
                                                                    type="checkbox"
                                                                    onChange={(e) =>
                                                                        handleRowSelected(
                                                                            section?._id
                                                                        )
                                                                    }
                                                                    value={section?._id}
                                                                    className="js-sections-checkbox border border-gray-400 rounded-sm"
                                                                />
                                                            )}
                                                            
                                                        </th>
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {section?._id}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {section?.section}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {teachers?.map(
                                                                (teacher) =>
                                                                    section?.adviser ==
                                                                        teacher?._id &&
                                                                    teacher?.first_name +
                                                                        " " +
                                                                        teacher?.last_name
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {section?.subjects?.map(
                                                                (subject) =>
                                                                    subject.subject +
                                                                    ", "
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex flex-row space-x-4">
                                                                <button
                                                                    className="text-white bg-yellow-400 rounded-md py-1 px-2 w-auto transition duration-200 hover:opacity-75" 
                                                                    onClick={() => 
                                                                        setOnClickEditBtn(
                                                                            (open) => !open,
                                                                            setSectionDetails(section)
                                                                        )
                                                                    }  
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.5rem]">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </button>

                                                                <button 
                                                                    className="text-white bg-blue-500 rounded-md px-4 py-2 mr-4 text-sm w-full transition duration-200 hover:opacity-75"
                                                                    onClick={() =>
                                                                        setOpen(
                                                                            (open) => !open,
                                                                            setSectionDetails(section)
                                                                        )
                                                                    }
                                                                >
                                                                    View Details
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {open && (
                    <SectionDetailsSlideover
                        open={open}
                        setOpen={setOpen}
                        sectionDetails={sectionDetails?._id}
                    />
                )}         
            </div>
       ) : (
            <EditSectionDetails sectionDetails={sectionDetails} />
       )
    ) : (
        <ViewAllClasses />
    );
};

export default ViewLevel;
