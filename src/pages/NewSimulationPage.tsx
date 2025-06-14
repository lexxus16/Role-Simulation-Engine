import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Simulation } from '../data/types';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TextArea, Select } from '../components/ui/Input';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { SimulationResults } from '../components/simulation/SimulationResults';
import { Play, Users, Target } from 'lucide-react';

export const NewSimulationPage: React.FC = () => {
  const navigate = useNavigate();
  const { personas, runSimulation } = useData();
  
  const [scenarioText, setScenarioText] = useState('');
  const [scenarioType, setScenarioType] = useState<Simulation['scenarioType']>('New Feature');
  const [selectedPersonaIds, setSelectedPersonaIds] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [simulation, setSimulation] = useState<Simulation | null>(null);

  const scenarioTypeOptions = [
    { value: 'New Feature', label: 'New Feature' },
    { value: 'Pricing Model', label: 'Pricing Model' },
    { value: 'VAS Offering', label: 'VAS Offering' },
    { value: 'Policy Change', label: 'Policy Change' },
    { value: 'Bundled Offering', label: 'Bundled Offering' },
  ];

  const handlePersonaToggle = (personaId: string) => {
    setSelectedPersonaIds(prev =>
      prev.includes(personaId)
        ? prev.filter(id => id !== personaId)
        : [...prev, personaId]
    );
  };

  const handleRunSimulation = async () => {
    if (!scenarioText.trim() || selectedPersonaIds.length === 0) {
      alert('Please provide a scenario description and select at least one persona.');
      return;
    }

    setIsRunning(true);
    try {
      const result = await runSimulation(scenarioText, scenarioType, selectedPersonaIds);
      setSimulation(result);
    } catch (error) {
      console.error('Simulation failed:', error);
      alert('Simulation failed. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  if (simulation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Simulation Results</h1>
          <Button
            variant="secondary"
            onClick={() => {
              setSimulation(null);
              setScenarioText('');
              setSelectedPersonaIds([]);
            }}
          >
            Run New Simulation
          </Button>
        </div>
        <SimulationResults simulation={simulation} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Play className="w-6 h-6 text-orange-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Simulation</h1>
          <p className="text-gray-600">Test stakeholder reactions to your EWA/VAS scenarios</p>
        </div>
      </div>

      {/* Simulation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Input */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Scenario Definition</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextArea
                label="Scenario Description"
                value={scenarioText}
                onChange={(e) => setScenarioText(e.target.value)}
                placeholder="Describe the new EWA feature, pricing model, VAS offering, or policy change you want to test..."
                rows={6}
                required
              />
              
              <Select
                label="Scenario Type"
                value={scenarioType}
                onChange={(e) => setScenarioType(e.target.value as Simulation['scenarioType'])}
                options={scenarioTypeOptions}
              />
            </CardContent>
          </Card>
        </div>

        {/* Persona Selection */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-teal-600" />
                <span>Select Personas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {personas.map((persona) => (
                  <label key={persona.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPersonaIds.includes(persona.id)}
                      onChange={() => handlePersonaToggle(persona.id)}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <img
                          src={persona.imageURL}
                          alt={persona.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">{persona.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{persona.segment}</p>
                    </div>
                  </label>
                ))}
              </div>
              
              {selectedPersonaIds.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    {selectedPersonaIds.length} persona{selectedPersonaIds.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Run Simulation Button */}
      <Card>
        <CardContent className="text-center py-8">
          {isRunning ? (
            <div className="space-y-4">
              <LoadingSpinner size="lg" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Running Simulation...
                </h3>
                <p className="text-gray-600">
                  Analyzing stakeholder reactions using AI-powered behavioral modeling
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Ready to simulate stakeholder reactions?
              </h3>
              <p className="text-gray-600 mb-6">
                This will generate realistic feedback from your selected personas based on behavioral corpus data.
              </p>
              <Button
                size="lg"
                icon={Play}
                onClick={handleRunSimulation}
                disabled={!scenarioText.trim() || selectedPersonaIds.length === 0}
              >
                Run Simulation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sample Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                 onClick={() => setScenarioText("Neem is launching a new 'Financial Wellness' Value-Added Service (VAS) for EWA users, offering credit counseling through a digital chatbot and micro-savings features with gamified incentives. This targets financial literacy and stability.")}>
              <p className="text-sm font-medium text-gray-900">Financial Wellness VAS Launch</p>
              <p className="text-xs text-gray-600">Credit counseling chatbot + gamified micro-savings</p>
            </div>
            <div className="cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                 onClick={() => setScenarioText("Neem is proposing a new premium EWA pricing model for enterprises, offering tiered access to additional analytical insights for HR managers and priority support, with a slightly higher monthly subscription fee per employee.")}>
              <p className="text-sm font-medium text-gray-900">Premium Tiered Pricing Model</p>
              <p className="text-xs text-gray-600">Enhanced analytics + priority support at higher cost</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};