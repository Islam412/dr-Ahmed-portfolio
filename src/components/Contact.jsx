import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaClock, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { content, phoneNumber, socialLinks } from '../data/content';

const Contact = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const t = content[language].contact;
  const isRTL = language === 'ar';

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `*New Appointment Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Message:* ${formData.message}`;
    window.open(`${socialLinks.whatsapp}?text=${whatsappMessage}`, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    { icon: FaWhatsapp, text: phoneNumber, link: socialLinks.whatsapp, color: 'text-green-400' },
    { icon: FaPhone, text: phoneNumber, link: `tel:${phoneNumber}`, color: 'text-cyan-400' },
    { icon: FaEnvelope, text: 'info@drahmadmosa.com', link: 'mailto:info@drahmadmosa.com', color: 'text-blue-400' }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
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

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t.name}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-400 transition-colors"
                  style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder={t.email}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-400 transition-colors"
                  style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder={t.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-400 transition-colors"
                  style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                />
              </div>
              <div className="mb-6">
                <textarea
                  name="message"
                  placeholder={t.message}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-400 transition-colors resize-none"
                  style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaWhatsapp />
                {t.send}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaClock className="text-3xl text-cyan-400" />
                <h3 className="text-xl font-bold">{t.workingHours}</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>{t.satWed}</p>
                <p>{t.thu}</p>
                <p>{t.fri}</p>
              </div>
            </div>

            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                whileHover={{ x: 5 }}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 flex items-center gap-4 group cursor-pointer"
              >
                <info.icon className={`text-3xl ${info.color} group-hover:scale-110 transition-transform`} />
                <span className="text-gray-300 group-hover:text-white transition-colors">{info.text}</span>
              </motion.a>
            ))}

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <FaMapMarkerAlt className="text-3xl text-red-400" />
                <h3 className="text-xl font-bold">{isRTL ? 'الموقع' : 'Location'}</h3>
              </div>
              <p className="text-gray-300">
                {isRTL ? 'القاهرة، مصر' : 'Cairo, Egypt'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;