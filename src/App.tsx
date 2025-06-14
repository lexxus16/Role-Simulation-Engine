import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Layout } from './components/layout/Layout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Pages
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { PersonasPage } from './pages/PersonasPage';
import { CorpusPage } from './pages/CorpusPage';
import { NewSimulationPage } from './pages/NewSimulationPage';
import { SimulationDetailsPage } from './pages/SimulationDetailsPage';

// Components
import { PersonaForm } from './components/personas/PersonaForm';
import { CorpusForm } from './components/corpus/CorpusForm';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/" replace /> : <AuthPage />} 
        />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DataProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/personas" element={<PersonasPage />} />
                    <Route path="/create-persona" element={<PersonaForm />} />
                    <Route path="/personas/:id/edit" element={<PersonaForm isEditing />} />
                    <Route path="/corpus" element={<CorpusPage />} />
                    <Route path="/add-corpus" element={<CorpusForm />} />
                    <Route path="/corpus/:id/edit" element={<CorpusForm isEditing />} />
                    <Route path="/new-simulation" element={<NewSimulationPage />} />
                    <Route path="/simulation/:id" element={<SimulationDetailsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              </DataProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;