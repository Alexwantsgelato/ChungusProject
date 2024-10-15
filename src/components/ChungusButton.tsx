import React from 'react';

interface ChungusButtonProps {
  onClick: () => void;
}

const ChungusButton: React.FC<ChungusButtonProps> = ({ onClick }) => {
  return (
    <button
      className="w-48 h-48 rounded-full overflow-hidden transition-transform transform hover:scale-105 active:scale-95 focus:outline-none shadow-lg"
      onClick={onClick}
    >
      <img
        src="https://i.kym-cdn.com/entries/icons/original/000/027/843/chungcover.jpg"
        alt="Big Chungus"
        className="w-full h-full object-cover"
      />
    </button>
  );
};

export default ChungusButton;