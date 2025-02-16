import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Check, Star, Music, Youtube, Instagram, Linkedin } from 'lucide-react';

const Tickets = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const handleConnectClick = (platform: string) => {
    setSelectedPlatform(platform);
    setIsFormVisible(true);
  };

  const handleSocialRedirect = () => {
    const urls = {
      linkedin: 'https://www.linkedin.com/company/datascience-nriit',
      youtube: 'https://www.youtube.com/@NRIIT-CSEDATASCIENCE',
      instagram: 'https://www.instagram.com/datasciencenriit/'
    };
    window.open(urls[selectedPlatform as keyof typeof urls], '_blank');
  };

  const socialCards = [
    {
      platform: 'linkedin',
      title: 'LinkedIn',
      description: 'Connect with  LinkedIn',
      icon: <Linkedin className="w-6 h-6 mr-2 text-purple-400" />,
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      platform: 'youtube',
      title: 'YouTube',
      description: 'Subscribe to our YouTube channel',
      icon: <Youtube className="w-6 h-6 mr-2 text-red-400" />,
      gradient: 'from-red-600 to-pink-600'
    },
    {
      platform: 'instagram',
      title: 'Instagram',
      description: 'Follow us on Instagram',
      icon: <Instagram className="w-6 h-6 mr-2 text-pink-400" />,
      gradient: 'from-pink-600 to-purple-600'
    }
  ];

  return (
    <section id="Contact-Us" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(0,0,0,1))]" />

        {/* Animated circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full mix-blend-screen filter blur-xl"
            style={{
              background: `radial-gradient(circle, ${
                i === 0 ? 'rgba(147,51,234,0.3)' : i === 1 ? 'rgba(59,130,246,0.3)' : 'rgba(236,72,153,0.3)'
              } 0%, transparent 70%)`,
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Decorative icons */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 -top-10 -translate-x-1/2 w-20 h-20 opacity-20"
          >
            <Star className="absolute top-0 left-0 w-6 h-6 text-purple-400" />
            <Music className="absolute top-0 right-0 w-6 h-6 text-blue-400" />
            <Star className="absolute bottom-0 left-0 w-6 h-6 text-pink-400" />
            <Music className="absolute bottom-0 right-0 w-6 h-6 text-purple-400" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold relative">
            <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-50 blur-xl animate-pulse" />
            <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              Connect with Us
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {socialCards.map((card, index) => (
            <motion.div
              key={card.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-xl blur-xl group-hover:opacity-50 transition-opacity opacity-0`} />
              <div className="relative rounded-xl p-8 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  {card.icon}
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                    {card.title}
                  </h3>
                </div>
                <div className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
                  Let's Connect!
                </div>
                <ul className="space-y-3 mb-8">
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start"
                  >
                    <Check className="w-5 h-5 mr-2 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{card.description}</span>
                  </motion.li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleConnectClick(card.platform)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold bg-gradient-to-r ${card.gradient} text-white hover:shadow-lg hover:shadow-purple-500/25`}
                >
                  Connect
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connect Form */}
        {isFormVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30 rounded-xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                Connect with DataScience NRIIT
              </h3>
              <p className="text-gray-300 mb-6">
                Click the button below to visit our {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} page and connect with us.
              </p>
              <button
                onClick={handleSocialRedirect}
                className="w-full py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
              >
                Go to {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
              </button>
              <button
                onClick={() => setIsFormVisible(false)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Tickets;