import React from 'react';
import { Link } from 'react-router-dom';
import { Persona } from '../../data/types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Edit, Trash2, Building, MapPin } from 'lucide-react';

interface PersonaCardProps {
  persona: Persona;
  onDelete: (id: string) => void;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onDelete }) => {
  return (
    <Card hover className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <img
              src={persona.imageURL}
              alt={persona.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg">{persona.name}</CardTitle>
              <Badge variant="primary" className="mt-1">
                {persona.segment}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Link to={`/personas/${persona.id}/edit`}>
              <Button variant="ghost" size="sm" icon={Edit} />
            </Link>
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              onClick={() => onDelete(persona.id)}
              className="text-red-600 hover:text-red-700"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{persona.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{persona.industryFocus}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">Tone:</span>
            <span className="text-gray-600 capitalize">{persona.typicalTone}</span>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Key Concerns</p>
          <div className="flex flex-wrap gap-1">
            {persona.keyConcerns.map((concern) => (
              <Badge key={concern} variant="secondary" size="sm">
                {concern}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Cultural Context</p>
          <p className="text-sm text-gray-600 line-clamp-2">{persona.culturalNuances}</p>
        </div>
      </CardContent>
    </Card>
  );
};