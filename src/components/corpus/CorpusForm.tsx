import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { CorpusEntry } from '../../data/types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, TextArea, Select } from '../ui/Input';
import { ArrowLeft, Save } from 'lucide-react';

interface CorpusFormProps {
  entry?: CorpusEntry;
  isEditing?: boolean;
}

export const CorpusForm: React.FC<CorpusFormProps> = ({ entry, isEditing = false }) => {
  const navigate = useNavigate();
  const { createCorpusEntry, updateCorpusEntry, personas } = useData();
  
  const [formData, setFormData] = useState({
    title: entry?.title || '',
    category: entry?.category || 'Feature Adoption',
    description: entry?.description || '',
    source: entry?.source || '',
    relatedPersonaIds: entry?.relatedPersonaIds || [],
    regionSpecific: entry?.regionSpecific || '',
    industrySpecific: entry?.industrySpecific || '',
    observedReaction: entry?.observedReaction || '',
  });

  const categoryOptions = [
    { value: 'Pricing', label: 'Pricing' },
    { value: 'Feature Adoption', label: 'Feature Adoption' },
    { value: 'Customer Support', label: 'Customer Support' },
    { value: 'Compliance Concern', label: 'Compliance Concern' },
    { value: 'Market Research', label: 'Market Research' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && entry) {
      updateCorpusEntry(entry.id, formData);
    } else {
      createCorpusEntry(formData);
    }
    
    navigate('/corpus');
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handlePersonaSelection = (personaId: string) => {
    setFormData(prev => ({
      ...prev,
      relatedPersonaIds: prev.relatedPersonaIds.includes(personaId)
        ? prev.relatedPersonaIds.filter(id => id !== personaId)
        : [...prev.relatedPersonaIds, personaId],
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/corpus')}
        />
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Corpus Entry' : 'Add New Corpus Entry'}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Behavioral Insight Details</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Title"
              value={formData.title}
              onChange={handleChange('title')}
              placeholder="Brief, descriptive title for this behavioral insight"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Category"
                value={formData.category}
                onChange={handleChange('category')}
                options={categoryOptions}
              />
              
              <Input
                label="Source"
                value={formData.source}
                onChange={handleChange('source')}
                placeholder="e.g., Customer Interview - Karachi, Market Research 2023"
                required
              />
            </div>

            <TextArea
              label="Description"
              value={formData.description}
              onChange={handleChange('description')}
              placeholder="Detailed description of the behavioral pattern or insight..."
              rows={4}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Related Personas
              </label>
              <div className="space-y-2">
                {personas.map((persona) => (
                  <label key={persona.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.relatedPersonaIds.includes(persona.id)}
                      onChange={() => handlePersonaSelection(persona.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{persona.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Region Specific"
                value={formData.regionSpecific}
                onChange={handleChange('regionSpecific')}
                placeholder="e.g., Pakistan - Urban, Pakistan - Rural"
                required
              />
              
              <Input
                label="Industry Specific"
                value={formData.industrySpecific}
                onChange={handleChange('industrySpecific')}
                placeholder="e.g., Textile, IT, General B2B"
                required
              />
            </div>

            <TextArea
              label="Observed Reaction"
              value={formData.observedReaction}
              onChange={handleChange('observedReaction')}
              placeholder="Summary of the specific reaction or behavior observed..."
              rows={3}
              required
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/corpus')}
              >
                Cancel
              </Button>
              <Button type="submit" icon={Save}>
                {isEditing ? 'Update Entry' : 'Add Entry'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};