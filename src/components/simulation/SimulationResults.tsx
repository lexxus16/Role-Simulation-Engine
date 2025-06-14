import React from 'react';
import { Simulation } from '../../data/types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TrendingUp, AlertCircle, Lightbulb, Target } from 'lucide-react';

interface SimulationResultsProps {
  simulation: Simulation;
}

export const SimulationResults: React.FC<SimulationResultsProps> = ({ simulation }) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'positive';
      case 'Negative': return 'negative';
      default: return 'neutral';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Scenario Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Simulation Scenario</span>
            </CardTitle>
            <Badge variant="primary">{simulation.scenarioType}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{simulation.scenarioText}</p>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {simulation.responses.map((response) => (
          <Card key={response.personaId} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{response.personaName}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={getSentimentColor(response.sentiment) as any}>
                      {response.sentiment}
                    </Badge>
                    <span className="text-sm text-gray-500 capitalize">
                      Tone: {response.tone}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(response.confidenceLevel)}`}>
                  {Math.round(response.confidenceLevel * 100)}% Confidence
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Simulated Feedback */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Simulated Response</h4>
                </div>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  "{response.simulatedFeedback}"
                </p>
              </div>

              {/* Keywords */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Themes</h4>
                <div className="flex flex-wrap gap-1">
                  {response.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" size="sm">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Data Collection Recommendation */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-orange-600" />
                  <h4 className="font-medium text-gray-900">Data Collection Recommendation</h4>
                </div>
                <p className="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg border border-orange-100">
                  {response.dataCollectionRecommendation}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <span>Simulation Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {simulation.responses.filter(r => r.sentiment === 'Positive').length}
              </div>
              <div className="text-sm text-gray-600">Positive Responses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {simulation.responses.filter(r => r.sentiment === 'Neutral').length}
              </div>
              <div className="text-sm text-gray-600">Neutral Responses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {simulation.responses.filter(r => r.sentiment === 'Negative').length}
              </div>
              <div className="text-sm text-gray-600">Negative Responses</div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Average Confidence Level</h4>
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${Math.round(
                      (simulation.responses.reduce((acc, r) => acc + r.confidenceLevel, 0) /
                        simulation.responses.length) * 100
                    )}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {Math.round(
                  (simulation.responses.reduce((acc, r) => acc + r.confidenceLevel, 0) /
                    simulation.responses.length) * 100
                )}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};