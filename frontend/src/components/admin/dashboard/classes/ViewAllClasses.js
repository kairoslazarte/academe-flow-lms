import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios';
import DataTable, { defaultThemes } from 'react-data-table-component'
import 'react-data-grid/lib/styles.css';
import ViewLevel from './ViewLevel';
import { Helmet } from "react-helmet";

const customStyles = {
    header: {
        style: {
            minHeight: '56px',
        },
    },
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: defaultThemes.default.divider.default,
        },
    },
    headCells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
            },
        },
    },
    cells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
            },
        },
    },
}

const ViewAllClasses = () => {
    const [selectedRows, setSelectedRows] = useState([])
	const [toggleCleared, setToggleCleared] = useState(false)
    const [levelDetails, setLevelDetails] = useState(null)
    const [data, setData] = useState()

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows)
    }, [])

    const columns = [
        {
            name: 'ID',
            selector: row => row._id,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
        },
        {
            name: 'Levels',
            selector: row => row.levels.map(
            (level) => 
                (
                    <div className='flex flex-col w-full'>
                        <button 
                            key={level.levelID}
                            className="text-left text-blue-700 transition duration-200 hover:text-red-700 cursor-pointer hover:underline font-medium hover:font-bold"
                            onClick={() => setLevelDetails(level)}
                        >
                            {level.level}
                        </button> 
                    </div>
                )
            ),
        },
    ]

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/admins/get-categories')
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [setData])

    const handleDeleteBtn = async(e) => {
        var selectedRowIDs = []
        selectedRows.map(selectedRow => (
            selectedRowIDs.push(selectedRow._id)    
        ))
        if (window.confirm(`EVERY LEVELS, SECTIONS, SUBJECTS AND SCHEDULES WILL ALSO BE DELETED OF ${selectedRows.map((selectedRow) => selectedRow.category + ', ')}. ARE YOU SURE YOU WANT TO CONTINUE?`)) {
            await axios.post('/api/admins/delete-all-classes', {
                ids: selectedRowIDs
            })
            getAllCategories()
        }
    }

    return (
        !levelDetails ? (
            <>
                <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
                    <div className='my-auto h-full'>
                        <div className='relative flex flex-row'>
                            <h1 className='font-bold text-4xl'>View all Classes:</h1>
                            <div className='flex justify-end absolute right-0 top-0'>
                                {selectedRows.length > 0 && (
                                    <button type='button' onClick={handleDeleteBtn} className='bg-red-700 text-white px-4 py-2 rounded-md'>
                                        Delete {selectedRows.length} item{selectedRows.length > 1 && 's'}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className='pt-6'>
                            <Helmet>
                                <style type="text/css">
                                    {`
                                        .rdt_TableCell {
                                            width: 100%;
                                        }

                                        .rdt_TableCell div {
                                            width: 100%;
                                        }
                                    `}
                                </style>
                            </Helmet>
                            {data && 
                                (
                                    <DataTable 
                                        columns={columns} 
                                        data={data} 
                                        customStyles={customStyles} 
                                        selectableRows
                                        onSelectedRowsChange={handleRowSelected}
                                        clearSelectedRows={toggleCleared}    
                                        pagination 
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <ViewLevel level={levelDetails} />
        )
    )
}

export default ViewAllClasses