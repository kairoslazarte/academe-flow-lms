import { useEffect } from "react";

import notificationSound from "../../assets/sounds/notification.mp3";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../contexts/socket/SocketContext";

import toast from "react-hot-toast";

const useListenMessages = ({
	users
}) => {
	const { socket } = useSocketContext();
	const { selectedConversation, messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();

			const { first_name, last_name, image } = users?.find(user => user?._id === newMessage?.senderId)
			const { message } = newMessage;

			if (newMessage?.senderId === selectedConversation?._id) {
				setMessages([...messages, newMessage]);
			} else {
				toast.custom((t) => (
					<div
						className={`${
							t.visible ? 'animate-enter' : 'animate-leave'
						} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
					>
						<div className="flex-1 w-0 p-4">
							<div className="flex items-start">
								<div className="flex-shrink-0 pt-0.5">
									<img
										className="h-10 w-10 rounded-full"
										src={image ? image : "../static/images/default_user.png"}
										alt=""
									/>
								</div>
							<div className="ml-3">
								<p></p>
								<p className="text-sm font-medium text-gray-900">
									<span>{first_name} {last_name}</span>
								</p>
								<p className="mt-1 text-sm text-gray-500">
									{message}
								</p>
							</div>
							</div>
						</div>
						<div className="flex border-l border-gray-200">
							<button
							onClick={() => toast.dismiss(t.id)}
							className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							>
							Close
							</button>
						</div>
					</div>
				))
			}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};

export default useListenMessages;