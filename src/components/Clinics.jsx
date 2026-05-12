import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { content } from '../data/content';

const Clinics = ({ language }) => {
  const t = content[language].clinics;
  const schedule = content[language].schedule;
  const isRTL = language === 'ar';
  const [selectedClinic, setSelectedClinic] = useState('cairo');
  const [selectedDay, setSelectedDay] = useState('saturday');
  const [showMap, setShowMap] = useState(true);

  const clinics = t.clinicsList;
  const currentClinic = clinics[selectedClinic];

  const weekDays = [
    { id: 'saturday', name: schedule.days.saturday },
    { id: 'sunday', name: schedule.days.sunday },
    { id: 'monday', name: schedule.days.monday },
    { id: 'tuesday', name: schedule.days.tuesday },
    { id: 'wednesday', name: schedule.days.wednesday },
    { id: 'thursday', name: schedule.days.thursday },
    { id: 'friday', name: schedule.days.friday, closed: true }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="clinics" className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-900/20 to-cyan-900/20">
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
            🏥 {t.title}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-rainbow">{t.title}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Clinics List Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-80"
          >
            <div className="glass-premium p-4">
              <h3 className="text-lg font-bold text-white mb-4 px-2">
                {t.selectClinic}
              </h3>
              <div className="space-y-2">
                {Object.keys(clinics).map((key) => (
                  <motion.button
                    key={key}
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedClinic(key)}
                    className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 ${
                      selectedClinic === key
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  >
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className={selectedClinic === key ? 'text-cyan-400' : 'text-gray-500'} />
                      <span className="font-semibold">{clinics[key].name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="glass-premium p-4 mt-4">
              <h3 className="text-lg font-bold text-white mb-4">
                <FaClock className="inline mr-2 text-cyan-400" />
                {t.workingHours}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>{schedule.days.saturday} - {schedule.days.wednesday}</span>
                  <span className="text-cyan-400">{schedule.timeSlots.morning}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{schedule.days.thursday}</span>
                  <span className="text-cyan-400">{schedule.timeSlots.morning.split(' - ')[0]}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{schedule.days.friday}</span>
                  <span className="text-red-400">{isRTL ? 'مغلق' : 'Closed'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Clinic Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedClinic}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-premium p-6"
              >
                <h3 className="text-2xl font-bold text-gradient-rainbow mb-4">
                  {currentClinic.name}
                </h3>
                
                {/* Clinic Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaMapMarkerAlt className="text-cyan-400" />
                    <span>{currentClinic.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaPhone className="text-cyan-400" />
                    <a href={`tel:${currentClinic.phone}`} className="hover:text-cyan-400 transition-colors">
                      {currentClinic.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaEnvelope className="text-cyan-400" />
                    <a href={`mailto:${currentClinic.email}`} className="hover:text-cyan-400 transition-colors">
                      {currentClinic.email}
                    </a>
                  </div>
                </div>

                {/* Map Toggle */}
                <div className="flex gap-3 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowMap(true)}
                    className={`flex-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                      showMap 
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-white/5 text-gray-400 hover:text-cyan-400'
                    }`}
                  >
                    {t.viewOnMap}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowMap(false)}
                    className={`flex-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                      !showMap 
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-white/5 text-gray-400 hover:text-cyan-400'
                    }`}
                  >
                    {schedule.title}
                  </motion.button>
                </div>

                {/* Map View */}
                {showMap && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl overflow-hidden h-96"
                  >
                    <iframe
                      title={currentClinic.name}
                      src={currentClinic.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="mt-3 text-center">
                      <a
                        href={currentClinic.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                      >
                        <FaExternalLinkAlt />
                        {t.openMap}
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* Schedule View */}
                {!showMap && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="overflow-x-auto"
                  >
                    <div className="min-w-full">
                      <div className="grid grid-cols-1 gap-3">
                        {weekDays.map((day) => (
                          <div
                            key={day.id}
                            className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                              selectedDay === day.id
                                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'
                                : 'bg-white/5 hover:bg-white/10'
                            } ${day.closed ? 'opacity-60' : ''}`}
                          >
                            <div>
                              <span className="font-semibold text-white">{day.name}</span>
                            </div>
                            <div>
                              {day.closed ? (
                                <span className="text-red-400">{isRTL ? 'مغلق' : 'Closed'}</span>
                              ) : (
                                <div className="text-right">
                                  <div className="text-cyan-400 text-sm">{schedule.timeSlots.morning}</div>
                                  <div className="text-gray-400 text-sm">{schedule.timeSlots.evening}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Book Button */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  href="https://wa.me/201050506046"
                  target="_blank"
                  className="block mt-6 text-center py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                >
                  {schedule.book} 📅
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clinics;