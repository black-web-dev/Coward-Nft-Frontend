import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

import Layout from '@/components/layout';
import HomeSection from '@/components/homeSection';
import LandingSection from '@/components/landingSection';
import FooterSection from '@/components/footerSection';
import Coward from './coward';

function Home() {
  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  return (
    <Layout>
      <div className='sections h-full overflow-hidden text-slate-200'>
        <Coward />
        {/* <div>
          <HomeSection />
        </div>
        <div>
          <LandingSection />
        </div>
        <div>
          <FooterSection />
        </div> */}
      </div>
    </Layout>
  );
}
export default Home;
