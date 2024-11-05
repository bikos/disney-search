import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/user';

const DEFAULT_PROFILE: UserProfile = {
  firstName: '',
  lastName: '',
  city: '',
  state: '',
  favoriteCharacter: '',
  favoriteMovie: '',
  favoriteDisneyland: '',
  lastUpdated: new Date().toISOString(),
  birthday: ''
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load profile from localStorage on mount
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const updateProfile = (newProfile: UserProfile) => {
    const updatedProfile = {
      ...newProfile,
      lastUpdated: new Date().toISOString(),
    };
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  return {
    profile,
    isEditing,
    setIsEditing,
    updateProfile,
  };
}