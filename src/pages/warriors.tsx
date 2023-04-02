import * as React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from '@/components/layout';
import WarroirsSection from '@/components/warriorsSection';

function Warriors() {

  React.useEffect(() => {
    AOS.init({once: true});
    AOS.refresh();
  }, []);
  
  return (
    <Layout>
      <div className='sections h-full overflow-hidden text-slate-200'>
        <WarroirsSection />
      </div>
    </Layout>
  );
}
export default Warriors;
