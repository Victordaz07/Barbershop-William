import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { FeaturesStrip } from '../components/home/FeaturesStrip';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { BarbersGrid } from '../components/home/BarbersGrid';
import { BookingForm } from '../components/booking/BookingForm';
import { ReviewsGrid } from '../components/reviews/ReviewsGrid';

export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturesStrip />
        <ServicesGrid />
        <BarbersGrid />
        <BookingForm />
        <ReviewsGrid />
      </main>
      <Footer />
    </>
  );
}
