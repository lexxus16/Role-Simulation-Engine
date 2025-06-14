import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { User } from '../../data/types';

interface SignupFormProps {
  onToggleMode: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onToggleMode }) => {
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    role: 'Analyst' as User['role'],
  });
  const [error, setError] = useState('');

  const roleOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Analyst', label: 'Analyst' },
    { value: 'Product Manager', label: 'Product Manager' },
    { value: 'Marketing Specialist', label: 'Marketing Specialist' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password || !formData.displayName) {
      setError('Please fill in all fields');
      return;
    }

    const success = await signup(
      formData.email,
      formData.password,
      formData.displayName,
      formData.role
    );
    
    if (!success) {
      setError('Email already exists or signup failed');
    }
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={formData.displayName}
          onChange={handleChange('displayName')}
          placeholder="Enter your full name"
          required
        />
        
        <Input
          label="Email address"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="Enter your email"
          required
        />
        
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="Create a password"
          required
        />
        
        <Select
          label="Role"
          value={formData.role}
          onChange={handleChange('role')}
          options={roleOptions}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full"
          loading={loading}
        >
          Create Account
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};