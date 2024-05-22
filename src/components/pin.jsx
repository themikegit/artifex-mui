import React from 'react';

const Pin = ({ size = 20, color = '#007cbf', strokeColor = '#ffffff', opacity = 0.75 }) => {
  const adjustedSize = size * 1.75; // Base adjustment
  const strokeWidth = 1; // Fixed stroke width

  return (
    <svg
      height={adjustedSize}
      viewBox="0 0 24 24"
      style={{
        cursor: 'pointer',
        opacity: opacity,
      }}
    >
      <circle cx="12" cy="12" r="10" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
    </svg>
  );
};

export default Pin;
