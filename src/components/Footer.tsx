
import { motion } from 'framer-motion';
import { Linkedin, MessageCircle, Facebook, Instagram, Twitter, Share2 } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'bn';
}

const Footer = ({ language }: FooterProps) => {
  const footerData = {
    title: {
      en: 'Connect with me',
      bn: 'আমার সাথে যুক্ত হোন',
    },
    social: {
      links: [
        {
          icon: <Linkedin size={24} />,
          href: 'https://www.linkedin.com/in/ridoan2007',
          color: 'hover:text-blue-400',
          label: 'LinkedIn',
        },
        {
          icon: <MessageCircle size={24} />,
          href: 'https://wa.me/8801712525910',
          color: 'hover:text-green-400',
          label: 'WhatsApp',
        },
        {
          icon: <Facebook size={24} />,
          href: 'https://www.facebook.com/ridoan2007',
          color: 'hover:text-blue-500',
          label: 'Facebook',
        },
        {
          icon: <Instagram size={24} />,
          href: 'https://www.instagram.com/ridoan2007',
          color: 'hover:text-pink-400',
          label: 'Instagram',
        },
        {
          icon: <Twitter size={24} />,
          href: 'https://x.com/ridoan2007',
          color: 'hover:text-sky-400',
          label: 'Twitter',
        },
      ],
    },
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="p-3 bg-gray-800/50 rounded-full mb-4">
            <Share2 className="text-gray-300" size={24} />
          </div>
          <h4 className="text-lg sm:text-xl font-bold mb-6 text-center">
            {footerData.title[language]}
          </h4>
          <div className="flex justify-center flex-wrap gap-4 sm:gap-6">
            {footerData.social.links.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 bg-gray-800/50 rounded-full text-gray-300 ${social.color} transition-all duration-300 hover:bg-gray-700/50 hover:shadow-lg`}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400"
          >
            <p>© 2024 Md Ridoan Mahmud Zisan. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
