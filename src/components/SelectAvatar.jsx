import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SelectAvatar = ({ onAvatarSelect, required = false , setIndex}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [touched, setTouched] = useState(false);

  const avatarOpts = [
    '../../src/assets/images/profile-image1.png',
    '../../src/assets/images/profile-image2.png',
    '../../src/assets/images/profile-image3.png',
    '../../src/assets/images/profile-image4.avif',
  ];

  const handleAvatarSelect = (avatar, index) => {
    setSelectedAvatar(avatar);
    setIsExpanded(false);
    setTouched(true);
    
    // Call setIndex with the selected avatar's index
    if (setIndex) setIndex(index);
    
    if (onAvatarSelect) onAvatarSelect(avatar);
  };

  const isInvalid = required && !selectedAvatar && touched;

  return (
    <div className="relative w-full">
      <div 
        className={`border rounded-lg shadow-sm 
          ${isInvalid ? 'border-red-500' : 'border-gray-300'}`}
      >
        {/* Collapsed/Selected State */}
        <div 
          className="flex items-center justify-between p-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {selectedAvatar ? (
            <img 
              src={selectedAvatar} 
              alt="Selected Avatar" 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="text-gray-500">
              {required ? 'Select Avatar *' : 'No Image Selected'}
            </div>
          )}
          
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </div>

        {/* Expanded Avatar Options */}
        {isExpanded && (
          <div 
            className="absolute z-10 top-full left-0 w-full max-h-80 
                       overflow-y-auto bg-white border rounded-b-lg shadow-lg"
          >
            {avatarOpts.map((avatar, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleAvatarSelect(avatar)}
              >
                <img 
                  src={avatar} 
                  alt={`Avatar ${index + 1}`} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <span>Avatar {index + 1}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {isInvalid && (
        <p className="text-red-500 text-sm mt-1">
          Avatar selection is required
        </p>
      )}
    </div>
  );
};

export default SelectAvatar;