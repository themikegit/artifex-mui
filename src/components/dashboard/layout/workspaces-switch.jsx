'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import { CityContext } from '@/contexts/selected-city';
import { usePopover } from '@/hooks/use-popover';

import { workspaces, WorkspacesPopover } from './workspaces-popover';

export function WorkspacesSwitch() {
  const popover = usePopover();
  const workspace = workspaces[0];
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(workspaces[0]);
  const { setSelectedCityContext } = React.useContext(CityContext);

  const handleChange = (city) => {
    setSelectedWorkspace(city);
    setSelectedCityContext(city);
    popover.handleClose();
  };

  return (
    <React.Fragment>
      <Stack
        direction="row"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        spacing={2}
        sx={{
          alignItems: 'center',
          border: '1px solid var(--Workspaces-border-color)',
          borderRadius: '12px',
          cursor: 'pointer',
          p: '4px 8px',
        }}
      >
        <div style={{ backgroundColor: 'var(--mui-palette-primary-main)', borderRadius: '5px', padding: '8px' }}>
          {selectedWorkspace.code}
        </div>
        {/* <Avatar src={workspace.avatar} variant="rounded" /> */}
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography color="var(--Workspaces-title-color)" variant="caption">
            Selected Town
          </Typography>
          <Typography color="var(--Workspaces-name-color)" variant="subtitle2">
            {selectedWorkspace.name}
          </Typography>
        </Box>
        <CaretUpDownIcon color="var(--Workspaces-expand-color)" fontSize="var(--icon-fontSize-sm)" />
      </Stack>
      <WorkspacesPopover
        anchorEl={popover.anchorRef.current}
        onChange={handleChange}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </React.Fragment>
  );
}
