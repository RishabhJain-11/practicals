import React from 'react'
import { useState } from 'react';

const Message = () => {
    const [message, setMessage] = useState("");
    const [displayedMessage, setDisplayedMessage] = useState("");

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleDisplayMessage = () => {
        setDisplayedMessage(message);
        setMessage("");
    };

    return (
        <div>
            <h1>Ok here we go</h1>
            <input type="text" value={message} onChange={handleMessageChange} />
            <button onClick={handleDisplayMessage}>Display Message</button>
            {displayedMessage && <p>Displayed Message: {displayedMessage}</p>}
        </div>
    )
}

export default Message