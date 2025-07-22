
import React from 'react';
import { FeedbackStatus } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface FeedbackCardProps {
  status: FeedbackStatus;
  message: string;
}

const LoadingSpinner: React.FC = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);


export const FeedbackCard: React.FC<FeedbackCardProps> = ({ status, message }) => {
  const statusConfig = {
    correct: {
      bgColor: 'bg-green-100',
      borderColor: 'border-green-400',
      textColor: 'text-green-800',
      icon: <CheckCircleIcon className="w-8 h-8 text-green-500" />,
      title: 'Awesome!'
    },
    incorrect: {
      bgColor: 'bg-red-100',
      borderColor: 'border-red-400',
      textColor: 'text-red-800',
      icon: <XCircleIcon className="w-8 h-8 text-red-500" />,
      title: 'Keep Trying!'
    },
    thinking: {
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800',
      icon: <SparklesIcon className="w-8 h-8 text-blue-500" />,
      title: 'Thinking...'
    },
     idle: {
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-400',
      textColor: 'text-gray-800',
      icon: null,
      title: ''
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`p-4 rounded-xl border-l-8 ${config.bgColor} ${config.borderColor} shadow-md animate-fade-in`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        <div className="ml-3">
          <h3 className={`text-lg font-bold ${config.textColor}`}>{config.title}</h3>
          <div className={`mt-2 text-md ${config.textColor}`}>
            {status === 'thinking' ? <div className="flex items-center gap-2"><LoadingSpinner /> <span>A special message is on its way...</span></div> : <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

