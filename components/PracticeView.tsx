
import React, { useState, useEffect, useCallback } from 'react';
import { Problem, FeedbackStatus } from '../types';
import { generateEncouragement, generateHint } from '../services/geminiService';
import { FeedbackCard } from './FeedbackCard';
import { StarIcon } from './icons/StarIcon';

export const PracticeView: React.FC = () => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const generateNewProblem = useCallback(() => {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    setProblem({ num1, num2 });
    setAnswer('');
    setFeedbackStatus('idle');
    setFeedbackMessage('');
  }, []);

  useEffect(() => {
    generateNewProblem();
  }, [generateNewProblem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem || !answer) return;

    const userAnswer = parseInt(answer, 10);
    const correctAnswer = problem.num1 * problem.num2;

    if (userAnswer === correctAnswer) {
      setFeedbackStatus('correct');
      const newScore = score + 1;
      setScore(newScore);
      setFeedbackMessage('Correct! Amazing job!');
      setFeedbackStatus('thinking');
      try {
        const encouragement = await generateEncouragement(newScore);
        setFeedbackMessage(encouragement);
      } catch (error) {
        console.error('Failed to generate encouragement:', error);
        setFeedbackMessage('You are a multiplication superstar! ✨');
      } finally {
        setFeedbackStatus('correct');
      }
    } else {
      setFeedbackStatus('incorrect');
      setFeedbackMessage("Not quite, but don't give up!");
      setFeedbackStatus('thinking');
      try {
        const hint = await generateHint(problem.num1, problem.num2, userAnswer);
        setFeedbackMessage(hint);
      } catch (error) {
        console.error('Failed to generate hint:', error);
        setFeedbackMessage('Try counting, you can do it!');
      } finally {
        setFeedbackStatus('incorrect');
      }
    }
  };

  if (!problem) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-slate-500">Getting ready...</p>
      </div>
    );
  }

  const isAnswerChecked = feedbackStatus === 'correct' || feedbackStatus === 'incorrect';

  return (
    <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg max-w-2xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-700">Practice Time!</h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-white font-bold rounded-full shadow-md">
          <StarIcon className="w-6 h-6" />
          <span>Score: {score}</span>
        </div>
      </div>
      
      <div className="p-8 bg-teal-500 rounded-2xl text-center shadow-inner">
        <p className="text-5xl font-extrabold text-white">
          {problem.num1} &times; {problem.num2} = ?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isAnswerChecked}
          className="w-full sm:w-auto flex-grow text-2xl p-4 border-4 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-200 text-center"
          placeholder="Your Answer"
        />
        <button
          type="submit"
          disabled={isAnswerChecked || !answer}
          className="w-full sm:w-auto px-8 py-5 text-xl font-bold text-white bg-pink-500 rounded-xl shadow-md hover:bg-pink-600 transition-transform duration-200 transform hover:scale-105 disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed"
        >
          Check
        </button>
      </form>

      {feedbackStatus !== 'idle' && (
        <div className="mt-6">
          <FeedbackCard status={feedbackStatus} message={feedbackMessage} />
        </div>
      )}

      {isAnswerChecked && (
        <button
          onClick={generateNewProblem}
          className="w-full mt-6 px-8 py-4 text-xl font-bold text-white bg-teal-500 rounded-xl shadow-md hover:bg-teal-600 transition-transform duration-200 transform hover:scale-105"
        >
          Next Question
        </button>
      )}
    </div>
  );
};
