'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AiFillGithub, AiFillLinkedin, AiOutlineFilePdf, AiOutlineMail } from 'react-icons/ai';

type Experience = {
  company: string;
  role: string;
  date: string;
  description: string;
  tools: string;
};

type Photograph = {
  src: string;
  title: string;
  detail: string;
  href?: string;
};

type Contribution = {
  name: string;
  src: string;
  href: string;
  summary: string;
  tenure: string;
  imagePosition?: string;
};

const experiences: Experience[] = [
  {
    company: 'Sophon Labs',
    role: 'Full Stack Engineer',
    date: '2023—2026',
    description: 'Owned engineering across products on Sophon’s zkSync-based Layer 2, including scalable services for a USDC banking app, audited smart contracts, identity infrastructure, and a rewards platform that distributed millions of dollars to more than 8,000 users.',
    tools: 'Go · TypeScript · Solidity · zkSync · PostgreSQL · Redis · AWS · MongoDB · Kubernetes · Docker',
  },
  {
    company: 'Byt, Inc.',
    role: 'Backend Engineer',
    date: '2021—2023',
    description: 'Led early backend engineering for an NFT marketplace. Built a low-latency Solana transaction indexer and high-performance marketplace APIs designed for real-time ingestion and scale.',
    tools: 'Go · TypeScript · MySQL · Ethereum · Arbitrum · Solana',
  },
  {
    company: 'Moonsworth, LLC',
    role: 'Software Engineer',
    date: '2020—2022',
    description: 'Developed real-time OpenGL rendering systems, an extensible cosmetics framework, and Go-based asset tooling for a large multiplayer gaming platform. Helped create a version-agnostic client API using low-level JVM injection.',
    tools: 'Java · Go · OpenGL · JVM',
  },
  {
    company: 'MCTeams.com',
    role: 'Lead Software Engineer',
    date: '2017—2020',
    description: 'Designed backend services and game frameworks supporting more than 10,000 players, including a Redis-based distributed queue and zero-downtime delivery pipelines.',
    tools: 'Java · Redis · MongoDB · Jenkins · GitHub Actions',
  },
  {
    company: 'FrozenOrb, LLC',
    role: 'Software Engineer',
    date: '2015—2017',
    description: 'Built production Java frameworks and optimized backend infrastructure for a game network used by more than one million unique players.',
    tools: 'Java · MongoDB · Redis',
  },
];

const contributions: Contribution[] = [
  {
    name: 'MCTeams',
    src: '/mcteams.webp',
    href: 'https://mcteams.com',
    summary: 'Head of Engineering. Designed robust Java libraries for rapid game-server development, helping bring in thousands of players.',
    tenure: '2017—Present',
  },
    {
    name: 'Lunar Client',
    src: '/lunar_client.webp',
    href: 'https://www.lunarclient.com',
    summary: 'Developed an extensible cosmetics system, and Go asset tooling, while helping build a version-agnostic client API through low-level JVM injection.',
    tenure: '2020—2022',
  },
  {
    name: 'Neo Tokyo',
    src: '/neo_tokyo.webp',
    href: 'https://neotokyo.codes',
    summary: 'Built an NFT avatar customizer and continue to maintain CitGen, a rasterization service that turns on-chain SVG avatars into high-quality profile images for the community.',
    tenure: '2021—2022',
    imagePosition: 'center top',
  },
  {
    name: 'FrozenOrb',
    src: '/frozenorb.webp',
    href: 'https://frozenorb.net',
    summary: 'Built production Java frameworks and optimized backend infrastructure for a game network used by more than one million unique players.',
    tenure: '2015—2017',
  },
];

