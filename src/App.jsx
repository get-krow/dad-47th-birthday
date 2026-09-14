import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BirthdayCard from './pages/BirthdayCard';
import CardEditor from './pages/CardEditor';
import { loadCardContent } from './services/storage';
import { initialCardContent } from './defaultContent';

export default function App() {
  const [content, setContent] = useState(initialCardContent);
  const [currentView, setCurrentView] = useState('card'); // 'card' | 'edit'
  const [loading, setLoading] = useState(true);

  // Synchronize route based on URL pathname or hash
  const detectViewFromUrl = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/edit' || path.startsWith('/edit/') || hash === '#edit' || hash === '#/edit') {
      return 'edit';
    }
    return 'card';
  };

  useEffect(() => {
    // 1. Detect route
    setCurrentView(detectViewFromUrl());

    // 2. Load stored content
    async function initContent() {
      try {
        const loaded = await loadCardContent();
        setContent(loaded);
      } catch (err) {
        console.error('Error loading content:', err);
      } finally {
        setLoading(false);
      }
    }
    initContent();

    // 3. Listen for browser back/forward
    const handlePopState = () => {
      setCurrentView(detectViewFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    const targetPath = view === 'edit' ? '/edit' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveUpdatedContent = (newContent) => {
    setContent(newContent);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        backgroundColor: '#0a0e17',
        color: '#f8fafc'
      }}>
        <div style={{ fontSize: '2.5rem', animation: 'floatGentle 1.5s infinite' }}>🎂</div>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--accent-gold)' }}>
          Preparing Daddy's 47th Birthday Card...
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <Navbar currentView={currentView} onViewChange={navigateTo} />
      
      <main>
        {currentView === 'edit' ? (
          <CardEditor 
            content={content} 
            onSave={handleSaveUpdatedContent} 
            onNavigateCard={() => navigateTo('card')} 
          />
        ) : (
          <BirthdayCard 
            content={content} 
            onNavigateEdit={() => navigateTo('edit')} 
          />
        )}
      </main>
    </div>
  );
}
