import * as React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from '@/components/layout';
import MintSection from '@/components/mintSection';

function Mint() {

  React.useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  return (
    <Layout>
      <div className='sections h-full overflow-hidden text-slate-200'>
        <MintSection />
      </div>
    </Layout>
  );
}
export default Mint;
