
// Square.tsx
import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  let circleColor = '';
  if (value === 'red') {
    circleColor = 'red-circle';
  } else if (value === 'yellow') {
    circleColor = 'yellow-circle';
  }

  return (
      <div className="square" onClick={onClick}>
        {value && <div className={circleColor} />}
      </div>
  );
};

export default Square;

