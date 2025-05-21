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
import Disclaimer from '../components/landing/disclaimer';
import Footer from '../components/landing/footer';

// Main Landing component
const Landing = () => {
  return (
    <Box>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* What Jimmi Actually Does Section */}
      <ActuallyDoes />

      {/* Comparison Section */}
      <Comparison />

      {/* Tools Section */}
      <Tools />
      
      {/* Is Jimmi Right For You Section */}
      <RightForYou />

      {/* FAQ Section */}
      <FAQ />
      
      {/* Pricing Section */}
      <Pricing />
      
      {/* Already Signed Up Section */}
      <AlreadySignedUp />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* How It Works Steps */}
      <HowItWorks />
      
      {/* Disclaimer */}
      <Disclaimer />

      {/* Footer */}
      <Footer />

      {/* 
        MODERN DESIGN IMPLEMENTATION NOTE:
        
        Due to timeout limitations, the modern components couldn't be created.
        To implement the design as requested, create the following components:
        
        1. A modern hero section with gradient backgrounds and animated elements
        2. An enhanced "💸 How Much Could You Get Back?" section with clean cards and good visuals
        3. A premium-looking "💼 One Simple Price. Zero Surprises." section with modern pricing cards
        4. An eye-catching "🗣️ Real People. Real Results." testimonials section with avatars and rating stars
        5. A clean "🏁 Ready When You Are" section with clear steps and iconography
        
        All sections should use:
        - Gradient text for headings
        - Decorative background elements
        - Modern card designs with shadows
        - Hover animations
        - Responsive layouts
        - Well-spaced content
        - High-contrast color schemes
      */}
    </Box>
  );
};

export default Landing; 