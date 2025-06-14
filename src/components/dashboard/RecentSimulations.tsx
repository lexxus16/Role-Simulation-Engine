import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Play, ArrowRight, Calendar, Users } from 'lucide-react';

export const RecentSimulations: React.FC = () => {
  const { simulations } = useData();

  const recentSimulations = simulations.slice(0, 5);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Play className="w-6 h-6 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">Recent Simulations</h2>
        </div>
        <Link to="/new-simulation">
          <Button variant="primary" size="sm" icon={Play}>
            Start New Simulation
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {recentSimulations.map((simulation) => (
          <Card key={simulation.id} hover>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                      {simulation.scenarioText}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(simulation.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{simulation.selectedPersonaIds.length} personas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    <Badge variant="primary" size="sm">
                      {simulation.scenarioType}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {simulation.responses.map((response) => {
                      const sentimentColors = {
                        Positive: 'positive',
                        Neutral: 'neutral',
                        Negative: 'negative',
                      } as const;
                      
                      return (
                        <Badge
                          key={response.personaId}
                          variant={sentimentColors[response.sentiment]}
                          size="sm"
                        >
                          {response.sentiment}
                        </Badge>
                      );
                    })}
                  </div>
                  
                  <Link to={`/simulation/${simulation.id}`}>
                    <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {simulations.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No simulations yet. Create your first simulation to get started.</p>
              <Link to="/new-simulation">
                <Button variant="primary" icon={Play}>
                  Start New Simulation
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};