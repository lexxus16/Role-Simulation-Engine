import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Persona } from '../../data/types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, TextArea, Select } from '../ui/Input';
import { ArrowLeft, Save } from 'lucide-react';

interface PersonaFormProps {
  persona?: Persona;
  isEditing?: boolean;
}

export const PersonaForm: React.FC<PersonaFormProps> = ({ persona, isEditing = false }) => {
  const navigate = useNavigate();
  const { createPersona, updatePersona } = useData();
  
  const [formData, setFormData] = useState({
    name: persona?.name || '',
    segment: persona?.segment || 'B2C - End User',
    description: persona?.description || '',
    keyConcerns: persona?.keyConcerns.join(', ') || '',
    typicalTone: persona?.typicalTone || '',
    culturalNuances: persona?.culturalNuances || '',
    industryFocus: persona?.industryFocus || '',
    imageURL: persona?.imageURL || 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  });

  const segmentOptions = [
    { value: 'B2B - CXO', label: 'B2B - CXO' },
    { value: 'B2B - Manager', label: 'B2B - Manager' },
    { value: 'B2C - End User', label: 'B2C - End User' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const personaData = {
      ...formData,
      segment: formData.segment as Persona['segment'],
      keyConcerns: formData.keyConcerns.split(',').map(concern => concern.trim()).filter(Boolean),
    };

    if (isEditing && persona) {
      updatePersona(persona.id, personaData);
    } else {
      createPersona(personaData);
    }
    
    navigate('/personas');
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/personas')}
        />
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Persona' : 'Create New Persona'}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Persona Details</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Persona Name"
                value={formData.name}
                onChange={handleChange('name')}
                placeholder="e.g., Pakistani Enterprise CXO"
                required
              />
              
              <Select
                label="Segment"
                value={formData.segment}
                onChange={handleChange('segment')}
                options={segmentOptions}
              />
            </div>

            <TextArea
              label="Description"
              value={formData.description}
              onChange={handleChange('description')}
              placeholder="Detailed description of this persona's background, motivations, and characteristics..."
              rows={4}
              required
            />

            <Input
              label="Key Concerns"
              value={formData.keyConcerns}
              onChange={handleChange('keyConcerns')}
              placeholder="ROI, compliance, security, ease of use (comma-separated)"
              helperText="Separate multiple concerns with commas"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Typical Tone"
                value={formData.typicalTone}
                onChange={handleChange('typicalTone')}
                placeholder="e.g., strategic, pragmatic, cautious"
                required
              />
              
              <Input
                label="Industry Focus"
                value={formData.industryFocus}
                onChange={handleChange('industryFocus')}
                placeholder="e.g., General Enterprise, Textile, IT"
                required
              />
            </div>

            <TextArea
              label="Cultural Nuances"
              value={formData.culturalNuances}
              onChange={handleChange('culturalNuances')}
              placeholder="Cultural context and considerations specific to Pakistani market..."
              rows={3}
              required
            />

            <Input
              label="Image URL"
              value={formData.imageURL}
              onChange={handleChange('imageURL')}
              placeholder="https://example.com/image.jpg"
              helperText="Provide a URL for the persona's profile image"
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/personas')}
              >
                Cancel
              </Button>
              <Button type="submit" icon={Save}>
                {isEditing ? 'Update Persona' : 'Create Persona'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};