import { motion } from 'framer-motion';
import { diseases, content } from '../data/content';

const Diseases = ({ language }) => {
  const t = content[language].diseases;
  const isRTL = language === 'ar';

  return (
    <section id="diseases" className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent to-cyan-950/20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diseases.map((disease, index) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass-card overflow-hidden group"
              style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={disease.image}
                  alt={isRTL ? disease.nameAr : disease.nameEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">
                    {isRTL ? disease.nameAr : disease.nameEn}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-3">
                  {isRTL ? disease.descAr : disease.descEn}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-cyan-400 font-semibold">
                    {isRTL ? 'الأعراض:' : 'Symptoms:'}
                  </span>
                  <span className="text-gray-400">
                    {isRTL ? disease.symptomsAr : disease.symptomsEn}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Diseases;