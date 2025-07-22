
import React from 'react';
import { ViewType } from '../types';
import { StarIcon } from './icons/StarIcon';

interface HeaderProps {
  activeView: ViewType;
  setView: (view: ViewType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setView }) => {
  const getButtonClasses = (view: ViewType): string => {
    const baseClasses = 'px-6 py-2 rounded-full text-lg font-bold transition-all duration-300 transform flex items-center gap-2';
    if (activeView === view) {
      return `${baseClasses} bg-pink-500 text-white shadow-lg scale-105`;
    }
    return `${baseClasses} bg-white text-pink-500 hover:bg-pink-100 hover:scale-105`;
  };

  return (
    <header className="bg-white/70 backdrop-blur-sm p-6 rounded-3xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white">
            <StarIcon className="w-8 h-8"/>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Nia's Multiplication Adventure
          </h1>
        </div>
        <nav className="flex space-x-4">
          <button onClick={() => setView(ViewType.Learn)} className={getButtonClasses(ViewType.Learn)}>
            Learn
          </button>
          <button onClick={() => setView(ViewType.Practice)} className={getButtonClasses(ViewType.Practice)}>
            Practice
          </button>
        </nav>
      </div>
    </header>
  );
};
