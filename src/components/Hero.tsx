  import React, { useState } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { Calendar, MapPin, Users, Music, Star, X } from 'lucide-react';
  import AnimatedBackground from './AnimatedBackground';
  import CountdownTimer from './CountDownTimer';

  const highlights = [
    { icon: Calendar, text: 'Feb 21-22, 2025' },
    { icon: MapPin, text: 'College Campus', showLocation: true },
    { icon: Users, text: '5000+ Attendees' }
  ];

  function Hero() {
    const [showLocationModal, setShowLocationModal] = useState(false);

    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />

        {/* Content */}
        <div className="mt-12 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Decorative icons */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-24 w-48 h-48 opacity-20"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Music className="w-12 h-12 text-purple-400" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center rotate-45">
                  <Star className="w-12 h-12 text-blue-400" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center rotate-90">
                  <Music className="w-12 h-12 text-pink-400" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center rotate-135">
                  <Star className="w-12 h-12 text-purple-400" />
                </div>
              </motion.div>

              {/* Main title with animated gradient */}
              <motion.h1
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-6xl md:text-8xl font-bold tracking-tight"
              >
                <span className="inline-block relative">
                  <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-50 blur-xl animate-pulse" />
                  <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
                    SUNRISE 2025
                  </span>
                </span>
              </motion.h1>

              {/* Highlights */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex flex-wrap justify-center gap-6"
              >
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full cursor-pointer"
                    onClick={() => item.showLocation && setShowLocationModal(true)}
                  >
                    <item.icon className="w-5 h-5 text-purple-400" />
                    <span className="text-lg text-gray-200">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Experience the ultimate celebration of music, art, and culture at the biggest college festival of the year
              </motion.p>

              {/* Countdown Timer */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12 flex justify-center"
              >
                <CountdownTimer />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Location Modal */}
        <AnimatePresence>
          {showLocationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
              onClick={() => setShowLocationModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 rounded-xl p-6 max-w-lg w-full relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Event Location</h3>
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.2748186755084!2d80.73300209678955!3d16.663125699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35e0d94546c99f%3A0x94dc5f4441a45bab!2sNRI%20Institute%20of%20Technology%20-%20An%20Autonomous%20Engineering%20College%20-%20Vijayawada!5e0!3m2!1sen!2sin!4v1739176714155!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-white">NRI Institute of Technology</h4>
                    <p className="text-gray-300">Agripalli, Nunna - Agiripalli Road</p>
                    <p className="text-gray-300">Vijayawada, Andhra Pradesh 521212</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>
    );
  }

  export default Hero;