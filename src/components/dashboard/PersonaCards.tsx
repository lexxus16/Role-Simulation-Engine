import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Users, ArrowRight } from 'lucide-react';

export const PersonaCards: React.FC = () => {
  const { personas } = useData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Your Stakeholder Personas</h2>
        </div>
        <Link to="/personas">
          <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
            Manage Personas
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <Card key={persona.id} hover className="h-full">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <img
                  src={persona.imageURL}
                  alt={persona.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base truncate">{persona.name}</CardTitle>
                  <Badge variant="primary" size="sm" className="mt-1">
                    {persona.segment}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {persona.description}
              </p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">Key Concerns</p>
                  <div className="flex flex-wrap gap-1">
                    {persona.keyConcerns.slice(0, 3).map((concern) => (
                      <Badge key={concern} variant="secondary" size="sm">
                        {concern}
                      </Badge>
                    ))}
                    {persona.keyConcerns.length > 3 && (
                      <Badge variant="default" size="sm">
                        +{persona.keyConcerns.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-gray-700">Typical Tone</p>
                  <p className="text-sm text-gray-600 capitalize">{persona.typicalTone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};