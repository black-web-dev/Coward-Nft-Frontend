import * as React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from '@/components/layout';
import CowardSection from '@/components/cowardSection';

const Coward = (): JSX.Element => {

  React.useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  return (
    <Layout>
      <div className='sections h-full overflow-hidden text-slate-200'>
        <CowardSection />
      </div>
    </Layout>
  );
}
export default Coward;
