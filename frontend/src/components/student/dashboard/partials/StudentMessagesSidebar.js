import React, { useState } from 'react';
import useGetStudentConversations from '../../../../hooks/student/useGetStudentConversations';
import toast from 'react-hot-toast';
import Conversations from '../../../common/sidebar/Conversations';
import axios from 'axios';

const StudentMessagesSidebar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState();
    const { loading, conversations } =  useGetStudentConversations();

    const handleSearchConversations = async (e) => {
        e.preventDefault();
        if(!searchInput) return;
        if (searchInput.length < 3) {
            return toast.error("Search term must be atleast 3 characters long");
        }
        try {
            const { data: teacher } = await axios.post("/api/students/search-teachers", {
                searchInput: searchInput
            })
            if (teacher.length > 0) {
                setSearchResults(teacher);
                setSearchInput("");
            } else toast.error("No teacher found. Please refine your search.");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='mx-2 flex flex-col space-y-4 relative'>
           <form onSubmit={handleSearchConversations} className="flex flex-row space-x-2">
                <input 
                    type="text" 
                    className="border border-gray-300 rounded-md text-sm w-full" 
                    placeholder="Search teacher's name.."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} 
                />
                <button 
                    type="submit" 
                    className="text-sm text-white bg-blue-500 h-auto rounded-md px-6 transition duration-200 border border-blue-500 hover:bg-white hover:text-blue-500"
                >
                    Search
                </button>
            </form>

            <Conversations setSearchResults={setSearchResults} conversations={!searchResults ? conversations : searchResults} loading={loading} />
        </div>
    )
}

export default StudentMessagesSidebar;