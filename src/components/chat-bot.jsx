import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { dayjs } from '@/lib/dayjs';

import { MessageAdd } from './message-add';
import { MessageBox } from './message-box';

export function ChatBot({ path }) {
  const baseUrl = import.meta.env.VITE_SERVER_HOST;

  const messagesRef = useRef(null);
  const [messages, setMessages] = useState([]);

  function getCSRFToken() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();

      if (cookie.startsWith('csrftoken=')) {
        return cookie.substring('csrftoken='.length, cookie.length);
      }
    }

    return null;
  }

  const getBotResponse = (query) => {
    const data = {
      query: query,
      s3_filepath: path,
      media_type: 'video',
    };
    fetch(`${baseUrl}chatbot/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })

      .then((data) => {
        setMessages((prevMsg) => [
          ...prevMsg,
          {
            id: 'MSsG-001',
            content: data.response,
            author: {
              id: 'USR-001',
              name: 'Assistant Artie',
              avatar: '/assets/avatar2.png',
              email: 'john.doe@example.com',
            },
            createdAt: new Date().toISOString(),
          },
        ]);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleSendMessage = (t, c) => {
    setMessages([
      ...messages,
      {
        id: 'MSG-001',
        content: c,
        author: {
          id: 'USR-001',
          name: 'Joe Michel',
          avatar: '/assets/avatar.png',
          email: 'john.doe@example.com',
        },
        createdAt: new Date().toISOString(),
      },
    ]);
    getBotResponse(c);
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        id: 'MSG-001',
        content: 'Hello Fake! Im Artie, your personal assistant. Im here to assist you. Feel free to ask me anything.',
        author: {
          id: 'USR-001',
          name: 'Assistant Artie',
          avatar: '/assets/avatar2.png',
          email: 'john.doe@example.com',
        },
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);
  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 }}>
      {/* <ThreadToolbar thread={thread} /> */}
      <Stack ref={messagesRef} spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 3 }}>
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </Stack>
      <MessageAdd onSend={handleSendMessage} />
    </Box>
  );
}
