import React from 'react';

interface UpgradeButtonProps {
  icon: React.ReactNode;
  label: string;
  cost: number;
  onClick: () => void;
  disabled: boolean;
}

const UpgradeButton: React.FC<UpgradeButtonProps> = ({ icon, label, cost, onClick, disabled }) => {
  return (
    <button
      className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors ${
        disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span className="mr-2">{label}</span>
      <span className="bg-white bg-opacity-25 px-2 py-1 rounded">Cost: {cost}</span>
    </button>
  );
};

export default UpgradeButton;