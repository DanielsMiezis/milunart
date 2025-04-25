import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Artwork } from '../../services/firebase';
import ArtworkItem from './ArtworkItem';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ArtworkGridProps {
  artworks: Artwork[];
  loading?: boolean;
}

const ArtworkGrid: React.FC<ArtworkGridProps> = ({ artworks, loading = false }) => {
  const [visibleArtworks, setVisibleArtworks] = useState<Artwork[]>([]);
  
  useEffect(() => {
    if (!loading && artworks.length > 0) {
      // Add artworks gradually for a staggered animation effect
      const timer = setTimeout(() => {
        setVisibleArtworks(artworks);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [artworks, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (artworks.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-500">No artworks found</p>
      </div>
    );
  }

  return (
    <div className="image-grid">
      {visibleArtworks.map((artwork, index) => (
        <motion.div
          key={artwork.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut"
          }}
        >
          <ArtworkItem artwork={artwork} />
        </motion.div>
      ))}
    </div>
  );
};

export default ArtworkGrid;