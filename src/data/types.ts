export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'Admin' | 'Analyst' | 'Product Manager' | 'Marketing Specialist';
  createdAt: Date;
}

export interface Persona {
  id: string;
  name: string;
  segment: 'B2B - CXO' | 'B2B - Manager' | 'B2C - End User';
  description: string;
  keyConcerns: string[];
  typicalTone: string;
  culturalNuances: string;
  industryFocus: string;
  imageURL: string;
  createdAt: Date;
  createdBy: string;
}

export interface CorpusEntry {
  id: string;
  title: string;
  category: 'Pricing' | 'Feature Adoption' | 'Customer Support' | 'Compliance Concern' | 'Market Research';
  description: string;
  source: string;
  relatedPersonaIds: string[];
  regionSpecific: string;
  industrySpecific: string;
  observedReaction: string;
  createdAt: Date;
  createdBy: string;
}

export interface SimulationResponse {
  personaId: string;
  personaName: string;
  simulatedFeedback: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  tone: string;
  keywords: string[];
  confidenceLevel: number;
  dataCollectionRecommendation: string;
  relatedCorpusEntryIds: string[];
}

export interface Simulation {
  id: string;
  scenarioText: string;
  scenarioType: 'New Feature' | 'Pricing Model' | 'VAS Offering' | 'Policy Change' | 'Bundled Offering';
  selectedPersonaIds: string[];
  createdAt: Date;
  createdBy: string;
  responses: SimulationResponse[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, displayName: string, role: User['role']) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface DataContextType {
  personas: Persona[];
  corpusEntries: CorpusEntry[];
  simulations: Simulation[];
  createPersona: (persona: Omit<Persona, 'id' | 'createdAt' | 'createdBy'>) => void;
  updatePersona: (id: string, persona: Partial<Persona>) => void;
  deletePersona: (id: string) => void;
  createCorpusEntry: (entry: Omit<CorpusEntry, 'id' | 'createdAt' | 'createdBy'>) => void;
  updateCorpusEntry: (id: string, entry: Partial<CorpusEntry>) => void;
  deleteCorpusEntry: (id: string) => void;
  runSimulation: (scenarioText: string, scenarioType: Simulation['scenarioType'], personaIds: string[]) => Promise<Simulation>;
  getSimulation: (id: string) => Simulation | undefined;
}