import { useState } from 'react';
import { motion } from 'framer-motion';
import ArtworkModal from '../components/artwork/ArtworkModal';

interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
}

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Sample artwork data with Pexels stock images
  const artworks = [
    { id: '1', title: 'Abstract Art 1', imageUrl: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '2', title: 'Abstract Art 2', imageUrl: 'https://images.pexels.com/photos/1812960/pexels-photo-1812960.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '3', title: 'Abstract Art 3', imageUrl: 'https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '4', title: 'Abstract Art 4', imageUrl: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '5', title: 'Abstract Art 5', imageUrl: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '6', title: 'Abstract Art 6', imageUrl: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '7', title: 'Abstract Art 7', imageUrl: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '8', title: 'Abstract Art 8', imageUrl: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '9', title: 'Abstract Art 9', imageUrl: 'https://images.pexels.com/photos/2983141/pexels-photo-2983141.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '10', title: 'Abstract Art 10', imageUrl: 'https://images.pexels.com/photos/3246665/pexels-photo-3246665.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '11', title: 'Abstract Art 11', imageUrl: 'https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '12', title: 'Abstract Art 12', imageUrl: 'https://images.pexels.com/photos/3222686/pexels-photo-3222686.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '13', title: 'Abstract Art 13', imageUrl: 'https://images.pexels.com/photos/3705944/pexels-photo-3705944.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '14', title: 'Abstract Art 14', imageUrl: 'https://images.pexels.com/photos/3699270/pexels-photo-3699270.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '15', title: 'Abstract Art 15', imageUrl: 'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '16', title: 'Abstract Art 16', imageUrl: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '17', title: 'Abstract Art 17', imageUrl: 'https://images.pexels.com/photos/3831849/pexels-photo-3831849.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '18', title: 'Abstract Art 18', imageUrl: 'https://images.pexels.com/photos/3836292/pexels-photo-3836292.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '19', title: 'Abstract Art 19', imageUrl: 'https://images.pexels.com/photos/3843284/pexels-photo-3843284.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: '20', title: 'Abstract Art 20', imageUrl: 'https://images.pexels.com/photos/3843279/pexels-photo-3843279.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ];

  const handleImageClick = (artwork: Artwork, index: number) => {
    setSelectedArtwork(artwork);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < artworks.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedArtwork(artworks[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedArtwork(artworks[currentIndex - 1]);
    }
  };

  return (
    <div className="pt-24">
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="section-title">Gallery</h1>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleImageClick(artwork, index)}
              >
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          isOpen={!!selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          hasNext={currentIndex < artworks.length - 1}
          hasPrevious={currentIndex > 0}
        />
      )}
    </div>
  );
};

export default Gallery;