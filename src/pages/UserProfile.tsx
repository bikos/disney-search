import { useUserProfile } from '@/hooks/useUserProfile';
import { UserProfile as UserProfileType } from '@/types/user';
import { useEffect, useState } from 'react';

function UserProfile() {

  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };



  const DISNEY_LOCATIONS = [
    "Disneyland Resort (California)",
    "Walt Disney World Resort (Florida)",
    "Tokyo Disney Resort",
    "Disneyland Paris",
    "Hong Kong Disneyland Resort",
    "Shanghai Disney Resort"
  ] as const;


  const STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ] as const;


  const { profile, isEditing, setIsEditing, updateProfile } = useUserProfile();
  const [formData, setFormData] = useState<UserProfileType>(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="container mx-auto bg-light-blue">
        <section className="px-4 pt-8 sm:px-20 sm:pt-20 pb-10">
          <div className="max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[15px] font-bold text-form-label-text font-[lato] ">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 text-sm font-[lato] py-2 rounded-md border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-[15px] font-bold text-form-label-text font-[lato] ">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 text-sm font-[lato] py-2 rounded-md border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-[15px] font-bold text-form-label-text font-[lato] ">
                  Birthday <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  className="w-full px-4 text-sm font-[lato] py-2 rounded-md border border-gray-300"
                />
              </div>


              <div className="col-span-2 flex gap-6">
                <div className="w-1/2"> 
                  <label className="block text-[15px] font-bold text-form-label-text font-[lato]">
                    City 
                  </label>
                  <input
                    type="text"
        
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 text-sm font-[lato] py-2 rounded-md border border-gray-300"
                  />
                </div>
                <div className="w-[105px]"> 
                  <label className="block text-[15px] font-bold text-form-label-text font-[lato]">
                    State 
                  </label>
                  <select
                  
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 text-sm font-[lato] py-2 rounded-md border border-gray-300 bg-white appearance-none cursor-pointer"
                  >
                    <option value="">State</option>
                    {STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1"></div> 
              </div>
                
                
                
                
                <div className="col-span-2">
                  <label className="block text-[15px] font-bold text-form-label-text font-[lato]">Favorite Disney Character</label>
                  <input
                    type="text"
                    value={formData.favoriteCharacter}
                    onChange={(e) => setFormData({ ...formData, favoriteCharacter: e.target.value })}
                    className="w-full px-4 text-sm font-[lato] py-2 rounded-md border border-gray-300"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[15px] font-bold text-form-label-text font-[lato]">Favorite Disney Movie</label>
                  <input
                    type="text"
                    value={formData.favoriteMovie}
                    onChange={(e) => setFormData({ ...formData, favoriteMovie: e.target.value })}
                    className="w-full px-4 text-sm font-[lato] py-2 rounded-md border border-gray-300"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[15px] font-bold text-form-label-text font-[lato]">
                    Favorite Disneyland
                  </label>
                  <select
                    value={formData.favoriteDisneyland}
                    onChange={(e) => setFormData({ ...formData, favoriteDisneyland: e.target.value })}
                    className="w-full px-4 text-sm font-[lato] py-2 rounded-md border border-gray-300 bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select a Disney Resort</option>
                    {DISNEY_LOCATIONS.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="bg-disney-blue text-white px-6 py-3 rounded-lg font-[lato] text-[15px] font-semibold hover:opacity-80 transition-colors duration-300 shadow-[0_4px_8px_-2px_rgba(5,69,83,0.8)]"
                >
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="border border-disney-blue  text-disney-blue px-6 py-3 rounded-lg font-[lato] text-[15px] font-semibold hover:bg-disney-blue hover:text-white transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-light-blue">
      <section className="px-4 pt-8 sm:px-20 sm:pt-20 pb-32">
        <div className="max-w-3xl">
          <div className="space-y-3 mb-8">
            <h1 className="text-4xl font-bold font-[lato]">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-xs font-[lato] font-normal leading-1">
              Last Updated {new Date(profile.lastUpdated).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>

          <div className="space-y-5">

          <div className="flex flex-col gap-1">
          <div>
          <p className="text-lg font-bold font-[lato] leading-5">Age: {calculateAge(profile.birthday)} </p>
          </div>

            </div>

            <div >
              <p className="text-lg font-bold font-[lato] leading-5">Location: {profile.city}, {profile.state}</p>
            </div>

            <div>
              <p className="text-lg font-bold font-[lato] leading-5">Favorite Disney Character: {profile.favoriteCharacter}</p>
            </div>

            <div>
              <p className="text-lg font-bold font-[lato] leading-5">Favorite Disney Movie: {profile.favoriteMovie}</p>
            </div>

            <div>
              <p className="text-lg font-bold font-[lato] leading-5">Favorite Disneyland: {profile.favoriteDisneyland}</p>
            </div>
          </div>

          <div className='pt-10'>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-disney-blue text-white px-6 py-3 rounded-lg font-[lato] text-[15px] font-semibold hover:opacity-80 transition-colors duration-300 shadow-[0_4px_8px_-2px_rgba(5,69,83,0.8)]"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;