const photographs: Photograph[] = [
  { src: '/ghost_nebula.png', title: 'IC 63 — The Ghost Nebula', detail: 'Cassiopeia · Top Pick Nomination', href: 'https://app.astrobin.com/i/12li9w' },
  { src: '/pillars_of_creation.png', title: 'M16 — Pillars of Creation', detail: 'Serpens · 6,500 light-years' },
  { src: '/m45_pleiades.png', title: 'M45 — The Pleiades', detail: 'Taurus · 444 light-years' },
  { src: '/m106.png', title: 'M106', detail: 'Canes Venatici · 24 million light-years' },
  { src: '/blue_horse_head.png', title: 'IC 4592 — Blue Horsehead Nebula', detail: 'Scorpius · 400 light-years' },
  { src: '/m101.png', title: 'M101 — The Pinwheel Galaxy', detail: 'Ursa Major · 21 million light-years' },
];

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contributionCarouselRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let balloonObserver: MutationObserver | undefined;
    let clippy: Awaited<ReturnType<typeof import('clippyjs')['initAgent']>> | undefined;

    async function showClippy() {
      const [{ initAgent }, { Clippy }] = await Promise.all([
        import('clippyjs'),
        import('clippyjs/agents'),
      ]);
      clippy = await initAgent(Clippy);
      const clippyElements = Array.from(document.body.children).filter(
        (element): element is HTMLElement => element instanceof HTMLElement
          && element.style.zIndex === '10001',
      );
      for (const element of clippyElements) {
        element.style.boxSizing = 'content-box';
        element.querySelectorAll<HTMLElement>('*').forEach((child) => {
          child.style.boxSizing = 'content-box';
        });
      }
      const balloon = clippyElements.at(-1);
      const balloonContent = balloon?.lastElementChild as HTMLElement | null;
      if (balloonContent) {
        balloonObserver = new MutationObserver(() => {
          balloonContent.style.setProperty('height', 'auto', 'important');
        });
        balloonObserver.observe(balloonContent, { childList: true, characterData: true, subtree: true });
      }
      if (disposed) {
        clippy.dispose();
        return;
      }
      clippy.show(false);
      clippy.speak('Ryan is open to work', { hold: true });
    }

    showClippy().catch((error) => console.error('Unable to load Clippy', error));
    return () => {
      disposed = true;
      balloonObserver?.disconnect();
      clippy?.dispose();
    };
  }, []);

  function openPhoto(photo: Photograph) {
    setSelectedPhoto(photo);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  }

  function closePhoto() {
    dialogRef.current?.close();
    setSelectedPhoto(null);
  }

  function scrollCarousel(direction: -1 | 1) {
    carouselRef.current?.scrollBy({ left: direction * carouselRef.current.clientWidth * 0.75, behavior: 'smooth' });
  }

  function scrollContributions(direction: -1 | 1) {
    contributionCarouselRef.current?.scrollBy({ left: direction * 440, behavior: 'smooth' });
  }

  return <main>
    <section className="intro">
      <div className="intro-content">
        <h1>Ryan W.</h1>
        <p className="intro-role">Software Engineer | Astrophotographer</p>
        <div className="links">
          <a href="mailto:me@rcw.io"><AiOutlineMail aria-hidden="true" />me@rcw.io</a>
          <a href="https://linkedin.com/in/ryancwillette" target="_blank" rel="noreferrer"><AiFillLinkedin aria-hidden="true" />LinkedIn</a>
          <a href="https://github.com/rbrick" target="_blank" rel="noreferrer"><AiFillGithub aria-hidden="true" />GitHub</a>
          <a href="/rwillette_resume.pdf" target="_blank"><AiOutlineFilePdf aria-hidden="true" />Résumé ↓</a>
        </div>
      </div>
      <a className="continue" href="#experience">Experience ↓</a>
    </section>

    <section className="content" id="experience">
      <div className="content-inner">
        <div className="section-title">
          <p className="label">Experience</p>
          <p>Production systems across blockchain, gaming, e-commerce, and mobile platforms.</p>
        </div>
        <div className="experience-list">
          {experiences.map((experience) => <article className="experience" key={experience.company}>
            <div className="experience-heading">
              <div><h2>{experience.company}</h2><p>{experience.role}</p></div>
              <time>{experience.date}</time>
            </div>
            <p className="description">{experience.description}</p>
            <p className="tools">{experience.tools}</p>
          </article>)}
        </div>

        <div className="section-title contributions-title">
          <p className="label">Contributions</p>
          <p>Selected projects I’ve helped build and bring to life.</p>
        </div>
        <div className="contribution-carousel">
          <button className="carousel-arrow previous" type="button" onClick={() => scrollContributions(-1)} aria-label="Previous contribution">←</button>
          <div className="contribution-grid" ref={contributionCarouselRef}>
            {contributions.map((contribution) => <a
              className="contribution"
              href={contribution.href}
              target="_blank"
              rel="noreferrer"
              key={contribution.name}
              aria-label={`${contribution.name}: ${contribution.summary}`}
            >
              <Image
                src={contribution.src}
                alt={`${contribution.name} website`}
                fill
                sizes="(max-width: 700px) 82vw, 420px"
                style={{ objectPosition: contribution.imagePosition }}
              />
              <div className="contribution-overlay">
                <div>
                  <div className="contribution-meta">
                    <p className="contribution-name">{contribution.name}</p>
                    <time>{contribution.tenure}</time>
                  </div>
                  <p className="contribution-summary">{contribution.summary}</p>
                </div>
                <span aria-hidden="true">Visit site ↗</span>
              </div>
            </a>)}
          </div>
          <button className="carousel-arrow next" type="button" onClick={() => scrollContributions(1)} aria-label="Next contribution">→</button>
        </div>

        <div className="section-title astro-title">
          <p className="label">Astrophotography</p>
          <p>Hundreds of hours collecting and processing deep-space light.</p>
        </div>
        <div className="carousel">
          <button className="carousel-arrow previous" type="button" onClick={() => scrollCarousel(-1)} aria-label="Previous photograph">←</button>
          <div className="photo-grid" ref={carouselRef}>
            {photographs.map((photo) => <article className="photo" key={photo.src}>
              <button type="button" onClick={() => openPhoto(photo)} aria-label={`View ${photo.title}`}>
                <Image src={photo.src} alt={photo.title} fill sizes="(max-width: 700px) 100vw, 45vw" />
              </button>
              <div><h2>{photo.title}</h2><p>{photo.detail}</p>{photo.href && <a href={photo.href} target="_blank" rel="noreferrer">AstroBin ↗</a>}</div>
            </article>)}
          </div>
          <button className="carousel-arrow next" type="button" onClick={() => scrollCarousel(1)} aria-label="Next photograph">→</button>
        </div>

        <footer><p>Ryan Willette · {new Date().getFullYear()}</p><a href="mailto:me@rcw.io">Get in touch ↗</a></footer>
      </div>
    </section>

    <dialog ref={dialogRef} className="lightbox" onClose={() => setSelectedPhoto(null)} onClick={(event: React.MouseEvent<HTMLDialogElement>) => event.target === event.currentTarget && closePhoto()}>
      <button className="close" type="button" onClick={closePhoto}>Close ×</button>
      {selectedPhoto && <Image src={selectedPhoto.src} alt={selectedPhoto.title} width={2312} height={3454} />}
    </dialog>
  </main>;
}
