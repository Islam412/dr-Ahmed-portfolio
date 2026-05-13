import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, FaPhone, FaClock, FaEnvelope, FaMapMarkerAlt, 
  FaCheckCircle, FaExclamationCircle, FaSpinner, FaFacebook, 
  FaTiktok, FaUser,
  FaCalendarCheck, FaTooth
} from 'react-icons/fa';
import { content, phoneNumber, socialLinks } from '../data/content';

const Contact = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const t = content[language].contact;
  const isRTL = language === 'ar';

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = isRTL ? 'الاسم مطلوب' : 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = isRTL ? 'الاسم قصير جداً' : 'Name is too short';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = isRTL ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isRTL ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = isRTL ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (!/^[\d\s\+\(\)\-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = isRTL ? 'رقم الهاتف غير صحيح' : 'Invalid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = isRTL ? 'الرسالة مطلوبة' : 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = isRTL ? 'الرسالة قصيرة جداً' : 'Message is too short';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      try {
        const serviceText = formData.service ? 
          `%0A*🦷 Service:* ${formData.service}` : '';
        
        const whatsappMessage = `🏥 *New Appointment Request* 🏥%0A%0A` +
          `👤 *Name:* ${formData.name}%0A` +
          `📧 *Email:* ${formData.email}%0A` +
          `📱 *Phone:* ${formData.phone}%0A` +
          `${serviceText}%0A` +
          `💬 *Message:* ${formData.message}%0A%0A` +
          `📅 *Request Date:* ${new Date().toLocaleString()}`;
        
        window.open(`${socialLinks.whatsapp}?text=${whatsappMessage}`, '_blank');
        
        setSubmitStatus('success');
        
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            service: ''
          });
          setSubmitStatus(null);
        }, 3000);
        
      } catch (error) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 3000);
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const contactInfo = [
    { icon: FaWhatsapp, text: phoneNumber, link: socialLinks.whatsapp, color: 'text-green-400', bg: 'from-green-500/20 to-emerald-500/20', title: isRTL ? 'واتساب' : 'WhatsApp' },
    { icon: FaPhone, text: phoneNumber, link: `tel:${phoneNumber}`, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-blue-500/20', title: isRTL ? 'اتصال مباشر' : 'Direct Call' },
    { icon: FaEnvelope, text: 'info@drahmadmosa.com', link: 'mailto:info@drahmadmosa.com', color: 'text-blue-400', bg: 'from-blue-500/20 to-indigo-500/20', title: 'Email' }
  ];

  const servicesList = [
    'طب الأسنان العام', 'تقويم الأسنان', 'زراعة الأسنان', 'تجميل الأسنان', 
    'علاج الجذور', 'تركيبات الأسنان', 'أمراض اللثة', 'جراحة الفم'
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          <span className="glass-premium px-4 py-2 text-cyan-400 text-sm font-semibold rounded-full inline-block mb-4">
            📞 {isRTL ? 'تواصل معنا' : 'Get In Touch'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-rainbow">{t.title}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="glass-premium p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <FaCalendarCheck className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {isRTL ? 'احجز موعدك الآن' : 'Book Your Appointment Now'}
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {t.name} <span className="text-red-400">*</span>
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                    <FaUser className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-gray-500`} />
                    <input
                      type="text"
                      name="name"
                      placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-white/5 border ${
                        errors.name ? 'border-red-500' : 'border-white/10'
                      } rounded-xl focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <FaExclamationCircle className="text-xs" />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {t.email} <span className="text-red-400">*</span>
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                    <FaEnvelope className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-gray-500`} />
                    <input
                      type="email"
                      name="email"
                      placeholder="example@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-white/5 border ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } rounded-xl focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <FaExclamationCircle className="text-xs" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {t.phone} <span className="text-red-400">*</span>
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'phone' ? 'scale-[1.02]' : ''}`}>
                    <FaPhone className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-gray-500`} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+20 123 456 789"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-white/5 border ${
                        errors.phone ? 'border-red-500' : 'border-white/10'
                      } rounded-xl focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <FaExclamationCircle className="text-xs" />
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {isRTL ? 'الخدمة المطلوبة (اختياري)' : 'Required Service (Optional)'}
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'service' ? 'scale-[1.02]' : ''}`}>
                    <FaTooth className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-gray-500`} />
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:outline-none text-white cursor-pointer appearance-none transition-all duration-300`}
                    >
                      <option value="" className="bg-slate-800">{isRTL ? '-- اختر خدمة --' : '-- Select a service --'}</option>
                      {servicesList.map((service, idx) => (
                        <option key={idx} value={service} className="bg-slate-800">
                          {service}
                        </option>
                      ))}
                    </select>
                    <div className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 pointer-events-none`}>
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {t.message} <span className="text-red-400">*</span>
                  </label>
                  <div className={`transition-all duration-300 ${focusedField === 'message' ? 'scale-[1.02]' : ''}`}>
                    <textarea
                      name="message"
                      placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows="5"
                      className={`w-full px-4 py-3.5 bg-white/5 border ${
                        errors.message ? 'border-red-500' : 'border-white/10'
                      } rounded-xl focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300 resize-none`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <FaExclamationCircle className="text-xs" />
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-glow w-full py-4 rounded-xl flex items-center justify-center gap-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <FaWhatsapp />
                      {t.send}
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500 rounded-xl flex items-center gap-3"
                    >
                      <FaCheckCircle className="text-green-500 text-xl" />
                      <p className="text-green-400">
                        {isRTL ? '✓ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً' : '✓ Message sent successfully! We\'ll contact you soon'}
                      </p>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-4 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500 rounded-xl flex items-center gap-3"
                    >
                      <FaExclamationCircle className="text-red-500 text-xl" />
                      <p className="text-red-400">
                        {isRTL ? '✗ حدث خطأ، يرجى المحاولة مرة أخرى' : '✗ An error occurred, please try again'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 space-y-5"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.02, x: 5 }}
                href={info.link}
                target="_blank"
                className={`glass-premium p-5 flex items-center gap-4 group cursor-pointer bg-gradient-to-r ${info.bg} transition-all duration-300`}
              >
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <info.icon className={`text-3xl ${info.color}`} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{info.title}</p>
                  <p className="text-white font-semibold">{info.text}</p>
                </div>
              </motion.a>
            ))}

            <div className="glass-premium p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                  <FaClock className="text-amber-400 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white">{t.workingHours}</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between items-center">
                  <span>{isRTL ? 'السبت - الأربعاء' : 'Saturday - Wednesday'}</span>
                  <span className="text-cyan-400">10:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{isRTL ? 'الخميس' : 'Thursday'}</span>
                  <span className="text-cyan-400">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{isRTL ? 'الجمعة' : 'Friday'}</span>
                  <span className="text-red-400">{isRTL ? 'أجازة' : 'Closed'}</span>
                </div>
              </div>
            </div>

            <div className="glass-premium p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-xl flex items-center justify-center">
                  <FaMapMarkerAlt className="text-red-400 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white">{isRTL ? 'الموقع' : 'Location'}</h3>
              </div>
              <p className="text-gray-300 mb-4">📍 Cairo, Egypt</p>
              
              <div className="flex justify-center gap-3 pt-3 border-t border-white/10">
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  href={socialLinks.facebook}
                  target="_blank"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-500 transition-all"
                >
                  <FaFacebook />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  href={socialLinks.whatsapp}
                  target="_blank"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 transition-all"
                >
                  <FaWhatsapp />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  href={socialLinks.tiktok}
                  target="_blank"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <FaTiktok />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;