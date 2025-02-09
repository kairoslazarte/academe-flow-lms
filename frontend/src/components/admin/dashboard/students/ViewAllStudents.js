import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable, { defaultThemes } from "react-data-table-component";
import "react-data-grid/lib/styles.css";
import StudentDetailsSlideover from "./StudentDetailsSlideover";
import EditStudentAccount from "./EditStudentAccount";

const customStyles = {
    header: {
        style: {
            minHeight: "56px",
        },
    },
    headRow: {
        style: {
            borderTopStyle: "solid",
            borderTopWidth: "1px",
            borderTopColor: defaultThemes.default.divider.default,
        },
    },
    headCells: {
        style: {
            "&:not(:last-of-type)": {
                borderRightStyle: "solid",
                borderRightWidth: "1px",
                borderRightColor: defaultThemes.default.divider.default,
            },
        },
    },
    cells: {
        style: {
            "&:not(:last-of-type)": {
                borderRightStyle: "solid",
                borderRightWidth: "1px",
                borderRightColor: defaultThemes.default.divider.default,
            },
        },
    },
};

const ViewAllStudents = () => {
    const [selectedRows, setSelectedRows] = useState([])
    const [toggleCleared, setToggleCleared] = useState(false)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState();
    const [onClickEditBtn, setOnClickEditBtn] = useState(false)
    const [studentDetails, setStudentDetails] = useState(null)
    const [sortBy, setSortBy] = useState("All")
    const [searchStudentInput, setSearchStudentInput] = useState(null)

    const handleRowSelected = useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const columns = [
        {
            cell: (row) => (
                row?.image 
                ? (
                    <img
                        className="h-24 w-24 rounded-full object-cover"
                        src={row?.image}
                    />
                ) : (
                    <img
                        className="h-24 w-24 rounded-full object-cover"
                        src="\static\images\default_user.png"
                    />
                )
            ),
            width: "150px",
        },
        {
            name: "First name",
            selector: (row) => row.first_name,
            sortable: true,
        },
        {
            name: "Middle name",
            selector: (row) => row.middle_name,
        },
        {
            name: "Last name",
            selector: (row) => row.last_name,
            sortable: true,
        },
        {
            name: "Email address",
            selector: (row) => row.email,
        },
        {
            name: "Category",
            selector: (row) => row.category,
        },
        {
            name: "Level",
            selector: (row) => row.level,
        },
        {
            name: "Section",
            selector: (row) => row.section,
        },
        {
            cell: (row) => (
                <button
                    className="text-white bg-yellow-400 rounded-md mr-2 p-2 w-full transition duration-200 hover:opacity-75"
                    id={row._id}
                    onClick={() => 
                        setOnClickEditBtn(
                            (open) => !open,
                            setStudentDetails(
                                data.find(({ _id }) => _id === row._id)
                            )
                        )
                    }
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-auto h-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
            ),
            width: "50px",
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            cell: (row) => (
                <button
                    className="text-white bg-blue-500 rounded-md px-4 py-3 mr-4 text-sm w-full transition duration-200 hover:opacity-75"
                    id={row._id}
                    onClick={() =>
                        setOpen(
                            (open) => !open,
                            setStudentDetails(
                                data.find(({ _id }) => _id === row._id)
                            )
                        )
                    }
                >
                    View Details
                </button>
            ),
            width: "150px",
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const getAllStudents = async () => {
        try {
            const { data } = await axios.get("/api/admins/get-students");
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const searchStudents = async () => {
        try {
            const { data } = await axios.post("/api/admins/search-students", {
                searchInput: searchStudentInput
            })
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllStudents();
    }, [setData]);

    const handleDeleteBtn = async (e) => {
        var selectedRowIDs = [];
        selectedRows.map((selectedRow) => selectedRowIDs.push(selectedRow._id));
        if (window.confirm(`Are you sure you want to delete?`)) {
            await axios.post("/api/admins/delete-student", {
                ids: selectedRowIDs,
            });
            getAllStudents();
        }
    };
    return (
        !onClickEditBtn ? (
            <>
                <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
                    <div className="my-auto h-full">
                        <div className="relative flex flex-row">
                            <div className="flex flex-col space-y-4">
                                <h1 className="font-bold text-4xl">
                                    View all Students:
                                </h1>
                                <div className="flex flex-row space-x-2 items-center">
                                    <input 
                                        type="text" 
                                        className="border border-gray-300 rounded-md text-sm" 
                                        placeholder="Search student's name.."
                                        onChange={(e) => setSearchStudentInput(e.target.value)} 
                                    />
                                    <button 
                                        type="button" 
                                        className="text-sm text-white bg-blue-500 h-full rounded-md px-6 transition duration-200 border border-blue-500 hover:bg-white hover:text-blue-500"
                                        onClick={searchStudents}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end absolute right-0 top-0">
                                {selectedRows.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleDeleteBtn}
                                        className="bg-red-700 text-white px-4 py-2 rounded-md"
                                    >
                                        Delete {selectedRows.length} item
                                        {selectedRows.length > 1 && "s"}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="pt-6">
                            {data && (
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    customStyles={customStyles}
                                    selectableRows
                                    onSelectedRowsChange={handleRowSelected}
                                    clearSelectedRows={toggleCleared}
                                    pagination
                                />
                            )}
                        </div>
                    </div>
                </div>

                <StudentDetailsSlideover
                    open={open}
                    setOpen={setOpen}
                    studentDetails={studentDetails}
                />
            </>
        ) : (
            <EditStudentAccount studentDetails={studentDetails} />
        )
    );
};

export default ViewAllStudents;
