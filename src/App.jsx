import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Clients from './components/Clients';
import Team from './components/Team';
import Novedades from './components/Novedades';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Clients />
      <Team />
      <Novedades />
      <Contact />
      <Footer />
    </>
  );
}
