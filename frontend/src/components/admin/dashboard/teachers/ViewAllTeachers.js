import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable, { defaultThemes } from "react-data-table-component";
import "react-data-grid/lib/styles.css";
import TeacherDetailsSlideover from "./TeacherDetailsSlideover";
import EditTeacherAccount from "./EditTeacherAccount";
import Loader from "../../../reusable/Loader";

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

const ViewAllTeachers = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [teacherDetails, setTeacherDetails] = useState(null);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [onClickEditBtn, setOnClickEditBtn] = useState(false)

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
            name: "Phone number",
            selector: (row) => row.phone,
        },
        {
            name: "Email address",
            selector: (row) => row.email,
        },
        {
            name: "Birth Date",
            selector: (row) => new Date(row.birthdate).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})
        },
        {
            cell: (row) => (
                <button
                    className="text-white bg-yellow-400 rounded-md mr-2 p-2 w-full transition duration-200 hover:opacity-75"
                    id={row._id}
                    onClick={() => 
                        setOnClickEditBtn(
                            (open) => !open,
                            setTeacherDetails(
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
                            setTeacherDetails(
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

    const getAllTeachers = async () => {
        try {
            const { data } = await axios.get("/api/admins/get-teachers");
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTeachers();
    }, [setData]);

    const handleDeleteBtn = async (e) => {
        var selectedRowIDs = [];
        selectedRows.map((selectedRow) => selectedRowIDs.push(selectedRow._id));
        if (window.confirm(`Are you sure you want to delete?`)) {
            await axios.post("/api/admins/delete-teacher", {
                ids: selectedRowIDs,
            });
            getAllTeachers();
        }
    };

    return (
        !onClickEditBtn ? (
            <>
                <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
                    <div className="my-auto h-full">
                        <div className="relative flex flex-row">
                            <h1 className="font-bold text-4xl">
                                View all Teachers:
                            </h1>
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
                            {data ? (
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    customStyles={customStyles}
                                    selectableRows
                                    onSelectedRowsChange={handleRowSelected}
                                    clearSelectedRows={toggleCleared}
                                    pagination
                                />
                            ) : (
                                <Loader />
                            )}
                        </div>
                    </div>
                </div>
                <TeacherDetailsSlideover
                    open={open}
                    setOpen={setOpen}
                    teacherDetails={teacherDetails}
                />
            </>
        ) : (
            <EditTeacherAccount teacherDetails={teacherDetails} />
        )
    );
};

export default ViewAllTeachers;
