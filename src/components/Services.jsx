import { motion } from 'framer-motion';
import * as Icons from 'react-icons/fa';
import { specializations, content } from '../data/content';

const Services = ({ language }) => {
  const t = content[language].services;
  const isRTL = language === 'ar';

  const getIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon className="text-4xl text-cyan-400" /> : <Icons.FaTooth className="text-4xl text-cyan-400" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {specializations.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-6 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 group cursor-pointer"
              style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isRTL ? service.nameAr : service.nameEn}
              </h3>
              <p className="text-gray-400 text-sm">
                {isRTL ? service.descAr : service.descEn}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;