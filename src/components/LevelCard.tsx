import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { LucideIcon } from 'lucide-react';

interface LevelCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
  buttonText: string;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
  buttonText,
}) => {
  return (
    <Card 
      className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-2 bg-white/80 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 h-full flex flex-col" 
      onClick={onClick}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
      </div>

      <CardHeader className="relative z-10 flex-1">
        <div className="relative mb-6">
          {/* Glow effect behind icon */}
          <div className={`absolute inset-0 ${color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-110`}></div>
          
          {/* Icon container */}
          <div className={`relative w-20 h-20 rounded-2xl ${color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
            <Icon className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
        </div>
        
        <CardTitle className="text-2xl mb-2 group-hover:text-emerald-600 transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 pb-8">
        <Button 
          className="w-full text-lg py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
        >
          <span className="flex items-center gap-2">
            {buttonText}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </Button>
      </CardContent>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </Card>
  );
};
