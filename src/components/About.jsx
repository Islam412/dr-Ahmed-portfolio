import { motion } from 'framer-motion';
import { FaSmile, FaTooth, FaUserMd, FaCertificate, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { content, doctorImages, socialLinks } from '../data/content';

const About = ({ language }) => {
  const t = content[language].about;
  const isRTL = language === 'ar';

  const stats = [
    { icon: FaSmile, value: '15+', labelAr: 'خبرة طويلة', labelEn: 'Years Experience' },
    { icon: FaUserMd, value: '5000+', labelAr: 'مرضى سعداء', labelEn: 'Happy Patients' },
    { icon: FaTooth, value: '99%', labelAr: 'نسبة رضا', labelEn: 'Satisfaction Rate' },
    { icon: FaCertificate, value: '10+', labelAr: 'شهادة معتمدة', labelEn: 'Certifications' }
  ];

  const socialIcons = [
    { icon: FaFacebook, link: socialLinks.facebook, color: 'hover:text-blue-500' },
    { icon: FaInstagram, link: socialLinks.instagram, color: 'hover:text-pink-500' },
    { icon: FaTiktok, link: socialLinks.tiktok, color: 'hover:text-gray-500' }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
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
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="grid grid-cols-2 gap-4">
              {doctorImages.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={img}
                    alt={`Dr. Ahmed Mosa ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="glass-card p-4 text-center"
                >
                  <stat.icon className="text-3xl text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">
                    {isRTL ? stat.labelAr : stat.labelEn}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.description1}
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t.description2}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1, y: -3 }}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card p-3 rounded-full text-gray-300 transition-colors duration-300 ${social.color}`}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;