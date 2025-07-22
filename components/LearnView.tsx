
import React, { useState } from 'react';

const NumberButton: React.FC<{ num: number; onClick: (num: number) => void; isSelected: boolean }> = ({ num, onClick, isSelected }) => (
  <button
    onClick={() => onClick(num)}
    className={`w-12 h-12 rounded-lg text-lg font-bold transition-all duration-200 ${
      isSelected
        ? 'bg-fuchsia-500 text-white scale-110 shadow-lg'
        : 'bg-white text-fuchsia-500 hover:bg-fuchsia-100'
    }`}
  >
    {num}
  </button>
);

export const LearnView: React.FC = () => {
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const range = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleNum1Select = (n: number) => setNum1(n === num1 ? null : n);
  const handleNum2Select = (n: number) => setNum2(n === num2 ? null : n);

  return (
    <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-slate-700 mb-2">Multiplication Table</h2>
      <p className="text-center text-slate-500 mb-8">Pick two numbers to see the magic of multiplication!</p>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        <div className="w-full lg:w-auto">
          <h3 className="text-xl font-bold text-fuchsia-600 mb-4 text-center">First Number</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {range.map((n) => <NumberButton key={n} num={n} onClick={handleNum1Select} isSelected={num1 === n} />)}
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <h3 className="text-xl font-bold text-teal-600 mb-4 text-center">Second Number</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {range.map((n) => <NumberButton key={n} num={n} onClick={handleNum2Select} isSelected={num2 === n} />)}
          </div>
        </div>
      </div>
      
      {num1 !== null && num2 !== null && (
        <div className="mt-8 p-6 bg-amber-100 border-4 border-dashed border-amber-300 rounded-2xl text-center animate-fade-in">
            <p className="text-5xl font-extrabold text-amber-600">
                {num1} &times; {num2} = {num1 * num2}
            </p>
        </div>
      )}

      <div className="mt-8 overflow-x-auto">
        <div className="grid grid-cols-13 gap-1 p-4 bg-slate-100 rounded-xl w-max mx-auto">
          {['', ...range].map((header, i) => (
            <div key={`h-${i}`} className="w-14 h-14 flex items-center justify-center font-extrabold text-slate-600">
              {header}
            </div>
          ))}
          {range.map((row) => (
            <React.Fragment key={`row-${row}`}>
              <div className="w-14 h-14 flex items-center justify-center font-extrabold text-slate-600">{row}</div>
              {range.map((col) => {
                const isHighlighted = (row === num1 && col === num2) || (row === num2 && col === num1);
                const isAxisHighlighted = row === num1 || col === num2;
                return (
                  <div
                    key={`${row}-${col}`}
                    className={`w-14 h-14 flex items-center justify-center rounded-lg font-bold text-lg transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-pink-500 text-white scale-110 shadow-xl z-10'
                        : isAxisHighlighted && num1 !== null && num2 !== null
                        ? 'bg-fuchsia-200'
                        : 'bg-white'
                    }`}
                  >
                    {row * col}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add a simple grid-cols-13 utility for the table layout
const style = document.createElement('style');
style.innerHTML = `
  .grid-cols-13 {
    grid-template-columns: repeat(13, minmax(0, 1fr));
  }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

