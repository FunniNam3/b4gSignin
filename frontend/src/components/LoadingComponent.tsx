import React from 'react';

interface LoadingComponentProps {
  message?: string;
  fullPage?: boolean;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ 
  message = "Loading...", 
  fullPage = false 
}) => {
  const containerClasses = fullPage 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0e121a]/80 backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px]";

  return (
    <div className={containerClasses} id="loading-component">
      <div className="relative flex items-center justify-center">
        {/* Outer Glow */}
        <div className="absolute w-20 h-20 rounded-full bg-blue-500/10 blur-2xl animate-pulse"></div>
        
        {/* Spinner */}
        <div className="relative">
          <svg 
            className="animate-spin h-14 w-14 text-blue-500" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-20" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="3"
            ></circle>
            <path 
              className="opacity-80" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          
          {/* Inner Dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
        </div>
      </div>
      
      {/* Message */}
      <div className="mt-6 flex flex-col items-center gap-1">
        <p className="text-[#eaeae9] text-sm font-semibold tracking-[0.2em] uppercase opacity-90">
          {message}
        </p>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
