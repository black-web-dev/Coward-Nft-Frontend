import * as React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from '@/components/layout';
import BattleSection from '@/components/battleSection';

function Battle() {

  React.useEffect(() => {
    AOS.init({once: true});
    AOS.refresh();
  }, []);
  
  return (
    <Layout>
      <div className='sections h-full overflow-hidden text-slate-200'>
        <BattleSection />
      </div>
    </Layout>
  );
}
export default Battle;
