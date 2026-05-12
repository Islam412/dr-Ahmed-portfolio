import { motion } from 'framer-motion';
import { 
  FaTooth, 
  FaMicroscope, 
  FaCrown, 
  FaSmile, 
  FaChild, 
  FaSyringe, 
  FaXRay, 
  FaHeartbeat,
  FaTeeth,
  FaUserMd
} from 'react-icons/fa';
import { content } from '../data/content';

const Services = ({ language }) => {
  const t = content[language].services;
  const isRTL = language === 'ar';

  const servicesList = [
    { icon: FaTooth, name: 'طب الأسنان العام', nameEn: 'General Dentistry', desc: 'الكشف، الحشو، تنظيف الأسنان', color: 'from-cyan-500 to-blue-500' },
    { icon: FaTeeth, name: 'تقويم الأسنان', nameEn: 'Orthodontics', desc: 'تعديل اعوجاج الأسنان', color: 'from-blue-500 to-indigo-500' },
    { icon: FaMicroscope, name: 'علاج الجذور', nameEn: 'Root Canal', desc: 'علاج التهاب عصب الأسنان', color: 'from-indigo-500 to-purple-500' },
    { icon: FaCrown, name: 'تركيبات الأسنان', nameEn: 'Dental Prosthetics', desc: 'التيجان والكباري', color: 'from-purple-500 to-pink-500' },
    { icon: FaSmile, name: 'تجميل الأسنان', nameEn: 'Cosmetic Dentistry', desc: 'تبييض، فينير، ابتسامة هوليود', color: 'from-pink-500 to-rose-500' },
    { icon: FaChild, name: 'طب أسنان الأطفال', nameEn: 'Pediatric Dentistry', desc: 'علاج ومتابعة أسنان الأطفال', color: 'from-rose-500 to-orange-500' },
    { icon: FaSyringe, name: 'زراعة الأسنان', nameEn: 'Dental Implants', desc: 'تعويض الأسنان المفقودة', color: 'from-orange-500 to-amber-500' },
    { icon: FaXRay, name: 'أشعة الفم', nameEn: 'Dental Radiology', desc: 'تصوير وتحليل الأشعة', color: 'from-amber-500 to-yellow-500' },
    { icon: FaHeartbeat, name: 'أمراض اللثة', nameEn: 'Gum Diseases', desc: 'علاج التهاب اللثة', color: 'from-yellow-500 to-lime-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="glass-premium px-4 py-2 text-cyan-400 text-sm font-semibold rounded-full">
              🦷 {isRTL ? 'ما أقدمه لك' : 'What I Offer'}
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-rainbow">{t.title}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesList.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="glass-premium p-6 h-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`}></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <IconComponent className="text-white text-2xl" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      {isRTL ? service.name : service.nameEn}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                    
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      className={`h-0.5 bg-gradient-to-r ${service.color} mt-4 rounded-full`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;