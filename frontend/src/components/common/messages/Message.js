import React from "react";
import { useAuthContext } from "../../../contexts/auth/AuthContext";
import useConversation from "../../../zustand/useConversation";
import { extractTime } from "../../../utils/extractTime";

const Message = ({ message }) => {
    const { authUser } = useAuthContext()
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.image : selectedConversation?.image;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img 
                        alt={authUser?.full_name} 
                        src={!profilePic ? "../static/images/default_user.png" : profilePic} 
                        className="bg-white"
                    />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-900 pt-1'>{formattedTime}</div>
		</div>
	);
};
export default Message;