/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@chakra-ui/react';

// Import components
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/hero';
import ActuallyDoes from '../components/landing/actually-does';
import Comparison from '../components/landing/comparison';
import Tools from '../components/landing/tools';
import Pricing from '../components/landing/pricing';
import RightForYou from '../components/landing/right-for-you';
import FAQ from '../components/landing/faq';
import AlreadySignedUp from '../components/landing/already-signed-up';
import Testimonials from '../components/landing/testimonials';
import HowItWorks from '../components/landing/how-it-works';
import Footer from '../components/landing/footer';
import Calculator from '../components/landing/calculator';


// Main Landing component
const Landing = () => {
  return (
    <Box>
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <Hero />     
      <HowItWorks />
      <Comparison />
      <Calculator />
      <RightForYou />
      <Tools />
      <Pricing />
      <Testimonials />
      <ActuallyDoes />
      <AlreadySignedUp />
      <FAQ />
      <Footer />
    </Box>
  );
};

export default Landing; 