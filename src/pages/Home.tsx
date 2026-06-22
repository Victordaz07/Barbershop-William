import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { BarbersGrid } from '../components/home/BarbersGrid';

export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesGrid />
        <BarbersGrid />
      </main>
      <Footer />
    </>
  );
}
