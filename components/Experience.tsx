import type { CSSProperties } from 'react';

// Stacking experience cards.
export default function Experience() {
	return (
	<section className="roles pad" id="experience">
	  <div className="roles-head"><h2><span className="ln-mask"><span data-rise>Experience</span></span></h2><p>Research first, then shipping. Each role below is what I owned, not what the team did.</p></div>
	  <div className="cards">
	    <article className="card now" style={{ '--i': 0 } as CSSProperties}>
	      <div><div className="idx mono"><span className="live-dot"></span>Current</div><h3>Research Assistant</h3><div className="org">ARLIS, University of Maryland</div></div>
	      <ul>
	        <li>Build <b>feature extraction</b> pipelines that turn video into model-ready representations.</li>
	        <li>Work on <b>multimodal embeddings</b> that place visual and text features in one shared space.</li>
	      </ul>
	    </article>
	    <article className="card" style={{ '--i': 1 } as CSSProperties}>
	      <div><div className="idx mono">May – Aug 2026 · College Park, MD</div><h3>Research Intern</h3><div className="org">ARLIS, University of Maryland</div></div>
	      <ul>
	        <li>Built an evaluation schema scoring <b>3 government models</b> on task performance, robustness, OPSEC risk, prompt-injection susceptibility and bias.</li>
	        <li>Designed an AI governance framework across <b>8+ enterprise domains</b> and assessed <b>10+ use cases</b>.</li>
	        <li>Wrote the responsible AI adoption roadmap for agency leadership.</li>
	      </ul>
	    </article>
	    <article className="card" style={{ '--i': 2 } as CSSProperties}>
	      <div><div className="idx mono">May 2025 – May 2026 · Columbia, SC</div><h3>Undergraduate Research Assistant</h3><div className="org">University of South Carolina · Wordification</div><a className="shot" href="https://wordification.scholastechnology.com/"><img src="wordification.webp" alt="Wordification landing page: Unlock every student's potential, by ScholasTech" width="1000" height="625" loading="lazy" decoding="async" /></a><a className="site" href="https://wordification.scholastechnology.com/">Live site <span aria-hidden="true">↗</span></a></div>
	      <ul>
	        <li>Removed <b>1,000+ lines</b> of redundant code from a RedwoodJS, GraphQL and PostgreSQL platform.</li>
	        <li>Added CI preview environments, cutting review turnaround by <b>about half</b>.</li>
	        <li>One of five developers on a <b>$250K+</b> grant-funded project.</li>
	      </ul>
	    </article>
	  </div>
	</section>
	);
}
