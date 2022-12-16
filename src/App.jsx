import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdoptPetContext from './AdoptPetContext';

const Details = lazy(() => import('./Details'))
const SearchParams = lazy(() => import('./SearchParams'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptPet = useState(null)
  return (
    <div className="p-0 m-0" style={{background: "url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)",}}>
      <BrowserRouter>
        <AdoptPetContext.Provider value={adoptPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={
              <div className="loading-pane">
                <h2 className="loader">🌀</h2>
              </div>
            }>
              <header className='mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7
              text-center'>
                <Link className='text-6xl text-white hover:text-gray-200' to="/">Adopt me</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </AdoptPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
