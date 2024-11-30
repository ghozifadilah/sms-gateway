import React, { useEffect, useState, useRef } from 'react';

const WebSocketComponent = ({ data, onMessage }) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Create a WebSocket connection only once
    const ws = new WebSocket('ws://103.146.203.250:5000');
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      setMessages(prevMessages => [...prevMessages, message]);
      if (onMessage) {
        onMessage(message); // Pass the message to the parent component
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from the WebSocket server');
      onMessage('disconnected');
   
    };

    ws.onerror = (error) => {
      onMessage('disconnected');
      // console.log('WebSocket error:', error);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {

    if (socketRef.current && data !== null) {
     
      socketRef.current.send(data);
    }
  }, [data]);

  return null; // WebSocketComponent doesn't need to render anything
};

export default WebSocketComponent;
