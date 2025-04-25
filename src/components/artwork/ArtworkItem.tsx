import { useState } from 'react';
import { Artwork } from '../../services/firebase';
import ArtworkModal from './ArtworkModal';

interface ArtworkItemProps {
  artwork: Artwork;
  showDetails?: boolean;
}

const ArtworkItem: React.FC<ArtworkItemProps> = ({ artwork, showDetails = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        className="image-container cursor-pointer rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        onClick={openModal}
      >
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {showDetails && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
            <h3 className="text-lg font-medium">{artwork.title}</h3>
            {artwork.year && <p className="text-sm">{artwork.year}</p>}
          </div>
        )}
      </div>
      
      <ArtworkModal 
        artwork={artwork} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

export default ArtworkItem;