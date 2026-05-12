import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { operations, content } from '../data/content';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Gallery = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewType, setViewType] = useState(null); // 'before' or 'after'
  const t = content[language].gallery;
  const isRTL = language === 'ar';

  const openModal = (operation, type) => {
    setSelectedImage(operation);
    setViewType(type);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setViewType(null);
  };

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {operations.map((operation, index) => (
            <motion.div
              key={operation.id}
              initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-center mb-6">
                {isRTL ? operation.nameAr : operation.nameEn}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => openModal(operation, 'before')}
                >
                  <div className="relative overflow-hidden rounded-lg h-48">
                    <img
                      src={operation.beforeImage}
                      alt="Before treatment"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white font-bold">{t.before}</span>
                    </div>
                  </div>
                  <p className="text-center mt-2 text-gray-400">{t.before}</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => openModal(operation, 'after')}
                >
                  <div className="relative overflow-hidden rounded-lg h-48">
                    <img
                      src={operation.afterImage}
                      alt="After treatment"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white font-bold">{t.after}</span>
                    </div>
                  </div>
                  <p className="text-center mt-2 text-gray-400">{t.after}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={viewType === 'before' ? selectedImage.beforeImage : selectedImage.afterImage}
                alt={viewType === 'before' ? 'Before treatment' : 'After treatment'}
                className="w-full rounded-lg"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-2xl hover:text-cyan-400 transition-colors"
              >
                <FaTimes />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-card px-4 py-2">
                <p className="text-white font-semibold">
                  {viewType === 'before' ? t.before : t.after} - {isRTL ? selectedImage.nameAr : selectedImage.nameEn}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;