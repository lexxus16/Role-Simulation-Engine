import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Database, ArrowRight, FileText } from 'lucide-react';

export const CorpusInsights: React.FC = () => {
  const { corpusEntries } = useData();

  const recentEntries = corpusEntries.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-teal-600" />
          <h2 className="text-xl font-semibold text-gray-900">Behavioral Corpus Insights</h2>
        </div>
        <Link to="/corpus">
          <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
            Manage Corpus
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {recentEntries.map((entry) => (
          <Card key={entry.id} hover>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-teal-600" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {entry.title}
                    </h3>
                    <Badge variant="default" size="sm">
                      {entry.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {entry.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{entry.source}</span>
                    <span>{entry.regionSpecific}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {corpusEntries.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No corpus entries yet. Start building your behavioral insights.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};