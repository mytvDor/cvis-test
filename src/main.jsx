import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  ChevronDown,
  Code2,
  Layers3,
  Smartphone,
  Cloud,
  BrainCircuit,
  ShieldCheck,
  Palette,
  Menu,
  X,
  MoveUpRight,
  Sparkles,
  Globe2,
  Zap,
  CircleDot,
  Plus,
  Minus,
} from "lucide-react";
import "./style.css";

const services = [
  {
    n: "01",
    icon: Code2,
    title: "Web & software development",
    text: "Purpose-built digital platforms that turn complicated workflows into effortless experiences.",
    tags: ["Web apps", "Custom software", "APIs"],
  },
  {
    n: "02",
    icon: Smartphone,
    title: "Mobile applications",
    text: "Intuitive iOS and Android experiences designed for the way your customers actually live.",
    tags: ["Android", "iOS", "Cross-platform"],
  },
  {
    n: "03",
    icon: Cloud,
    title: "Cloud & integration",
    text: "Connect your tools, modernize your systems, and make your technology work as one.",
    tags: ["Salesforce", "MuleSoft", "Cloud"],
  },
  {
    n: "04",
    icon: BrainCircuit,
    title: "AI & intelligent systems",
    text: "Practical automation and AI-powered capabilities that make your business more capable.",
    tags: ["AI workflows", "Automation", "Data"],
  },
  {
    n: "05",
    icon: Palette,
    title: "Product design & branding",
    text: "Clear, confident digital identities and interfaces that make a lasting first impression.",
    tags: ["UI/UX", "Brand identity", "Web design"],
  },
  {
    n: "06",
    icon: ShieldCheck,
    title: "QA & software testing",
    text: "Reliable releases through thoughtful testing, quality checks, and performance tuning.",
    tags: ["QA", "Automation testing", "Performance"],
  },
];
const projects = [
  {
    id: "01",
    type: "LEARNING PLATFORM",
    title: "Learning without limits.",
    desc: "A seamless digital learning experience built around video, content, and learner progress.",
    className: "project-lms",
    label: "PLENRICH / LMS",
    visual: "lms",
  },
  {
    id: "02",
    type: "PEOPLE & OPERATIONS",
    title: "Work, made simpler.",
    desc: "A connected HR experience that brings everyday employee workflows into one place.",
    className: "project-hr",
    label: "PEOPLE / HR PORTAL",
    visual: "hr",
  },
  {
    id: "03",
    type: "DIGITAL COMMERCE",
    title: "Ready for what’s next.",
    desc: "A flexible digital storefront experience designed to help businesses grow online.",
    className: "project-commerce",
    label: "COMMERCE / PLATFORM",
    visual: "commerce",
  },
];
const technologies = [
  "React",
  "Node.js",
  "Salesforce",
  "MuleSoft",
  "Flutter",
  "Android",
  "Python",
  "Cloud",
  "AI / ML",
];

