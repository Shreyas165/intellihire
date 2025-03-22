import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureBoxProps {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ icon: Icon, title, description, gradient, iconColor }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Decorative Gradient Circle */}
      <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} opacity-10 transition-transform duration-500 group-hover:scale-150`} />

      {/* Icon Container */}
      <div className={`mb-4 inline-block rounded-lg ${iconColor} p-3 text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="h-6 w-6" />
      </div>

      {/* Title and Description */}
      <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">{title}</h3>
      <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{description}</p>

      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
    </div>
  );
};

export default FeatureBox;