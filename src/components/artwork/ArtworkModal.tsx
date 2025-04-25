import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Artwork } from '../../services/firebase';

interface ArtworkModalProps {
  artwork: Artwork;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ 
  artwork, 
  isOpen, 
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' && onNext && hasNext) {
      onNext();
    } else if (e.key === 'ArrowLeft' && onPrevious && hasPrevious) {
      onPrevious();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={handleBackgroundClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <motion.div 
            className="relative bg-white rounded-lg max-w-5xl max-h-[90vh] overflow-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-1.5 shadow-md"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {hasPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {hasNext && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-full">
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title}
                  className="w-full h-full object-cover max-h-[80vh]"
                />
              </div>
              
              <div className="p-6 flex flex-col">
                <h2 className="text-2xl font-serif mb-2">{artwork.title}</h2>
                
                <div className="space-y-4 mt-4">
                  {artwork.year && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Year</h4>
                      <p>{artwork.year}</p>
                    </div>
                  )}
                  
                  {artwork.medium && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Medium</h4>
                      <p>{artwork.medium}</p>
                    </div>
                  )}
                  
                  {artwork.dimensions && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Dimensions</h4>
                      <p>{artwork.dimensions}</p>
                    </div>
                  )}
                  
                  {artwork.description && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Description</h4>
                      <p className="text-gray-700">{artwork.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ArtworkModal;