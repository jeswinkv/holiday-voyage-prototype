
import { useEffect, useState } from "react";

interface LoaderOverlayProps {
  onComplete: () => void;
}

const LoaderOverlay = ({ onComplete }: LoaderOverlayProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('LoaderOverlay mounted, starting progress...');
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        console.log('Progress:', newProgress);
        
        if (newProgress >= 100) {
          console.log('Progress complete, calling onComplete...');
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, 50); // Reduced interval for faster loading

    return () => {
      console.log('LoaderOverlay unmounting, clearing interval');
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            alt="Loading"
            className="w-24 h-24 rounded-full mx-auto mb-4 animate-pulse"
          />
          <h2 className="text-2xl font-bold text-ocean-700 mb-2">IBS Holidays</h2>
          <p className="text-gray-600">Preparing your perfect vacation...</p>
        </div>
        
        <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
          <div 
            className="bg-ocean-600 h-2 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-500 mt-4">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default LoaderOverlay;
