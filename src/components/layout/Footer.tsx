import { Mail, Facebook, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="logo text-2xl mb-4">IngunaMiluna</h3>
            <p className="text-gray-600 mb-4">{t('footer.description')}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#722F37]">{t('footer.contact')}</h4>
            <address className="not-italic text-gray-600">
              <div className="flex items-center mb-2">
                <Mail size={20} className="mr-2 text-[#722F37]" />
                <a href="mailto:contact@ingunamailuna.com" className="hover:text-[#722F37] transition-colors">
                  contact@ingunamailuna.com
                </a>
              </div>
              <p>{t('footer.studio')}</p>
            </address>
          </div>

          <div className="md:text-right">
            <h4 className="font-semibold mb-4 text-[#722F37]">Social Media</h4>
            <div className="flex md:justify-end space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#722F37] transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#722F37] transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Inguna Miluna. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;