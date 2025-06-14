import React from 'react';
import { PersonaCards } from '../components/dashboard/PersonaCards';
import { CorpusInsights } from '../components/dashboard/CorpusInsights';
import { RecentSimulations } from '../components/dashboard/RecentSimulations';
import { useAuth } from '../contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.displayName}!
        </h1>
        <p className="text-blue-100">
          Ready to simulate stakeholder reactions and make data-driven decisions for Neem's EWA platform.
        </p>
      </div>

      {/* Dashboard Sections */}
      <div className="space-y-12">
        <PersonaCards />
        <RecentSimulations />
        <CorpusInsights />
      </div>
    </div>
  );
};