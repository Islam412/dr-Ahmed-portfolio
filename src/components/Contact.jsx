import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaPhone, 
  FaClock, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
  FaTelegram,
  FaGlobe
} from 'react-icons/fa';
import { content, phoneNumber, socialLinks, specializations } from '../data/content';

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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const t = content[language].contact;
  const isRTL = language === 'ar';

  // خدمة التحقق من صحة البيانات
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
      newErrors.message = isRTL ? 'الرسالة قصيرة جداً (10 أحرف على الأقل)' : 'Message is too short (min 10 characters)';
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
    
    // محاكاة إرسال (يمكنك إضافة API حقيقي هنا)
    setTimeout(() => {
      try {
        const serviceText = formData.service ? 
          `%0A*Service:* ${formData.service}` : '';
        
        const whatsappMessage = `🏥 *New Appointment Request* 🏥%0A%0A` +
          `👤 *Name:* ${formData.name}%0A` +
          `📧 *Email:* ${formData.email}%0A` +
          `📱 *Phone:* ${formData.phone}%0A` +
          `${serviceText}%0A` +
          `💬 *Message:* ${formData.message}%0A%0A` +
          `📅 *Request Date:* ${new Date().toLocaleString()}`;
        
        window.open(`${socialLinks.whatsapp}?text=${whatsappMessage}`, '_blank');
        
        setSubmitStatus('success');
        
        // إعادة تعيين النموذج بعد 2 ثانية
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
    // مسح الخطأ عند الكتابة
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const contactInfo = [
    { 
      icon: FaWhatsapp, 
      text: phoneNumber, 
      link: socialLinks.whatsapp, 
      color: 'text-green-400',
      bgHover: 'hover:bg-green-500/10',
      title: isRTL ? 'واتساب' : 'WhatsApp'
    },
    { 
      icon: FaPhone, 
      text: phoneNumber, 
      link: `tel:${phoneNumber}`, 
      color: 'text-cyan-400',
      bgHover: 'hover:bg-cyan-500/10',
      title: isRTL ? 'اتصال مباشر' : 'Direct Call'
    },
    { 
      icon: FaEnvelope, 
      text: 'info@drahmadmosa.com', 
      link: 'mailto:info@drahmadmosa.com', 
      color: 'text-blue-400',
      bgHover: 'hover:bg-blue-500/10',
      title: isRTL ? 'البريد الإلكتروني' : 'Email'
    }
  ];

  const socialMedia = [
    { icon: FaFacebook, link: socialLinks.facebook, color: 'hover:text-blue-500', name: 'Facebook' },
    { icon: FaInstagram, link: socialLinks.instagram, color: 'hover:text-pink-500', name: 'Instagram' },
    { icon: FaTiktok, link: socialLinks.tiktok, color: 'hover:text-gray-500', name: 'TikTok' }
  ];

  const workingHoursDetails = [
    { day: isRTL ? 'السبت - الأربعاء' : 'Saturday - Wednesday', hours: '10:00 AM - 8:00 PM' },
    { day: isRTL ? 'الخميس' : 'Thursday', hours: '10:00 AM - 2:00 PM' },
    { day: isRTL ? 'الجمعة' : 'Friday', hours: isRTL ? 'أجازة' : 'Closed' }
  ];

  const servicesList = specializations.slice(0, 6);

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="glass-card px-4 py-2 text-cyan-400 text-sm font-semibold rounded-full">
              {isRTL ? 'تواصل معنا' : 'Get In Touch'}
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaEnvelope className="text-cyan-400" />
                {isRTL ? 'أرسل استفسارك' : 'Send Your Inquiry'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {t.name} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 rounded-xl border ${
                      errors.name ? 'border-red-500' : 'border-white/10'
                    } focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300`}
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  />
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

                {/* Email Field */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {t.email} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={isRTL ? 'example@domain.com' : 'example@domain.com'}
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 rounded-xl border ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    } focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300`}
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  />
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

                {/* Phone Field */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {t.phone} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={isRTL ? '+20 123 456 789' : '+20 123 456 789'}
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 rounded-xl border ${
                      errors.phone ? 'border-red-500' : 'border-white/10'
                    } focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300`}
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  />
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

                {/* Service Selection */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {isRTL ? 'الخدمة المطلوبة (اختياري)' : 'Required Service (Optional)'}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-cyan-500 focus:outline-none text-white cursor-pointer transition-all duration-300"
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  >
                    <option value="" className="bg-gray-800">
                      {isRTL ? '-- اختر خدمة --' : '-- Select a service --'}
                    </option>
                    {servicesList.map((service, idx) => (
                      <option key={idx} value={isRTL ? service.nameAr : service.nameEn} className="bg-gray-800">
                        {isRTL ? service.nameAr : service.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {t.message} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 bg-white/5 rounded-xl border ${
                      errors.message ? 'border-red-500' : 'border-white/10'
                    } focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300 resize-none`}
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  />
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

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-green-500/50'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <FaWhatsapp className="text-xl" />
                      {t.send}
                    </>
                  )}
                </motion.button>

                {/* Success/Error Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-4 bg-green-500/20 border border-green-500 rounded-xl flex items-center gap-3"
                    >
                      <FaCheckCircle className="text-green-500 text-xl" />
                      <p className="text-green-400">
                        {isRTL ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً' : 'Message sent successfully! We\'ll contact you soon'}
                      </p>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-4 bg-red-500/20 border border-red-500 rounded-xl flex items-center gap-3"
                    >
                      <FaExclamationCircle className="text-red-500 text-xl" />
                      <p className="text-red-400">
                        {isRTL ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'An error occurred, please try again'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* Contact Info - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            {/* Working Hours */}
            <div className="glass-card p-8 rounded-2xl group hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FaClock className="text-3xl text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold">{t.workingHours}</h3>
              </div>
              <div className="space-y-3">
                {workingHoursDetails.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-gray-300">{item.day}</span>
                    <span className={`font-semibold ${item.hours === 'Closed' || item.hours === 'أجازة' ? 'text-red-400' : 'text-cyan-400'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                whileHover={{ x: 5, scale: 1.02 }}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-card p-6 rounded-2xl flex items-center gap-4 group cursor-pointer transition-all duration-300 ${info.bgHover} hover:border-${info.color.split('-')[1]}-500/50`}
              >
                <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <info.icon className={`text-3xl ${info.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm text-gray-400 mb-1">{info.title}</h4>
                  <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
                    {info.text}
                  </span>
                </div>
              </motion.a>
            ))}

            {/* Location */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <FaMapMarkerAlt className="text-3xl text-red-400" />
                </div>
                <h3 className="text-xl font-bold">{isRTL ? 'الموقع' : 'Location'}</h3>
              </div>
              <p className="text-gray-300 mb-4">
                {isRTL ? 'القاهرة، مصر' : 'Cairo, Egypt'}
              </p>
              <div className="h-40 rounded-xl overflow-hidden">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.0!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841a0ec84d7b1%3A0x9b2a6f5b8c5d7e3!2z2YXYs9mC2YjYp9ip!5e0!3m2!1sar!2seg!4v1699999999999!5m2!1sar!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4 text-center">
                {isRTL ? 'تابعني على وسائل التواصل' : 'Follow Me On Social Media'}
              </h3>
              <div className="flex justify-center gap-4">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass-card p-3 rounded-full text-gray-300 ${social.color} transition-all duration-300 hover:shadow-lg hover:shadow-${social.color.split('-')[1]}-500/30`}
                    title={social.name}
                  >
                    <social.icon className="text-2xl" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Response Note */}
            <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
              <div className="flex items-center gap-3">
                <div className="text-4xl">⚡</div>
                <div>
                  <p className="text-cyan-400 font-semibold">
                    {isRTL ? 'رد سريع خلال 24 ساعة' : 'Quick Response Within 24 Hours'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {isRTL ? 'سنرد على استفسارك في أقرب وقت ممكن' : 'We will respond to your inquiry as soon as possible'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;