
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { LearnView } from './components/LearnView';
import { PracticeView } from './components/PracticeView';
import { ViewType } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>(ViewType.Learn);

  const renderView = useCallback((): React.ReactNode => {
    switch (view) {
      case ViewType.Learn:
        return <LearnView />;
      case ViewType.Practice:
        return <PracticeView />;
      default:
        return <LearnView />;
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-fuchsia-50 text-slate-800">
      <div className="container mx-auto p-4 md:p-8">
        <Header activeView={view} setView={setView} />
        <main className="mt-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
