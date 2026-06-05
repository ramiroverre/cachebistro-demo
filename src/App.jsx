import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const RED = '#B8281C';
const CREAM = '#F5EDD4';
const DARK = '#12080A';
const DARKER = '#0A0406';

const WHATSAPP = '5492613400065';
const INSTAGRAM = 'https://www.instagram.com/cachebistro_/';
const MENU_URL = 'https://voucheroo.app/cartaonline/cachebistro/carta/';
const DEGUSTATION_URL = 'https://voucheroo.app/cartaonline/cachebistro/carta/5120/';

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <p style={{
      fontFamily: "'Barlow', sans-serif",
      fontSize: '0.72rem',
      letterSpacing: '0.35em',
      textTransform: 'uppercase',
      color: light ? 'rgba(245,237,212,0.55)' : RED,
      marginBottom: '1.25rem',
    }}>
      {children}
    </p>
  );
}

function Btn({ href, children, variant = 'solid' }) {
  const base = {
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 700,
    fontSize: '0.8rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    padding: '1rem 2.6rem',
    borderRadius: '2px',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'opacity 0.2s, background 0.2s',
    cursor: 'pointer',
  };
  const styles = variant === 'solid'
    ? { ...base, background: RED, color: CREAM, border: 'none' }
    : variant === 'outline-light'
    ? { ...base, background: 'transparent', color: CREAM, border: '1px solid rgba(245,237,212,0.3)' }
    : { ...base, background: CREAM, color: RED, border: 'none' };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={styles}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.82'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
    >
      {children}
    </a>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { label: 'Nosotros', href: '#nosotros', ext: false },
    { label: 'Carta', href: MENU_URL, ext: true },
    { label: 'Degustaciones', href: '#degustaciones', ext: false },
    { label: 'Contacto', href: '#contacto', ext: false },
  ];

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || menuOpen ? 'rgba(10,4,6,0.98)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(18px)' : 'none',
        borderBottom: `1px solid ${scrolled || menuOpen ? 'rgba(184,40,28,0.18)' : 'transparent'}`,
        transition: 'all 0.45s ease',
        padding: '1.3rem 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#" onClick={close}
          style={{ color: CREAM, fontFamily: "'Anton', sans-serif", fontSize: '1.85rem', letterSpacing: '0.1em', textDecoration: 'none', position: 'relative', zIndex: 1001 }}
        >
          CACHÉ <span style={{ color: RED }}>BISTRÓ</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {links.map(link => (
            <a key={link.label}
              href={link.href}
              target={link.ext ? '_blank' : undefined}
              rel={link.ext ? 'noopener noreferrer' : undefined}
              style={{ color: CREAM, fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', opacity: 0.72, transition: 'opacity 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.72'; }}
            >
              {link.label}
            </a>
          ))}
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
            style={{ background: RED, color: CREAM, fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.65rem 1.5rem', borderRadius: '2px', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            Reservar
          </a>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem', display: 'none', flexDirection: 'column', justifyContent: 'center', gap: '5px', position: 'relative', zIndex: 1001 }}
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.28 }}
            style={{ display: 'block', width: '24px', height: '2px', background: CREAM, transformOrigin: 'center' }} />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }}
            style={{ display: 'block', width: '24px', height: '2px', background: CREAM, transformOrigin: 'center' }} />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.28 }}
            style={{ display: 'block', width: '24px', height: '2px', background: CREAM, transformOrigin: 'center' }} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: DARKER,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0',
              paddingTop: '72px',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(184,40,28,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />

            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', position: 'relative', zIndex: 1 }}>
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.ext ? '_blank' : undefined}
                  rel={link.ext ? 'noopener noreferrer' : undefined}
                  onClick={close}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ color: CREAM, fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.2rem, 9vw, 3.2rem)', letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', padding: '0.6rem 1.5rem', opacity: 0.88, transition: 'color 0.2s, opacity 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = RED; e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = CREAM; e.currentTarget.style.opacity = '0.88'; }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.45 }}
              style={{ marginTop: '2.5rem', position: 'relative', zIndex: 1 }}
            >
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" onClick={close}
                style={{ background: RED, color: CREAM, fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '1rem 3rem', borderRadius: '2px', textDecoration: 'none', display: 'inline-block', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Reservar
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -160]);
  const fadeOut = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section style={{
      minHeight: '100vh',
      background: DARK,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 70% at 50% 110%, rgba(184,40,28,0.22) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: '-8%', top: '8%',
        width: 'clamp(280px, 38vw, 580px)', height: 'clamp(280px, 38vw, 580px)',
        borderRadius: '50%', border: '1px solid rgba(184,40,28,0.1)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: '0%', top: '16%',
        width: 'clamp(180px, 24vw, 380px)', height: 'clamp(180px, 24vw, 380px)',
        borderRadius: '50%', border: '1px solid rgba(184,40,28,0.07)',
        pointerEvents: 'none',
      }} />

      <motion.div
        style={{ y, opacity: fadeOut, textAlign: 'center', padding: '2rem', maxWidth: '980px', position: 'relative', zIndex: 1, paddingTop: '110px' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.1 }}
          style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.72rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: RED, marginBottom: '2.2rem' }}
        >
          Mendoza · Argentina
        </motion.p>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(6rem, 22vw, 17rem)', lineHeight: 0.85, color: CREAM, letterSpacing: '-0.02em', marginBottom: '0.6rem' }}
          >
            CACHE
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: 'clamp(0.78rem, 2.2vw, 1.1rem)', letterSpacing: '0.5em', textTransform: 'uppercase', color: RED, marginBottom: '3rem' }}
        >
          BISTRO & WINE BAR
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          style={{ width: '55px', height: '1px', background: RED, margin: '0 auto 2.8rem', transformOrigin: 'left' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(0.95rem, 2.2vw, 1.3rem)', color: 'rgba(245,237,212,0.6)', maxWidth: '460px', margin: '0 auto 3.5rem', lineHeight: 1.6 }}
        >
          La cava más grande de Mendoza
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{ display: 'flex', gap: '3.5rem', justifyContent: 'center', marginBottom: '4.5rem', flexWrap: 'wrap' }}
        >
          {[{ n: '+700', l: 'Etiquetas' }, { n: '+1000', l: 'Botellas' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', color: RED, lineHeight: 1, marginBottom: '0.4rem' }}>{s.n}</p>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(245,237,212,0.38)' }}>{s.l}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Btn href={MENU_URL} variant="solid">Ver Carta</Btn>
          <Btn href={`https://wa.me/${WHATSAPP}?text=Hola!%20Me%20gustaría%20reservar%20una%20degustación`} variant="outline-light">Reservar Degustación</Btn>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,237,212,0.28)' }}>scroll</p>
        <motion.div
          animate={{ height: [28, 50, 28] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', background: `linear-gradient(to bottom, ${RED}, transparent)` }}
        />
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" style={{ background: CREAM, padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 8rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
        <FadeUp>
          <SectionLabel>Sobre Nosotros</SectionLabel>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 0.92, color: DARK, marginBottom: '2.5rem' }}>
            DONDE EL<br />VINO<br />ENCUENTRA<br />SU HOGAR
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '1.05rem', lineHeight: 1.88, color: '#38181A', marginBottom: '1.5rem', maxWidth: '460px' }}>
            Cache Bistro es un espacio donde la gastronomía y el vino se fusionan en una experiencia única. En el corazón de Mendoza, hemos construido la cava más grande del país: un testamento a nuestra pasión por los mejores vinos argentinos y del mundo.
          </p>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '1.05rem', lineHeight: 1.88, color: '#38181A', maxWidth: '460px', marginBottom: '2.5rem' }}>
            Nuestro equipo de sommeliers te guiará a través de más de 700 etiquetas, desde los grandes clásicos mendocinos hasta rarezas internacionales que no encontrarás en ningún otro lugar.
          </p>
          <Btn href={MENU_URL} variant="solid">Ver la Carta</Btn>
        </FadeUp>

        <FadeUp delay={0.18}>
          <div>
            <div style={{ background: RED, padding: '3.5rem 3rem', marginBottom: '1.2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: '-24px', bottom: '-24px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(0,0,0,0.12)', pointerEvents: 'none' }} />
              <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(5rem, 14vw, 9.5rem)', color: CREAM, lineHeight: 0.84, marginBottom: '0.75rem', position: 'relative', zIndex: 1 }}>700+</p>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.75rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(245,237,212,0.72)', position: 'relative', zIndex: 1 }}>ETIQUETAS DE VINO</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
              <div style={{ background: DARK, padding: '2.2rem', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: RED, lineHeight: 0.9, marginBottom: '0.6rem' }}>+1000</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,237,212,0.45)' }}>Botellas</p>
              </div>
              <div style={{ background: DARK, padding: '2.2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color: RED, lineHeight: 1.1, marginBottom: '0.6rem' }}>#1 CAVA</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,237,212,0.45)' }}>Del País</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function MenuGallery() {
  const items = [
    { num: '01', name: 'Entradas', desc: 'Sabores que despiertan el paladar' },
    { num: '02', name: 'Platos Principales', desc: 'Cocina de autor con productos locales' },
    { num: '03', name: 'Tabla de Quesos', desc: 'Selección curada de quesos artesanales' },
    { num: '04', name: 'Vinos por Copa', desc: 'Los mejores varietales mendocinos' },
    { num: '05', name: 'Vinos por Botella', desc: '+700 etiquetas para descubrir' },
    { num: '06', name: 'Tapeo', desc: 'Pequeñas porciones, grandes sabores' },
    { num: '07', name: 'Postres', desc: 'El dulce cierre perfecto para cada visita' },
    { num: '08', name: 'Cafetería', desc: 'Desayunos y meriendas de autor' },
  ];

  return (
    <section id="carta" style={{ background: DARKER, padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 8rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <SectionLabel light>Nuestra Propuesta</SectionLabel>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.9, color: CREAM }}>
                GALERÍA<br />DEL MENÚ
              </h2>
            </div>
            <a href={MENU_URL} target="_blank" rel="noopener noreferrer"
              style={{ color: RED, fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1rem 2rem', borderRadius: '2px', textDecoration: 'none', border: `1px solid ${RED}`, background: 'transparent', transition: 'all 0.22s', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.background = RED; e.currentTarget.style.color = CREAM; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = RED; }}
            >
              Ver Carta Completa →
            </a>
          </div>
        </FadeUp>

        <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(184,40,28,0.1)' }}>
          {items.map((item, i) => (
            <FadeUp key={item.num} delay={i * 0.07} style={{ height: '100%' }}>
              <motion.div
                whileHover={{ backgroundColor: '#1C0D10' }}
                style={{ background: DARKER, padding: '2.5rem 2.2rem', position: 'relative', overflow: 'hidden', cursor: 'default', height: '100%', boxSizing: 'border-box' }}
              >
                <p style={{ fontFamily: "'Anton', sans-serif", fontSize: '3.8rem', color: 'rgba(184,40,28,0.1)', lineHeight: 1, marginBottom: '0.9rem', userSelect: 'none' }}>
                  {item.num}
                </p>
                <p style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.3rem', color: CREAM, letterSpacing: '0.05em', marginBottom: '0.7rem' }}>
                  {item.name.toUpperCase()}
                </p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.88rem', color: 'rgba(245,237,212,0.42)', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.32 }}
                  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: RED, transformOrigin: 'left' }}
                />
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Degustaciones() {
  const experiences = [
    { title: 'Cata a Ciegas', desc: 'Identificá varietales sin ver la botella. Una experiencia para apasionados del vino.' },
    { title: 'Maridaje Gastronómico', desc: 'Vinos cuidadosamente seleccionados para acompañar cada plato de nuestra carta.' },
    { title: 'Tour por la Cava', desc: 'Recorrido exclusivo por la cava más grande de Argentina con guía sommelier.' },
  ];

  return (
    <section id="degustaciones" style={{ background: RED, padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 8rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
        <FadeUp>
          <SectionLabel light>Experiencias</SectionLabel>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 0.88, color: CREAM, marginBottom: '2.5rem' }}>
            CATAS &<br />DEGUSTA-<br />CIONES
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '1.08rem', lineHeight: 1.82, color: 'rgba(245,237,212,0.82)', maxWidth: '440px', marginBottom: '3rem' }}>
            Descubrí el arte del vino en nuestras catas guiadas. Nuestros sommeliers te llevarán en un viaje sensorial único, con maridajes y tapeo seleccionados para cada experiencia.
          </p>
          <Btn href={`https://wa.me/${WHATSAPP}?text=Hola!%20Me%20gustaría%20reservar%20una%20degustación`} variant="cream">Reservar Degustación →</Btn>
        </FadeUp>

        <div style={{ display: 'grid', gap: '1.2rem' }}>
          {experiences.map((exp, i) => (
            <FadeUp key={exp.title} delay={i * 0.12}>
              <div style={{ background: 'rgba(245,237,212,0.08)', padding: '1.75rem 2rem', borderLeft: '3px solid rgba(245,237,212,0.32)' }}>
                <p style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.1rem', color: CREAM, letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
                  {exp.title.toUpperCase()}
                </p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.9rem', color: 'rgba(245,237,212,0.62)', lineHeight: 1.68 }}>
                  {exp.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ubicacion() {
  return (
    <section id="ubicacion" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <div style={{ background: DARK, padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <FadeUp>
          <SectionLabel>Dónde Encontrarnos</SectionLabel>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.92, color: CREAM, marginBottom: '3rem' }}>
            UBICACIÓN
          </h2>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Anton', sans-serif", fontSize: '0.82rem', letterSpacing: '0.22em', color: RED, marginBottom: '0.6rem' }}>DIRECCIÓN</p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '1.05rem', color: 'rgba(245,237,212,0.8)', lineHeight: 1.75 }}>
              Av. Emilio Civit 556<br />Mendoza, Argentina
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <p style={{ fontFamily: "'Anton', sans-serif", fontSize: '0.82rem', letterSpacing: '0.22em', color: RED, marginBottom: '0.6rem' }}>HORARIOS</p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '1.05rem', color: 'rgba(245,237,212,0.8)', lineHeight: 1.75 }}>
              Lunes a Sábados<br />8:00 AM – 1:00 AM
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.9rem 1.8rem', borderRadius: '2px', textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              WhatsApp
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
              style={{ background: 'transparent', color: CREAM, fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.9rem 1.8rem', borderRadius: '2px', textDecoration: 'none', border: '1px solid rgba(245,237,212,0.28)', transition: 'border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,237,212,0.65)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,237,212,0.28)'; }}
            >
              @cachebistro_
            </a>
          </div>
        </FadeUp>
      </div>

      <div style={{ minHeight: '500px', position: 'relative' }}>
        <iframe
          title="Cache Bistro – Mendoza, Argentina"
          src="https://maps.google.com/maps?q=-32.8874217,-68.8580667&output=embed&z=16"
          style={{ width: '100%', height: '100%', minHeight: '500px', border: 'none', display: 'block', filter: 'grayscale(15%) contrast(1.05) brightness(0.92)' }}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </section>
  );
}

function Contacto() {
  return (
    <section id="contacto" style={{ background: DARKER, padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 8rem)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <FadeUp>
          <SectionLabel light>Hablemos</SectionLabel>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(4rem, 14vw, 9rem)', lineHeight: 0.87, color: CREAM, marginBottom: '2rem' }}>
            CONTACTO
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '1.1rem', color: 'rgba(245,237,212,0.58)', lineHeight: 1.78, maxWidth: '460px', margin: '0 auto 3.5rem' }}>
            Para reservas, consultas sobre eventos privados o simplemente para saber más sobre nuestra selección de vinos.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1.1rem 2.5rem', borderRadius: '2px', textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.86'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              Escribinos por WhatsApp
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
              style={{ background: 'transparent', color: CREAM, fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1.1rem 2.5rem', borderRadius: '2px', textDecoration: 'none', border: '1px solid rgba(245,237,212,0.28)', transition: 'border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,237,212,0.65)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,237,212,0.28)'; }}
            >
              Ver en Instagram
            </a>
          </div>

          <div style={{ borderTop: '1px solid rgba(184,40,28,0.2)', paddingTop: '2.5rem' }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,237,212,0.35)', marginBottom: '0.5rem' }}>Horario de Atención</p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '1rem', color: 'rgba(245,237,212,0.65)' }}>Lunes a Sábados · 8:00 AM – 1:00 AM</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: DARKER, borderTop: '1px solid rgba(184,40,28,0.14)', padding: '2rem clamp(1.5rem, 6vw, 8rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <a href="#" style={{ color: CREAM, fontFamily: "'Anton', sans-serif", fontSize: '1.6rem', letterSpacing: '0.1em', textDecoration: 'none' }}>CACHÉ <span style={{ color: RED }}>BISTRÓ</span></a>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.72rem', color: 'rgba(245,237,212,0.28)', letterSpacing: '0.08em' }}>
          © 2024 Cache Bistro & Wine Bar · Mendoza, Argentina
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: 'Carta', href: MENU_URL },
            { label: 'Degustaciones', href: DEGUSTATION_URL },
            { label: 'Instagram', href: INSTAGRAM },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.72rem', color: 'rgba(245,237,212,0.38)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(245,237,212,0.75)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,237,212,0.38)'; }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <MenuGallery />
      <Degustaciones />
      <Ubicacion />
      <Contacto />
      <Footer />
    </>
  );
}
