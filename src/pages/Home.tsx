import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { BarbersGrid } from '../components/home/BarbersGrid';
import { BookingForm } from '../components/booking/BookingForm';

export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesGrid />
        <BarbersGrid />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
