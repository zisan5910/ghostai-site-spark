import { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '../lib/utils';

interface NavigationProps {
  navigationItems: Array<{
    id: string;
    icon: JSX.Element;
    target?: string;
  }>;
  activeSection: string;
  scrollToSection: (section: string) => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
}

const Navigation = ({
  navigationItems,
  activeSection,
  scrollToSection,
  language,
  setLanguage,
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getIconColor = (id: string) => {
    const colors = {
      profile: 'text-indigo-500',
      education: 'text-blue-500',
      courses: 'text-emerald-500',
      experience: 'text-amber-500',
      certificates: 'text-red-500',
      skills: 'text-purple-500',
      family: 'text-pink-500',
      contact: 'text-cyan-500',
      share: 'text-teal-500',
    };
    return colors[id.toLowerCase()] || 'text-gray-500';
  };

  return (
    <motion.nav
      ref={ref}
      initial={{ y: -100 }}
      animate={{
        y: 0,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.75)',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        'backdrop-blur-xl border-b border-gray-200/50'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(241, 245, 249, 0.7)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(item.target || item.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200',
                  activeSection === (item.target || item.id)
                    ? 'bg-gray-100/80 text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <motion.div
                  animate={{
                    rotate: activeSection === (item.target || item.id) ? [0, 360] : 0,
                  }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  className={cn('w-5 h-5', getIconColor(item.id))}
                >
                  {item.icon}
                </motion.div>
                <motion.span 
                  className="font-medium text-sm"
                  animate={{
                    fontWeight: activeSection === (item.target || item.id) ? 600 : 500
                  }}
                >
                  {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                </motion.span>
              </motion.button>
            ))}
          </div>

          {/* Language Toggle Button with Translate Icon - Updated to match ghost theme */}
          <motion.button
            whileHover={{ 
              scale: 1.1,
              rotate: [0, 10, -10, 0],
              backgroundColor: 'rgba(124, 58, 237, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className={cn(
              'p-2 rounded-full transition-all duration-300',
              'text-purple-700 hover:text-purple-800',
              'border border-purple-300 hover:border-purple-400',
              'focus:outline-none focus:ring-2 focus:ring-purple-400/30',
              'bg-purple-50/50 hover:bg-purple-50'
            )}
            aria-label="Toggle language"
          >
            <motion.div
              key={language}
              initial={{ rotate: 0 }}
              animate={{ rotate: language === 'en' ? 0 : 180 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <Languages size={20} className="text-current" />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: 'auto',
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50"
            >
              <div className="px-2 pt-2 pb-3 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      scrollToSection(item.target || item.id);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                      activeSection === (item.target || item.id)
                        ? 'bg-gray-100/80 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                    )}
                  >
                    <motion.div
                      animate={{
                        rotate: activeSection === (item.target || item.id) ? 360 : 0,
                      }}
                      transition={{ duration: 0.6 }}
                      className={cn('w-6 h-6', getIconColor(item.id))}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="font-medium text-sm">
                      {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
