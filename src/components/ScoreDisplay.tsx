import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="text-4xl font-bold mb-8 bg-white bg-opacity-75 text-purple-600 px-6 py-3 rounded-lg shadow-lg">
      Score: {score.toLocaleString()}
    </div>
  );
};

export default ScoreDisplay;