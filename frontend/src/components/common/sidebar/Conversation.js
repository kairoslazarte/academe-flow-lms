

import React, { useContext } from "react";
import { useSocketContext } from "../../../contexts/socket/SocketContext";
import useConversation from "../../../zustand/useConversation";
import { TeacherLoginContext } from "../../../contexts/teacher/TeacherLoginContexts";
import { useUsersContext } from "../../../contexts/users/UsersContext";

const Conversation = ({ conversation, lastIdx, setSearchResults }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const { users } = useUsersContext();
    const { first_name, last_name, image } = users?.find(user => user?._id === conversation?._id);

    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);


    const handleOnClickConversation = () => {
        setSelectedConversation(conversation);
        setSearchResults(null);
    }

    return (
        <>
            <div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
                onClick={handleOnClickConversation}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-14 rounded-full'>
                        <img 
                            src={!image ? "../static/images/default_user.png" : image} 
                            alt='user avatar' 
                            className='rounded-full w-14 h-14 bg-white' 
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-black'>{first_name} {last_name}</p>
                        {/* <span className='text-xl'>{emoji}</span> */}
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    )
}

export default Conversation;