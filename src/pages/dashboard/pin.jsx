import React from 'react';

const dotStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '50%', // Make it round
  backgroundColor: 'blue', // Set the color to blue
};

function Pin({ size = 5 }) {
  return <div style={{ ...dotStyle, width: size, height: size }} />;
}

export default React.memo(Pin);