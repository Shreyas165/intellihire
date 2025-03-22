import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import AuthModal from './AuthModal';

interface Feature {
  icon: LucideIcon;
  text: string;
}

interface UserContainerProps {
  type: 'candidate' | 'interviewer';
  title: string;
  description: string;
  features: Feature[];
  onButtonClick?: () => void;
}

const UserContainer: React.FC<UserContainerProps> = ({ type, title, description, features, onButtonClick }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Decorative Gradient Circle */}
      <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${type === 'candidate' ? 'from-blue-500 to-purple-600' : 'from-green-500 to-teal-600'} opacity-10 transition-transform duration-500 group-hover:scale-150`} />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">{title}</h3>
        <p className="text-gray-700 mb-6 group-hover:text-gray-900 transition-colors duration-300">{description}</p>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
              <feature.icon className="h-5 w-5 mr-3 text-indigo-500 group-hover:text-indigo-600 transition-colors duration-300" />
              {feature.text}
            </li>
          ))}
        </ul>

        <button
          onClick={handleButtonClick}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Get Started
        </button>
      </div>

      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        userType={type}
      />
    </div>
  );
};

export default UserContainer;