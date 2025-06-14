import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { PersonaCard } from '../components/personas/PersonaCard';
import { Button } from '../components/ui/Button';
import { Plus, Users } from 'lucide-react';

export const PersonasPage: React.FC = () => {
  const { personas, deletePersona } = useData();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this persona? This action cannot be undone.')) {
      deletePersona(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Stakeholder Personas</h1>
            <p className="text-gray-600">Manage your simulation personas for Pakistani EWA market segments</p>
          </div>
        </div>
        <Link to="/create-persona">
          <Button icon={Plus}>
            Create New Persona
          </Button>
        </Link>
      </div>

      {/* Personas Grid */}
      {personas.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No personas yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first stakeholder persona to start running simulations.
          </p>
          <Link to="/create-persona">
            <Button icon={Plus}>
              Create Your First Persona
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};