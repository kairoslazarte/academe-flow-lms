import React from "react";
import Conversation from "./Conversation";

const Conversations = ({
    setSearchResults,
    conversations,
    loading
}) => {
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations.map((conversation, idx) => (
                <Conversation 
                    key={conversation._id}
                    conversation={conversation} 
                    setSearchResults={setSearchResults}
                    lastIdx={idx === conversations.length - 1}
                />
            ))}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    )
}

export default Conversations;