function Scene() {
  const mountRef = useRef(null);
  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    let renderer,
      scene,
      camera,
      frame,
      observer,
      modelRoot,
      fallbackRoot,
      loadedRoot;
    let scrollY = window.scrollY;
    let targetScroll = scrollY;
    const disposables = [];
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0.25, 9.2);
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.65;
      host.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xe5f0ff, 0x263a59, 3.4));
      // const keyLight = new THREE.DirectionalLight(0xffffff, 4.6);
      // keyLight.position.set(4, 5, 6);
      // scene.add(keyLight);
      // const blueLight = new THREE.PointLight(0x2864f0, 42, 18);
      // blueLight.position.set(-3, 1, 3);
      // scene.add(blueLight);
      // const rimLight = new THREE.PointLight(0x8ccaff, 34, 16);
      // rimLight.position.set(3, -1, -3);
      // scene.add(rimLight);

      renderer.toneMappingExposure = 1.0;

      scene.add(
        new THREE.HemisphereLight(0xffffff, 0x777777, 1.2)
      );

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
      keyLight.position.set(4, 5, 6);
      scene.add(keyLight);

      const blueLight = new THREE.PointLight(0xffffff, 5, 18);
      blueLight.position.set(-3, 1, 3);
      scene.add(blueLight);

      const rimLight = new THREE.PointLight(0xffffff, 3, 16);
      rimLight.position.set(3, -1, -3);
      scene.add(rimLight);

      modelRoot = new THREE.Group();
      scene.add(modelRoot);

      // Polished procedural desktop setup is shown until your own GLB/GLTF is added.
      fallbackRoot = new THREE.Group();
      modelRoot.add(fallbackRoot);
      const mat = (color, metalness = 0.3, roughness = 0.3, extra = {}) =>
        new THREE.MeshStandardMaterial({
          color,
          metalness,
          roughness,
          ...extra,
        });
      const dark = mat(0x344762, 0.38, 0.32);
      const edge = mat(0x617b9e, 0.32, 0.3);
      const glass = mat(0x477bb2, 0.18, 0.26, {
        transparent: true,
        opacity: 0.48,
        metalness: 0.18,
      });
      const screenMat = mat(0x15386b, 0.12, 0.22, {
        emissive: 0x1458d4,
        emissiveIntensity: 1.65,
      });
      const blue = mat(0x5a9aff, 0.2, 0.28, {
        emissive: 0x2864f0,
        emissiveIntensity: 1.15,
      });
      const makeBox = (parent, size, material, pos, radius = 0) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
        mesh.position.set(...pos);
        parent.add(mesh);
        disposables.push(mesh.geometry, material);
        return mesh;
      };
      // PC tower on the right
      const tower = new THREE.Group();
      tower.position.set(1.25, -0.28, 0);
      fallbackRoot.add(tower);
      makeBox(tower, [1.3, 2.55, 1.15], dark, [0, 0, 0]);
      makeBox(tower, [1.12, 2.35, 0.045], glass, [0, 0, 0.6]);
      makeBox(tower, [0.09, 2.28, 0.07], edge, [-0.49, 0, 0.64]);
      makeBox(tower, [0.09, 2.28, 0.07], edge, [0.49, 0, 0.64]);
      for (let i = 0; i < 3; i++) {
        const fan = new THREE.Group();
        fan.position.set(-0.21, 0.72 - i * 0.66, 0.66);
        tower.add(fan);
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.21, 0.025, 10, 48),
          blue,
        );
        fan.add(ring);
        const hub = new THREE.Mesh(
          new THREE.CircleGeometry(0.12, 32),
          mat(0x122d57, 0.3, 0.25, {
            emissive: 0x2864f0,
            emissiveIntensity: 0.8,
          }),
        );
        hub.position.z = 0.01;
        fan.add(hub);
        for (let j = 0; j < 5; j++) {
          const blade = new THREE.Mesh(
            new THREE.BoxGeometry(0.035, 0.15, 0.015),
            blue,
          );
          blade.rotation.z = (j * Math.PI * 2) / 5;
          blade.position.z = 0.015;
          fan.add(blade);
        }
      }
      makeBox(tower, [0.28, 0.12, 0.04], blue, [0.32, 1.05, 0.65]);
      makeBox(
        tower,
        [0.08, 0.08, 0.04],
        mat(0x9bc8ff, 0.2, 0.2, { emissive: 0x367dff, emissiveIntensity: 1.4 }),
        [0.32, 0.83, 0.65],
      );
      // Monitor and stand on the left
      const monitor = new THREE.Group();
      monitor.position.set(-1.18, 0.3, -0.28);
      fallbackRoot.add(monitor);
      makeBox(monitor, [2.35, 1.48, 0.12], dark, [0, 0.48, 0]);
      makeBox(monitor, [2.2, 1.33, 0.035], screenMat, [0, 0.49, 0.075]);
      // luminous abstract UI on the display
      makeBox(monitor, [1.15, 0.055, 0.018], blue, [-0.38, 0.77, 0.1]);
      makeBox(
        monitor,
        [0.7, 0.035, 0.018],
        mat(0x8ac3ff, 0.2, 0.2, { emissive: 0x2864f0, emissiveIntensity: 1 }),
        [-0.6, 0.55, 0.1],
      );
      makeBox(
        monitor,
        [0.95, 0.035, 0.018],
        mat(0x214a88, 0.2, 0.3),
        [-0.48, 0.38, 0.1],
      );
      makeBox(
        monitor,
        [0.55, 0.035, 0.018],
        mat(0x214a88, 0.2, 0.3),
        [-0.68, 0.21, 0.1],
      );
      makeBox(monitor, [0.13, 0.55, 0.16], edge, [0, -0.35, 0]);
      makeBox(monitor, [0.7, 0.08, 0.4], dark, [0, -0.63, 0]);
      // keyboard + mouse
      const desk = new THREE.Group();
      desk.position.set(-0.1, -1.38, 0.8);
      fallbackRoot.add(desk);
      makeBox(desk, [2.0, 0.12, 0.62], dark, [-0.48, 0, 0]);
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 13; c++)
          makeBox(
            desk,
            [0.105, 0.025, 0.105],
            (r + c) % 4 === 0 ? blue : edge,
            [-1.35 + c * 0.145, 0.075, -0.19 + r * 0.16],
          );
      const mouse = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 20, 14),
        dark,
      );
      mouse.scale.set(0.7, 0.65, 1.25);
      mouse.position.set(1.02, 0.07, 0.05);
      desk.add(mouse);
      const mouseLine = new THREE.Mesh(
        new THREE.BoxGeometry(0.018, 0.012, 0.12),
        blue,
      );
      mouseLine.position.set(1.02, 0.17, 0.02);
      desk.add(mouseLine);

      // Load your model from public/models/gaming-pc.glb. GLB keeps materials and textures together.
      const loader = new GLTFLoader();

      loader.load(
        "/models/desktop_pc/scene.gltf",
        (gltf) => {
          const loadedRoot = gltf.scene;

          // Center and scale the model.
          const box = new THREE.Box3().setFromObject(loadedRoot);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;

          loadedRoot.position.sub(center);
          loadedRoot.scale.setScalar(4.7 / maxDim);

          loadedRoot.traverse((obj) => {
            if (obj.isMesh) {
              obj.castShadow = true;
              obj.receiveShadow = true;
            }
          });

          loadedRoot.rotation.y = Math.PI;
          modelRoot.add(loadedRoot);
          fallbackRoot.visible = false;
        },
        undefined,
        (error) => {
          console.error("GLTF model loading failed:", error);
        },
      );

      const resize = () => {
        if (!host.clientWidth || !host.clientHeight) return;
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight);
      };
      observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();
      const onScroll = () => {
        targetScroll = window.scrollY;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      const onMove = (e) => {
        const rect = host.getBoundingClientRect();
        modelRoot.userData.mx =
          ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 0.2;
        modelRoot.userData.my =
          ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 0.12;
      };
      host.addEventListener("pointermove", onMove);
      const clock = new THREE.Clock();
      const animate = () => {
        frame = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        scrollY += (targetScroll - scrollY) * 0.085;
        const rect = host.getBoundingClientRect();
        const progress = THREE.MathUtils.clamp(
          (window.innerHeight * 0.78 - rect.top) /
          (window.innerHeight + rect.height * 0.62),
          0,
          1,
        );
        modelRoot.rotation.y =
          -0.28 + progress * Math.PI * 1.55 + (modelRoot.userData.mx || 0);
        modelRoot.rotation.x =
          Math.sin(progress * Math.PI) * 0.13 + (modelRoot.userData.my || 0);
        modelRoot.rotation.z = Math.sin(progress * Math.PI * 1.5) * 0.035;
        modelRoot.position.y = Math.sin(t * 0.8) * 0.035 + progress * 0.12;
        modelRoot.position.x = 1.7;
        modelRoot.position.y = 0.7;
        modelRoot.scale.setScalar(1 + Math.sin(progress * Math.PI) * 0.055);
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        cancelAnimationFrame(frame);
        observer?.disconnect();
        window.removeEventListener("scroll", onScroll);
        host.removeEventListener("pointermove", onMove);
        renderer.dispose();
        if (renderer.domElement.parentNode === host)
          host.removeChild(renderer.domElement);
        scene.traverse((obj) => {
          if (obj.isMesh) {
            obj.geometry?.dispose?.();
            if (Array.isArray(obj.material))
              obj.material.forEach((m) => m.dispose?.());
            else obj.material?.dispose?.();
          }
        });
        disposables.forEach((item) => item?.dispose?.());
      };
    } catch (e) {
      console.warn("3D PC scene unavailable", e);
    }
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      if (renderer?.domElement?.parentNode === host)
        host.removeChild(renderer.domElement);
      renderer?.dispose();
    };
  }, []);
  return (
    <div
      className="scene pc-scene"
      ref={mountRef}
      aria-label="Interactive 3D desktop computer setup"
      role="img"
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    ["Services", "#services"],
    ["Selected work", "#work"],
    ["Our approach", "#approach"],
    ["About", "#about"],
  ];
  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="Collab Vision home">
        <span className="brand-mark">
          <Asterisk size={25} strokeWidth={2.8} />
        </span>
        <span>
          collab<span className="brand-light">vision</span>
          <small>INFOSOLUTION</small>
        </span>
      </a>
      <nav className={open ? "nav nav-open" : "nav"}>
        {links.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          className="nav-mobile-cta"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Let’s talk <ArrowUpRight size={15} />
        </a>
      </nav>
      <a className="header-cta" href="#contact">
        Start a project <ArrowUpRight size={16} />
      </a>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="live-dot" /> YOUR TECHNOLOGY PARTNER{" "}
          <span className="eyebrow-line" />
        </div>
        <h1>
          Ideas into
          <br />
          <span className="outlined">impact.</span>
          <span className="hero-star">✳</span>
        </h1>
        <p className="hero-lead">
          We build digital experiences and intelligent software that help
          ambitious businesses move forward.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">
            Let’s build something <ArrowUpRight size={17} />
          </a>
          <a className="text-link" href="#work">
            Explore our work <ArrowDownRight size={17} />
          </a>
        </div>
        <div className="hero-meta">
          <div className="avatar-stack">
            <span>C</span>
            <span>V</span>
            <span>+</span>
          </div>
          <div>
            <strong>Built around your vision</strong>
            <small>Thoughtful teams. Practical technology.</small>
          </div>
        </div>
      </div>
      <div className="hero-art">
        <div className="art-glow" />
        <Scene />
        <div className="orbit-label orbit-top">
          <span className="mini-dot" /> SYSTEMS / IN MOTION
        </div>
        <div className="orbit-label orbit-bottom">
          DESIGN × ENGINEERING <span>↗</span>
        </div>
        <div className="floating-card card-code">
          <span className="card-dot" />
          <span>BUILD STATUS</span>
          <strong>Everything connected</strong>
          <div className="code-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="floating-card card-data">
          <span>LIVE SYSTEMS</span>
          <strong>01 — 06</strong>
          <small>
            <span className="live-dot" /> All systems thinking
          </small>
        </div>
        <div className="art-crosshair crosshair-one">+</div>
        <div className="art-crosshair crosshair-two">+</div>
      </div>
      <div className="hero-footer">
        <span>INDEPENDENT THINKING. COLLABORATIVE BUILDING.</span>
        <a href="#intro">
          SCROLL TO EXPLORE <ArrowDownRight size={14} />
        </a>
        <span className="hero-index">01 / 05</span>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro section-pad" id="intro">
      <div className="section-kicker">
        <span>01 / WHO WE ARE</span>
        <span className="kicker-line" />
      </div>
      <div className="intro-content">
        <h2>
          Good technology
          <br />
          should feel <em>inevitable.</em>
        </h2>
        <div className="intro-right">
          <p>
            We’re Collab Vision Infosolution. We bring strategy, design, and
            engineering together to solve real business challenges—with software
            that feels considered, works beautifully, and grows with you.
          </p>
          <a
            className="round-link"
            href="#about"
            aria-label="Discover Collab Vision"
          >
            <ArrowUpRight />
          </a>
        </div>
      </div>
      <div className="principles">
        <div>
          <span>01</span>
          <strong>Understand first.</strong>
          <p>
            We start with your people, your problem, and the outcome that
            matters.
          </p>
        </div>
        <div>
          <span>02</span>
          <strong>Make it meaningful.</strong>
          <p>Every feature has a purpose. Every interaction earns its place.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Build for what’s next.</strong>
          <p>Flexible foundations that keep working long after launch day.</p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  return (
    <section className="services section-pad" id="services">
      <div className="section-kicker">
        <span>02 / WHAT WE DO</span>
        <span className="kicker-line" />
        <span className="kicker-note">
          CAPABILITIES, WITHOUT THE COMPLICATION
        </span>
      </div>
      <div className="section-heading">
        <h2>
          Complex challenges.
          <br />
          <em>Clear solutions.</em>
        </h2>
        <p>
          From first sketch to production-ready product, we bring the right
          minds and tools to every stage of your digital journey.
        </p>
      </div>
      <div className="services-layout">
        <div className="service-list">
          {services.map((s, i) => (
            <button
              key={s.n}
              className={`service-row ${active === i ? "service-active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className="service-number">{s.n}</span>
              <span className="service-title">{s.title}</span>
              <ArrowUpRight className="service-arrow" size={18} />
            </button>
          ))}
        </div>
        <div className="service-detail" key={active}>
          <div className="service-detail-top">
            <div className="service-icon">
              {React.createElement(services[active].icon, {
                size: 25,
                strokeWidth: 1.5,
              })}
            </div>
            <span>CAPABILITY / {services[active].n}</span>
          </div>
          <h3>{services[active].title}</h3>
          <p>{services[active].text}</p>
          <div className="service-tags">
            {services[active].tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a className="detail-link" href="#contact">
            Talk to us about this <ArrowUpRight size={16} />
          </a>
          <div className="detail-decoration">
            <Layers3 size={125} strokeWidth={0.5} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ visual }) {
  if (visual === "lms")
    return (
      <div className="mock-window lms-window">
        <div className="mock-top">
          <span />
          <span />
          <span />
          <small>learn / dashboard</small>
        </div>
        <div className="mock-layout">
          <div className="mock-sidebar">
            <b>p.</b>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="mock-main">
            <div className="mock-greeting">
              Your next chapter
              <br />
              <b>starts here.</b>
            </div>
            <div className="mock-video">
              <div className="play">▶</div>
              <span>DESIGN SYSTEMS · LESSON 04</span>
            </div>
            <div className="mock-mini-row">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    );
  if (visual === "hr")
    return (
      <div className="mock-window hr-window">
        <div className="hr-header">
          <b>
            people<span>OS</span>
          </b>
          <span>•••</span>
        </div>
        <div className="hr-welcome">
          Good morning, Alex <span>✳</span>
          <small>Here’s what’s happening today.</small>
        </div>
        <div className="hr-stats">
          <div>
            <small>TEAM MEMBERS</small>
            <b>248</b>
            <span>↗ 12 this month</span>
          </div>
          <div>
            <small>ON LEAVE</small>
            <b>08</b>
            <span>Across 3 teams</span>
          </div>
        </div>
        <div className="hr-list">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  return (
    <div className="mock-window commerce-window">
      <div className="shop-top">
        <b>FORME®</b>
        <span>OBJECTS FOR LIVING　　BAG (0)</span>
      </div>
      <div className="shop-content">
        <span>COLLECTION 01 — 2026</span>
        <b>
          Made for
          <br />
          <em>every day.</em>
        </b>
        <button>DISCOVER OBJECTS ↗</button>
      </div>
      <div className="shop-orb" />
      <div className="shop-bottom">
        LESS, BUT BETTER <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </div>
  );
}
function Work() {
  return (
    <section className="work section-pad" id="work">
      <div className="section-kicker">
        <span>03 / SELECTED WORK</span>
        <span className="kicker-line" />
        <span className="kicker-note">
          THOUGHTFUL BY DESIGN. BUILT TO PERFORM.
        </span>
      </div>
      <div className="section-heading">
        <h2>
          Work that works
          <br />
          <em>in the real world.</em>
        </h2>
        <p>
          Different challenges, one shared ambition: make things better for the
          people who use them.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((p, i) => (
          <article className={`project-card ${p.className}`} key={p.id}>
            <div className="project-visual">
              <div className="project-label">
                <span>{p.label}</span>
                <ArrowUpRight size={17} />
              </div>
              <ProjectVisual visual={p.visual} />
              <div className="project-index">{p.id}</div>
            </div>
            <div className="project-info">
              <div>
                <span className="project-type">{p.type}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
              <a
                href="#contact"
                aria-label={`Discuss a project like ${p.title}`}
              >
                <ArrowUpRight />
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="work-note">
        <span className="live-dot" /> PROJECT EXAMPLES SHOWN AS CONCEPT
        DIRECTIONS <span>YOUR NEXT STORY COULD BE HERE ↗</span>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    {
      n: "01",
      title: "Listen & discover",
      text: "We ask better questions, understand your users, and define what success really looks like.",
    },
    {
      n: "02",
      title: "Shape the direction",
      text: "We turn the brief into a clear plan, a shared vision, and the right technical foundation.",
    },
    {
      n: "03",
      title: "Design & build",
      text: "We work in focused iterations, making progress visible and decisions collaborative.",
    },
    {
      n: "04",
      title: "Launch & evolve",
      text: "We help you release with confidence, learn from real usage, and keep improving.",
    },
  ];
  return (
    <section className="approach section-pad" id="approach">
      <div className="section-kicker">
        <span>04 / HOW WE WORK</span>
        <span className="kicker-line" />
        <span className="kicker-note">
          NO BLACK BOX. JUST GOOD COLLABORATION.
        </span>
      </div>
      <div className="approach-grid">
        <div className="approach-heading">
          <h2>
            Better work
            <br />
            happens <em>together.</em>
          </h2>
          <p>
            We keep the process transparent, the communication human, and the
            focus on what moves your business forward.
          </p>
          <a className="text-link" href="#contact">
            Meet your future team <ArrowUpRight size={16} />
          </a>
          <div className="approach-stamp">
            <Asterisk size={34} />
            <span>
              THOUGHTFUL
              <br />
              BY DEFAULT
            </span>
          </div>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <span className="step-number">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              <ArrowUpRight className="step-arrow" size={18} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="section-kicker">
        <span>05 / THE COLLAB VISION DIFFERENCE</span>
        <span className="kicker-line" />
      </div>
      <div className="about-main">
        <div>
          <span className="about-chip">
            <Sparkles size={14} /> SMALL TEAM. BIG PICTURE.
          </span>
          <h2>
            We don’t just
            <br />
            ship software.
            <br />
            <em>We move things forward.</em>
          </h2>
        </div>
        <div className="about-side">
          <p>
            Great outcomes come from close collaboration. We combine practical
            engineering with a thoughtful approach to design—so what we make
            fits your business, your team, and the people you serve.
          </p>
          <a className="btn btn-outline" href="#contact">
            Get to know us <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="tech-strip">
        <span>TOOLS CHANGE. GOOD THINKING DOESN’T.</span>
        <div>
          {technologies.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const items = [
    {
      quote:
        "The team delivered a smooth and user-friendly LMS website. Students can seamlessly view learning videos. The project met our expectations.",
      name: "Peter",
      place: "Singapore",
      site: "PLENRICH",
    },
    {
      quote:
        "The website was delivered as per our requirements with a clean UI, smooth user experience, and reliable performance.",
      name: "Cecilia Yang",
      place: "Singapore",
      site: "SWISSCO TECH",
    },
    {
      quote:
        "Satisfied with the Android and iOS HR portal delivery and overall application quality.",
      name: "Nitish B.",
      place: "India",
      site: "HR PORTAL",
    },
  ];
  return (
    <section className="testimonial section-pad">
      <div className="section-kicker">
        <span>WHAT PARTNERS SAY</span>
        <span className="kicker-line" />
        <span className="kicker-note">GOOD WORK SPEAKS FOR ITSELF</span>
      </div>
      <div className="quote-layout">
        <div className="quote-mark">“</div>
        <div className="quote-content" key={index}>
          <div className="quote-stars">★★★★★</div>
          <blockquote>{items[index].quote}</blockquote>
          <div className="quote-person">
            <div className="quote-avatar">{items[index].name.charAt(0)}</div>
            <div>
              <strong>{items[index].name}</strong>
              <span>
                {items[index].place} <i>·</i> {items[index].site}
              </span>
            </div>
          </div>
        </div>
        <div className="quote-controls">
          <span>
            0{index + 1} <i>/</i> 0{items.length}
          </span>
          <button
            onClick={() => setIndex((index + items.length - 1) % items.length)}
            aria-label="Previous testimonial"
          >
            <ArrowRight className="arrow-back" />
          </button>
          <button
            onClick={() => setIndex((index + 1) % items.length)}
            aria-label="Next testimonial"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nInterested in: ${form.service || "Not specified"}\n\nProject details:\n${form.message}`,
    );
    window.location.href = `mailto:info@collabvision.in?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-glow" />
      <div className="section-kicker">
        <span>LET’S MAKE SOMETHING MATTER</span>
        <span className="kicker-line" />
        <span className="kicker-note">YOUR NEXT CHAPTER STARTS HERE</span>
      </div>
      <div className="contact-grid">
        <div className="contact-copy">
          <h2>
            Have a good
            <br />
            problem? <em>Let’s solve it.</em>
          </h2>
          <p>
            Tell us what you’re imagining, what isn’t working, or what you’d
            love to make possible. We’ll take it from there.
          </p>
          <a className="contact-email" href="mailto:info@collabvision.in">
            info@collabvision.in <ArrowUpRight size={17} />
          </a>
          <div className="contact-location">
            <Globe2 size={16} />
            <span>
              Kolhapur, Maharashtra, India
              <br />
              <small>Working with ideas everywhere.</small>
            </span>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="form-heading">
            <span>START A CONVERSATION</span>
            <span>IT STARTS WITH A HELLO.</span>
          </div>
          <label>
            Your name
            <input
              name="name"
              value={form.name}
              onChange={update}
              placeholder="How should we call you?"
              required
            />
          </label>
          <label>
            Email address
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              placeholder="you@company.com"
              required
            />
          </label>
          <label>
            What do you need help with?
            <div className="select-wrap">
              <select
                name="service"
                value={form.service}
                onChange={update}
                required
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option>Web / Software Development</option>
                <option>Mobile Application</option>
                <option>Cloud / Salesforce / MuleSoft</option>
                <option>AI & Automation</option>
                <option>Product Design / Branding</option>
                <option>QA & Testing</option>
                <option>Something else</option>
              </select>
              <ChevronDown size={16} />
            </div>
          </label>
          <label>
            Tell us a little about it
            <textarea
              name="message"
              value={form.message}
              onChange={update}
              placeholder="A few lines about your project, goals, or challenge..."
              rows="3"
              required
            />
          </label>
          <button className="btn btn-primary form-submit" type="submit">
            {sent ? "Open your email app" : "Send project enquiry"}{" "}
            <ArrowUpRight size={17} />
          </button>
          <small className="form-note">
            This opens your email app with the enquiry ready to send.
          </small>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">
            <Asterisk size={25} strokeWidth={2.8} />
          </span>
          <span>
            collab<span className="brand-light">vision</span>
            <small>INFOSOLUTION</small>
          </span>
        </a>
        <p>
          Thoughtful technology.
          <br />
          <em>Meaningful progress.</em>
        </p>
        <a className="back-top" href="#top">
          BACK TO TOP <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} COLLAB VISION INFOSOLUTION</span>
        <span>YOUR VISION, OUR SOLUTION.</span>
        <div>
          <a
            href="https://www.linkedin.com/company/collab-vision-infosolution/"
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN ↗
          </a>
          <a
            href="https://www.collabvision.in/"
            target="_blank"
            rel="noreferrer"
          >
            ORIGINAL WEBSITE ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Work />
        <Approach />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
