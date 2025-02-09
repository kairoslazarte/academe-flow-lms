import { useEffect } from "react"
import { TiMessages } from "react-icons/ti";
import useConversation from "../../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../../contexts/auth/AuthContext";

const MessagesContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                <div className="h-[40rem] sm:h-[40rem]">
                    <NoChatSelected />
                </div>
            ) : (
                <div className="bg-yellow-50 h-[30rem] sm:h-[40rem] flex flex-col rounded-md shadow">
                    {/* Header */}
                    <div className='bg-green-300 rounded-t-md px-4 py-2 mb-2'>
                        <span className='label-text text-gray-900'>To:</span>{" "}
                        <span className='text-gray-900 font-bold'>{selectedConversation?.full_name}</span>
                    </div>
                    
                    <Messages />
                    <MessageInput />
                </div>
            )}
        </div>
	);
}

export default MessagesContainer;


const NoChatSelected = () => {
    const { authUser } = useAuthContext();

    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser?.full_name}❄</p>
                <p>Select or search a conversation to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};