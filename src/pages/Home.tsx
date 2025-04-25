import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Featured Artwork" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-white"
          >
            <h1 className="mb-4">Inguna Miluna</h1>
            <p className="text-xl mb-8">{t('home.hero.title')}</p>
            <Link to="/gallery" className="btn bg-[#722F37] hover:bg-[#8B383F] text-white inline-flex items-center">
              {t('home.hero.cta')} <ChevronRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/3094102/pexels-photo-3094102.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Inguna Miluna"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif mb-6">{t('home.about.title')}</h2>
              <p className="text-gray-600 mb-6">{t('home.about.content')}</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif mb-3">{t('home.about.education')}</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>MFA in Fine Arts, Royal Academy of Art</li>
                    <li>BFA in Painting, National Arts University</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif mb-3">{t('home.about.exhibitions')}</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>2023 - "Reflections" - Solo Show, Modern Gallery</li>
                    <li>2022 - "Dimensions" - Group Exhibition, Art Space</li>
                    <li>2020 - "New Perspectives" - Biennale, Contemporary Museum</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="section bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif mb-4 text-[#722F37]">{t('home.contact.title')}</h2>
          <p className="max-w-2xl mx-auto mb-8">{t('home.contact.description')}</p>
          <Link to="/contact" className="btn bg-[#722F37] hover:bg-[#8B383F] text-white">
            {t('home.contact.button')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;