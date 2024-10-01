import React from 'react';
import { config1, config2, config3 } from '../types/puzzle';

interface ConfigPageProps {
  onSelectConfig: (config: any) => void;
}

const ConfigPage: React.FC<ConfigPageProps> = ({ onSelectConfig }) => {
  return (
    <div className="relative min-h-1/2 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-8">Select Configuration</h2>
      <div className="flex flex-row space-x-10">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://cdn.pixabay.com/photo/2012/04/23/15/20/one-38484_1280.png"
            alt="Config 1"
            className="w-40 h-40 cursor-pointer rounded-lg shadow-md transition-transform transform hover:scale-105 object-cover"
            onClick={() => onSelectConfig(config1)}
          />
          <p className="mt-4 text-lg">Configuration 1</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6947/6947566.png"
            alt="Config 2"
            className="w-40 h-40 cursor-pointer rounded-lg shadow-md transition-transform transform hover:scale-105 object-cover"
            onClick={() => onSelectConfig(config2)}
          />
          <p className="mt-4 text-lg">Configuration 2</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Eo_circle_red_white_number-3.svg/1024px-Eo_circle_red_white_number-3.svg.png"
            alt="Config 3"
            className="w-40 h-40 cursor-pointer rounded-lg shadow-md transition-transform transform hover:scale-105 object-cover"
            onClick={() => onSelectConfig(config3)}
          />
          <p className="mt-4 text-lg">Configuration 3</p>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
