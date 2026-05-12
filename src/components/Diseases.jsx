import { motion } from 'framer-motion';
import { 
  FaExclamationTriangle, 
  FaTooth, 
  FaBacteria,
  FaVirus
} from 'react-icons/fa';
import { content, diseases } from '../data/content';

const Diseases = ({ language }) => {
  const t = content[language].diseases;
  const isRTL = language === 'ar';

  const getIcon = (index) => {
    const icons = [FaExclamationTriangle, FaTooth, FaBacteria, FaVirus];
    const Icon = icons[index % icons.length];
    return <Icon className="text-3xl text-white" />;
  };

  return (
    <section id="diseases" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-900/50 to-purple-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          <span className="glass-premium px-4 py-2 text-red-400 text-sm font-semibold rounded-full inline-block mb-4">
            🏥 {isRTL ? 'الأمراض التي أعالجها' : 'Diseases I Treat'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-rainbow">{t.title}</span>
          </h2>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((disease, index) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-premium overflow-hidden h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={disease.image}
                    alt={isRTL ? disease.nameAr : disease.nameEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    {getIcon(index)}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">
                      {isRTL ? disease.nameAr : disease.nameEn}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {isRTL ? disease.descAr : disease.descEn}
                  </p>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-red-400 font-semibold">
                      ⚠️ {isRTL ? 'الأعراض:' : 'Symptoms:'}
                    </span>
                    <span className="text-gray-400">
                      {isRTL ? disease.symptomsAr : disease.symptomsEn}
                    </span>
                  </div>
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