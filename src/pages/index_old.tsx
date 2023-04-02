import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import AOS from "aos";
import "aos/dist/aos.css";

import { Link as ScrollLink } from 'react-scroll';
import Config from '@/config/app';
import Layout from '@/components/layout';
import HomeSection from '@/components/homeSection';
import AboutSection from '@/components/aboutSection';
import ExperienceSection from '@/components/experienceSection';
import TeamSection from '@/components/teamSection';
import FaqsSection from '@/components/faqsSection';
import FooterSection from '@/components/footerSection';
import StorySection from '@/components/storySection';
import JourneySection from '@/components/journeySection';

declare const window: Window &
  typeof globalThis & {
    fullpage_api: any;
    pageYOffset: any;
  };

const SidebarContainer = styled.div`
  position: absolute;
  width: calc(50vw - 900px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  @media (max-width: 1920px) {
    width: 60px;
  }
  @media (max-width: 768px) {
    width: 24px;
  }
`;
const ScrollTransition = styled.div`
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 60px;
  height: ${(props: any) => props.height}px;
  @media (max-width: 1300px) {
    margin-top: 40px;
  }
  @media (max-width: 768px) {
    display: none !important;
  }
`;
const ScrollUpsideBarAnimation = keyframes`
    0%{
        clip-path: inset(175px 0px 0px 0px);
    }
    100%{
        clip-path: inset(0px 0px 0px 0px);
    }
`;
const ScrollUpsideBar = styled.svg`
  animation: ${ScrollUpsideBarAnimation} 1s ease 1;
  animation-fill-mode: forwards;
  height: ${(props: any) => props.height}px;
`;
const RectButtonsAppearAnimation = keyframes`
    0%{
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
    100%{
        transform: translateX(0px);
        -webkit-transform: translateX(0px);
    }
`;
const RectButtonsTransition = styled.div`
  transform: translateX(-100%);
  -webkit-transform: translateX(-100%);
  display: flex;
  flex-direction: column;
  animation: ${RectButtonsAppearAnimation} 0.8s ease 1;
  animation-fill-mode: forwards;
`;
const RectButtonsContainer = styled.div`
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  overflow: hidden;
`;
const RectButtonAnimation = keyframes`
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
`;
const RectButtonContainer = styled.div`
  transform: ${(props: any) =>
    props.play == 'true' ? 'scale(0)' : 'scale(1)'};
  animation: ${(props: any) =>
    props.play == 'true' ? RectButtonAnimation : ''}
    0.5s ${(props: any) => props.duration * props.index}s
    cubic-bezier(0.65, 0.01, 0.39, 0.99) 1;
  animation-fill-mode: forwards;
`;

function Home() {
  const [sectionIdx, setSectionIdx] = useState(0);
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const [currentRoundEndTime, setCurrentRoundEndTime] = useState<string>();
  const [browser, setBrowser] = useState<boolean>();

  const RectButton = ({ index }: { index: any }) => {
    return (
      <RectButtonContainer>
        <ScrollLink
          to={Config.navigation[index].href}
          spy={true}
          smooth={true}
          aria-current={index ? 'page' : undefined}
          onClick={() => handleSelectSlider(index)}
        >
          <svg width="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '6px', cursor: 'pointer' }}>
            <rect x="0.707107" y="10" width="13.1421" height="13.1421" transform="rotate(-45 0.707107 10)" fill={sectionIdx === index ? "#b60b14" : 'white'} fillOpacity="0.3" stroke={sectionIdx === index ? "#b60b14" : 'white'} />
          </svg>
        </ScrollLink>
      </RectButtonContainer>
    );
  };

  const handleSelectSlider = (idx: any) => {
    setSectionIdx(idx);

  };
  const handleScroll = () => {
    let idx = 0;
    const position: any = window.pageYOffset;
    const homeTop: any = homeRef.current?.offsetTop;
    const aboutTop: any = aboutRef.current?.offsetTop;
    const storyTop: any = storyRef.current?.offsetTop;
    const expTop: any = expRef.current?.offsetTop;
    const journeyTop: any = journeyRef.current?.offsetTop;
    const teamTop: any = teamRef.current?.offsetTop;
    const faqTop: any = faqRef.current?.offsetTop;

    if (position >= homeTop && position <= aboutTop) {
      idx = 0
    } else if (position >= aboutTop && position <= storyTop) {
      idx = 1
    } else if (position >= storyTop && position <= expTop) {
      idx = 2
    } else if (position >= expTop && position <= journeyTop) {
      idx = 3
    } else if (journeyTop >= expTop && position <= teamTop) {
      idx = 4
    } else if (journeyTop >= teamTop && position <= faqTop) {
      idx = 5
    }

    setSectionIdx(idx);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  return (
    <Layout>
      <div className='sections h-full overflow-hidden text-slate-200'>
        <div className='z-10 fixed top-0 left-0 bottom-0'>
          <SidebarContainer>
            <ScrollTransition>
              <div style={{ marginBottom: '1.07vh' }}>
                {
                  <ScrollUpsideBar
                    height='18vh'
                    viewBox='0 0 10 185'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      opacity='0.5'
                      d='M5.00001 0.669876L9.33014 5L5.00001 9.33012L0.669881 5L5.00001 0.669876ZM4.25001 185L4.25001 5L5.75001 5L5.75001 185L4.25001 185Z'
                      fill='white'
                      className='transition-all duration-500'
                    />
                  </ScrollUpsideBar>
                }
              </div>

              <RectButtonsContainer>
                <RectButtonsTransition>
                  {Config.navigation.map((item, idx) => {
                    return <RectButton index={idx} key={idx}></RectButton>;
                  })}
                </RectButtonsTransition>
              </RectButtonsContainer>

              <div style={{ marginTop: '1.07vh' }}>
                {
                  <ScrollUpsideBar
                    id='upperarrow'
                    height='18vh'
                    viewBox='0 0 10 185'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ transform: 'rotate(180deg)' }}
                  >
                    <path
                      opacity='0.5'
                      d='M5.00001 0.669876L9.33014 5L5.00001 9.33012L0.669881 5L5.00001 0.669876ZM4.25001 185L4.25001 5L5.75001 5L5.75001 185L4.25001 185Z'
                      fill='white'
                      className='transition-all duration-500'
                    />
                  </ScrollUpsideBar>
                }
              </div>
            </ScrollTransition>
          </SidebarContainer>
        </div>
        <div ref={homeRef}>
          <HomeSection />
        </div>
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        <div ref={storyRef}>
          <StorySection />
        </div>
        <div ref={expRef}>
          <ExperienceSection />
        </div>
        <div ref={journeyRef}>
          <JourneySection />
        </div>
        <div ref={teamRef}>
          <TeamSection />
        </div>
        <div ref={faqRef}>
          <FaqsSection />
        </div>
        <div>
          <FooterSection />
        </div>
      </div>
    </Layout>
  );
}
export default Home;
