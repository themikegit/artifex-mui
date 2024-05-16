'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';

const user = {
  id: 'USR-000',
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  email: 'sofia@devias.io',
};

export function MessageAdd({ disabled = false, onSend }) {
  const [content, setContent] = React.useState('');
  const fileInputRef = React.useRef(null);

  const handleChange = React.useCallback((event) => {
    setContent(event.target.value);
  }, []);

  const handleSend = React.useCallback(() => {
    // if (!å) {
    //   return;
    // }

    onSend?.('text', content);
    setContent('');
  }, [content, onSend]);

  const handleKeyUp = React.useCallback(
    (event) => {
      if (event.code === 'Enter') {
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '0 0 auto', px: 3, py: 1 }}>
      <Avatar src={user.avatar} sx={{ display: { xs: 'none', sm: 'inline' } }} />
      <OutlinedInput
        disabled={disabled}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Ask Artie"
        sx={{ flex: '1 1 auto' }}
        value={content}
      />
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Tooltip title="Send">
          <span>
            <IconButton
              color="primary"
              disabled={!content || disabled}
              onClick={handleSend}
              sx={{
                bgcolor: 'var(--mui-palette-primary-main)',
                color: 'var(--mui-palette-primary-contrastText)',
                '&:hover': { bgcolor: 'var(--mui-palette-primary-dark)' },
              }}
            >
              <PaperPlaneTiltIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
      <input hidden ref={fileInputRef} type="file" />
    </Stack>
  );
}
