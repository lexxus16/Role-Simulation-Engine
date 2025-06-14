import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Database, Plus, Edit, Trash2, FileText } from 'lucide-react';

export const CorpusPage: React.FC = () => {
  const { corpusEntries, deleteCorpusEntry, personas } = useData();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this corpus entry? This action cannot be undone.')) {
      deleteCorpusEntry(id);
    }
  };

  const getPersonaName = (personaId: string) => {
    const persona = personas.find(p => p.id === personaId);
    return persona?.name || 'Unknown Persona';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-teal-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Behavioral Corpus</h1>
            <p className="text-gray-600">Market research insights and behavioral patterns from Pakistani stakeholders</p>
          </div>
        </div>
        <Link to="/add-corpus">
          <Button icon={Plus}>
            Add New Entry
          </Button>
        </Link>
      </div>

      {/* Corpus Entries */}
      {corpusEntries.length > 0 ? (
        <div className="space-y-4">
          {corpusEntries.map((entry) => (
            <Card key={entry.id} hover>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-teal-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{entry.title}</h3>
                        <Badge variant="default">{entry.category}</Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{entry.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Source: </span>
                          <span className="text-gray-600">{entry.source}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Region: </span>
                          <span className="text-gray-600">{entry.regionSpecific}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Industry: </span>
                          <span className="text-gray-600">{entry.industrySpecific}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-700">Related Personas: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {entry.relatedPersonaIds.map((personaId) => (
                            <Badge key={personaId} variant="secondary" size="sm">
                              {getPersonaName(personaId)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Observed Reaction: </span>
                        <p className="text-sm text-gray-600 mt-1">{entry.observedReaction}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Link to={`/corpus/${entry.id}/edit`}>
                      <Button variant="ghost" size="sm" icon={Edit} />
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-600 hover:text-red-700"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No corpus entries yet</h3>
          <p className="text-gray-600 mb-6">
            Add behavioral insights and market research to improve simulation accuracy.
          </p>
          <Link to="/add-corpus">
            <Button icon={Plus}>
              Add Your First Entry
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};