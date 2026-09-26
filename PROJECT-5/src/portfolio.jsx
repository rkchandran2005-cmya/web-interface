import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import idCardImage from './idcard.jpeg';
import './portfolio.css';

function Navigation() {
  return (
    <nav>
      <Link className="brand" to="/"><span>KR</span> Keerthana R.</Link>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/skills">Skills</Link>
      <Link to="/achievements">Achievements</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

function Home() {
  return (
    <section className="home-page">
      <div className="home-text">
        <p className="small-title">Hello, I am</p>
        <h1>Keerthana R.</h1>
        <h3>Computer Science Student · AI/ML Enthusiast</h3>
        <p>I am an undergraduate student at Anna University who enjoys turning thoughtful questions into useful technology. My interests include artificial intelligence, machine learning, research, and full-stack development.</p>
        <div className="home-buttons"><Link className="button" to="/about">More about me</Link><Link className="text-link" to="/achievements">View my journey →</Link></div>
        <div className="quick-facts"><div><strong>Anna University</strong><span>Education</span></div><div><strong>AI + ML</strong><span>Focus area</span></div><div><strong>Open to learn</strong><span>Mindset</span></div></div>
        <div className="home-focus"><span>✦</span><div><strong>What I am exploring now</strong><p>Responsible AI, intuitive interfaces, and data-informed solutions for everyday problems.</p></div></div>
      </div>
      <div className="profile-card"><img src={idCardImage} alt="Keerthana R." /><div className="image-fallback">KR</div><span>Curious by nature.<br />Driven by impact.</span></div>
      <div className="project-strip"><div><span className="icon">⌁</span><strong>Featured direction</strong><p>Building thoughtful digital experiences with a human point of view.</p></div><Link className="text-link" to="/skills">Explore my toolkit →</Link></div>
    </section>
  );
}

function About() {
  return (
    <section className="content-page">
      <p className="small-title">About me</p>
      <h1>Curious. Creative. Consistent.</h1>
      <p className="lead">I am a Computer Science student at Anna University, building a strong foundation in software development while exploring the possibilities of artificial intelligence and machine learning.</p>
      <div className="content-columns"><div><h3>What drives me</h3><p>I like understanding how things work and then making them simpler, clearer, and more useful. Every project is an opportunity to learn a new tool, ask a better question, or collaborate with people who see a problem differently.</p></div><div><h3>Beyond the classroom</h3><p>Research publications, conferences, and hackathons have helped me become a more confident communicator and problem solver. I am especially interested in projects that connect technology with real human needs.</p></div></div>
      <div className="timeline"><div><span>2023 — now</span><strong>Computer Science at Anna University</strong><p>Building fundamentals in programming, systems, data, and software engineering.</p></div><div><span>Along the way</span><strong>Research, events, and collaboration</strong><p>Learning to communicate ideas clearly and turn teamwork into meaningful outcomes.</p></div></div>
      <div className="values"><div><span>♡</span><strong>Empathy</strong><small>Technology should serve people.</small></div><div><span>✦</span><strong>Curiosity</strong><small>Questions are where progress begins.</small></div><div><span>↗</span><strong>Momentum</strong><small>Small steps become real work.</small></div></div>
      <div className="quote">“The best way to predict the future is to create it.”</div>
    </section>
  );
}

function Skills() {
  return (
    <section className="content-page">
      <p className="small-title">My skills</p>
      <h1>Tools for turning ideas into reality.</h1>
      <p className="lead">I am continuously improving my technical toolkit through coursework, personal projects, research, and practical experimentation.</p>
      <ul className="skills">
        <li><strong>⌘</strong><span>Python</span><small>Programming & data</small></li><li><strong>◇</strong><span>JavaScript</span><small>Web development</small></li><li><strong>◈</strong><span>React</span><small>Frontend interfaces</small></li><li><strong>✧</strong><span>Machine Learning</span><small>Models & experiments</small></li><li><strong>▦</strong><span>SQL</span><small>Data management</small></li><li><strong>↗</strong><span>Git & GitHub</span><small>Version control</small></li>
      </ul>
      <div className="learning-note"><strong>Currently learning</strong><span>Deep learning · Data visualization · Stronger product thinking</span></div>
      <div className="skill-groups"><div><span className="icon">01</span><strong>Build</strong><p>React, JavaScript, HTML, CSS</p></div><div><span className="icon">02</span><strong>Analyze</strong><p>Python, SQL, data exploration</p></div><div><span className="icon">03</span><strong>Collaborate</strong><p>Git, presentations, research writing</p></div></div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="content-page">
      <p className="small-title">My journey</p>
      <h1>Milestones that shaped me.</h1>
      <p className="lead">Each experience has strengthened my curiosity, confidence, and desire to keep building.</p>
      <div className="achievement"><span>01</span><div><strong>Research Publications</strong><p>Published research papers and developed a deeper interest in academic thinking, technical writing, and exploring meaningful problems.</p></div></div>
      <div className="achievement"><span>02</span><div><strong>Conference Participation</strong><p>Attended a conference, learned from experts, and gained new perspectives on emerging ideas in technology and innovation.</p></div></div>
      <div className="achievement"><span>03</span><div><strong>Hackathon Winner</strong><p>Worked with a team to understand a challenge, build a solution, and present our idea successfully in a competitive environment.</p></div></div>
      <div className="achievement"><span>04</span><div><strong>A lifelong learner</strong><p>Every project, course, and conversation adds to the way I think. I am excited to keep growing in AI/ML and software engineering.</p></div></div>
      <div className="achievement-detail"><span className="icon">✦</span><div><strong>What these experiences taught me</strong><p>Strong work is a combination of preparation, a willingness to listen, and the courage to share an unfinished idea. I carry that lesson into every new project.</p></div></div>
      <div className="contact-panel"><span className="icon">→</span><div><strong>Let&apos;s build something useful.</strong><p>I am always interested in learning from new people, exploring ideas, and contributing to thoughtful technology.</p></div><a className="button" href="mailto:keerthana@example.com">Get in touch</a></div>
    </section>
  );
}

function Contact() {
  return (
    <section className="content-page contact-page">
      <p className="small-title">Let&apos;s connect</p>
      <h1>Have an idea?<br />Let&apos;s talk.</h1>
      <p className="lead">Whether it is a project, a research idea, or an opportunity to learn together, I would love to hear from you.</p>
      <div className="contact-options">
        <a href="mailto:keerthana@example.com"><span className="icon">@</span><strong>Email me</strong><small>keerthana@example.com</small></a>
        <a href="https://github.com" target="_blank" rel="noreferrer"><span className="icon">◈</span><strong>GitHub</strong><small>View my work →</small></a>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><span className="icon">in</span><strong>LinkedIn</strong><small>Let&apos;s connect →</small></a>
      </div>
      <form className="message-form" onSubmit={(event) => event.preventDefault()}>
        <label>Your name<input type="text" placeholder="Enter your name" /></label>
        <label>Your message<textarea placeholder="Tell me a little about your idea" rows="4" /></label>
        <button className="button" type="submit">Send a message ↗</button>
      </form>
    </section>
  );
}

function Portfolio() {
  return (
    <BrowserRouter>
      <div className="portfolio-app">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer><span>Keerthana R. · Anna University</span><span>Computer Science · AI/ML</span></footer>
      </div>
    </BrowserRouter>
  );
}

export default Portfolio;
