import { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Diseases from './components/Diseases';
import Gallery from './components/Gallery';
import Clinics from './components/Clinics';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [language, setLanguage] = useState('ar');

  return (
    <HelmetProvider>
      <Helmet>
        <title>{language === 'ar' ? 'د. أحمد موسي - استشاري طب وتجميل الأسنان' : 'Dr. Ahmed Mosa - Dental Medicine & Cosmetics Consultant'}</title>
        <meta name="description" content={language === 'ar' 
          ? 'أفضل خدمات طب وتجميل الأسنان في مصر. زراعة، تقويم، تجميل، حشو العصب، وتركيبات بأحدث التقنيات.' 
          : 'Best dental medicine and cosmetics services in Egypt. Implants, orthodontics, cosmetics, root canal, and prosthetics with latest technologies.'}
        />
      </Helmet>
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar language={language} setLanguage={setLanguage} />
        <Hero language={language} />
        <Services language={language} />
        <Diseases language={language} />
        <Gallery language={language} />
        <Clinics language={language} />
        <About language={language} />
        <Contact language={language} />
        <Footer language={language} />
      </div>
    </HelmetProvider>
  );
}

export default App;