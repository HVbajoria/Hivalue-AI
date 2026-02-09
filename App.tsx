import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blueprint from './pages/Blueprint';
import AboutSection from './components/ui/about-section';

const App: React.FC = () => {
  // Simple hash routing
  const [currentRoute, setCurrentRoute] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      // remove # from hash
      const route = window.location.hash.slice(1);
      setCurrentRoute(route);
      
      // Always use dark mode
      document.body.classList.add('dark-mode');
    };

    // Set initial route
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    window.location.hash = route;
  };

  let content;
  if (currentRoute.startsWith('idea/')) {
    const id = currentRoute.split('/')[1];
    content = <Blueprint id={id} onBack={() => navigateTo('')} />;
  } else if (currentRoute === 'about') {
    content = <AboutSection />;
  } else {
    content = <Home onNavigate={(id) => navigateTo(`idea/${id}`)} />;
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
};

export default App;
