
import { useEffect, useState, useCallback } from "react";

interface LoaderOverlayProps {
  onComplete: () => void;
}

const LoaderOverlay = ({ onComplete }: LoaderOverlayProps) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = useCallback(() => {
    try {
      console.log('Calling onComplete callback');
      onComplete();
    } catch (err) {
      console.error('Error in onComplete callback:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [onComplete]);

  useEffect(() => {
    console.log('LoaderOverlay mounted, starting progress...');
    
    try {
      const interval = setInterval(() => {
        setProgress((prev) => {
          try {
            const newProgress = prev + 4;
            console.log('Progress update:', prev, '->', newProgress);
            
            if (newProgress >= 100) {
              console.log('Progress complete, clearing interval and calling onComplete...');
              clearInterval(interval);
              setTimeout(() => {
                handleComplete();
              }, 300);
              return 100;
            }
            return newProgress;
          } catch (err) {
            console.error('Error in progress update:', err);
            setError(err instanceof Error ? err.message : 'Progress update error');
            clearInterval(interval);
            return prev;
          }
        });
      }, 60);

      // Cleanup function
      return () => {
        console.log('LoaderOverlay unmounting, clearing interval');
        clearInterval(interval);
      };
    } catch (err) {
      console.error('Error setting up loader interval:', err);
      setError(err instanceof Error ? err.message : 'Setup error');
    }
  }, [handleComplete]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <p className="text-lg font-semibold">Loading Error</p>
            <p className="text-sm">{error}</p>
          </div>
          <button 
            onClick={handleComplete}
            className="bg-ocean-600 hover:bg-ocean-700 text-white px-4 py-2 rounded"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    );
  }

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
