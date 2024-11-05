import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/user';

const DEFAULT_PROFILE: UserProfile = {
  firstName: 'Mickey',
  lastName: 'Mouse',
  city: 'Anaheim',
  state: 'CA',
  favoriteCharacter: 'Donald Duck',
  favoriteMovie: 'Fantasia',
  favoriteDisneyland: 'Disneyland Resort (California)',
  lastUpdated: new Date().toISOString(),
  birthday: '1928-11-18'
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load profile from localStorage on mount
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Set default profile for new users
      setProfile(DEFAULT_PROFILE);
      localStorage.setItem('userProfile', JSON.stringify(DEFAULT_PROFILE));
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