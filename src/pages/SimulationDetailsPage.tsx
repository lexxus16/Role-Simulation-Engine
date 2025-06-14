import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { SimulationResults } from '../components/simulation/SimulationResults';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const SimulationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getSimulation } = useData();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const simulation = getSimulation(id);

  if (!simulation) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Simulation not found</h2>
        <p className="text-gray-600">The simulation you're looking for doesn't exist or has been deleted.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Simulation Details</h1>
        <p className="text-gray-600">
          Created on {simulation.createdAt.toLocaleDateString()} at {simulation.createdAt.toLocaleTimeString()}
        </p>
      </div>
      
      <SimulationResults simulation={simulation} />
    </div>
  );
};