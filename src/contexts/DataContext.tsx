import React, { createContext, useContext, useState } from 'react';
import { Persona, CorpusEntry, Simulation, DataContextType, SimulationResponse } from '../data/types';
import { mockPersonas, mockCorpusEntries, mockSimulations } from '../data/mockData';
import { useAuth } from './AuthContext';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [personas, setPersonas] = useState<Persona[]>(mockPersonas);
  const [corpusEntries, setCorpusEntries] = useState<CorpusEntry[]>(mockCorpusEntries);
  const [simulations, setSimulations] = useState<Simulation[]>(mockSimulations);

  const createPersona = (personaData: Omit<Persona, 'id' | 'createdAt' | 'createdBy'>) => {
    const newPersona: Persona = {
      ...personaData,
      id: `persona-${Date.now()}`,
      createdAt: new Date(),
      createdBy: user?.id || 'unknown',
    };
    setPersonas(prev => [...prev, newPersona]);
  };

  const updatePersona = (id: string, updates: Partial<Persona>) => {
    setPersonas(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePersona = (id: string) => {
    setPersonas(prev => prev.filter(p => p.id !== id));
  };

  const createCorpusEntry = (entryData: Omit<CorpusEntry, 'id' | 'createdAt' | 'createdBy'>) => {
    const newEntry: CorpusEntry = {
      ...entryData,
      id: `corpus-${Date.now()}`,
      createdAt: new Date(),
      createdBy: user?.id || 'unknown',
    };
    setCorpusEntries(prev => [...prev, newEntry]);
  };

  const updateCorpusEntry = (id: string, updates: Partial<CorpusEntry>) => {
    setCorpusEntries(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteCorpusEntry = (id: string) => {
    setCorpusEntries(prev => prev.filter(e => e.id !== id));
  };

  const runSimulation = async (
    scenarioText: string,
    scenarioType: Simulation['scenarioType'],
    personaIds: string[]
  ): Promise<Simulation> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedPersonas = personas.filter(p => personaIds.includes(p.id));
    const responses: SimulationResponse[] = [];
    
    // Generate mock responses for each persona
    for (const persona of selectedPersonas) {
      const relevantCorpus = corpusEntries.filter(c => 
        c.relatedPersonaIds.includes(persona.id)
      );
      
      // Mock AI-generated response based on persona and scenario
      const mockResponse: SimulationResponse = {
        personaId: persona.id,
        personaName: persona.name,
        simulatedFeedback: generateMockFeedback(persona, scenarioText, scenarioType),
        sentiment: Math.random() > 0.5 ? 'Positive' : Math.random() > 0.5 ? 'Neutral' : 'Negative',
        tone: persona.typicalTone,
        keywords: extractKeywords(scenarioText, persona.keyConcerns),
        confidenceLevel: Math.random() * 0.3 + 0.7, // Between 0.7 and 1.0
        dataCollectionRecommendation: generateDataRecommendation(persona, scenarioType),
        relatedCorpusEntryIds: relevantCorpus.map(c => c.id).slice(0, 2),
      };
      
      responses.push(mockResponse);
    }
    
    const newSimulation: Simulation = {
      id: `sim-${Date.now()}`,
      scenarioText,
      scenarioType,
      selectedPersonaIds: personaIds,
      createdAt: new Date(),
      createdBy: user?.id || 'unknown',
      responses,
    };
    
    setSimulations(prev => [newSimulation, ...prev]);
    return newSimulation;
  };

  const getSimulation = (id: string): Simulation | undefined => {
    return simulations.find(s => s.id === id);
  };

  const value: DataContextType = {
    personas,
    corpusEntries,
    simulations,
    createPersona,
    updatePersona,
    deletePersona,
    createCorpusEntry,
    updateCorpusEntry,
    deleteCorpusEntry,
    runSimulation,
    getSimulation,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Helper functions for mock data generation
function generateMockFeedback(persona: Persona, scenarioText: string, scenarioType: string): string {
  const feedbackTemplates = {
    'B2B - CXO': [
      'This initiative needs clear ROI metrics and compliance assurance before we can consider implementation.',
      'The strategic value is apparent, but we require detailed security protocols and regulatory compliance documentation.',
      'From a business perspective, this could enhance our competitive position if properly executed with measurable outcomes.',
    ],
    'B2B - Manager': [
      'This looks promising if it integrates well with our existing systems and doesn\'t increase administrative burden.',
      'The implementation would need to be seamless and well-supported to ensure smooth adoption by our team.',
      'We\'d need comprehensive training and clear documentation to manage this effectively.',
    ],
    'B2C - End User': [
      'This sounds helpful if it\'s simple to use and doesn\'t have hidden costs or complicated processes.',
      'I would try this if it really helps with my financial situation and is trustworthy.',
      'It needs to be very clear and easy to understand, preferably in Urdu, with good customer support.',
    ],
  };
  
  const templates = feedbackTemplates[persona.segment];
  return templates[Math.floor(Math.random() * templates.length)];
}

function extractKeywords(scenarioText: string, keyConcerns: string[]): string[] {
  const words = scenarioText.toLowerCase().split(/\s+/);
  const keywords = keyConcerns.filter(concern => 
    words.some(word => concern.toLowerCase().includes(word) || word.includes(concern.toLowerCase()))
  );
  
  // Add some scenario-specific keywords
  const additionalKeywords = ['pricing', 'integration', 'security', 'compliance', 'support']
    .filter(keyword => words.some(word => word.includes(keyword)));
  
  return [...keywords, ...additionalKeywords].slice(0, 6);
}

function generateDataRecommendation(persona: Persona, scenarioType: string): string {
  const recommendations = [
    `Conduct focused interviews with ${persona.segment} stakeholders to validate ${scenarioType.toLowerCase()} assumptions.`,
    `Gather quantitative data on ${persona.industryFocus} adoption patterns for similar ${scenarioType.toLowerCase()} initiatives.`,
    `Survey current users in the ${persona.segment} segment about their specific concerns regarding ${scenarioType.toLowerCase()}.`,
    `Analyze competitor responses and market reaction in the ${persona.industryFocus} sector.`,
  ];
  
  return recommendations[Math.floor(Math.random() * recommendations.length)];
}