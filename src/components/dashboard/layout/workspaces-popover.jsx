'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const workspaces = [
  {
    name: 'Mashpee',
    code: 'MA',
    min_lat: '41.620202743089294',
    min_lon: '-70.51879547119142',
    max_lat: '41.67978348076019',
    max_lon: '-70.44120452880827',
    ini_lon: '-70.48',
    ini_lat: '41.65',
  },
  {
    name: 'Tulsa',
    code: 'OK',
    min_lat: '35.9695',
    min_lon: '-96.9238',
    max_lat: '36.2528',
    max_lon: '-95.8141',
    ini_lon: '-95.9928',
    ini_lat: '36.1540',
  },
];

export function WorkspacesPopover({ anchorEl, onChange, onClose, open = false }) {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '250px' } } }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      {workspaces.map((workspace) => (
        <MenuItem
          key={workspace.name}
          onClick={() => {
            onChange?.(workspace);
          }}
        >
          <ListItemAvatar>
            {/* <Avatar src={workspace.avatar} sx={{ '--Avatar-size': '32px' }} variant="rounded" /> */}
          </ListItemAvatar>
          {workspace.name}
        </MenuItem>
      ))}
    </Menu>
  );
}
