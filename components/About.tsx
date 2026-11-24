// Pinned four-screen About plate. Figures are drawn on #fcan by lib/site.ts.
export default function About() {
	return (
	<section className="fields" id="fields">
	  <div className="f-stage" id="fstage" data-phase="0">
	    <div className="f-left pad">
	      <div className="k mono"><span>About</span><span id="ffig">Columbia, SC</span></div>
	      <div className="f-words"><h2 className="fw intro on">Hello</h2><h2 className="fw">Quantum</h2><h2 className="fw">Vision</h2><h2 className="fw">Learning</h2></div>
	      <div className="f-caps">
	        <p className="big on">I study computer science at the University of South Carolina, with an AI concentration and a math minor, and do machine learning research at ARLIS, University of Maryland. I build ML that has to work <span>outside the notebook</span>.</p>
	        <p>I won IBM Qiskit Fall Fest 2026 with QeMCMC, quantum-enhanced Markov chain Monte Carlo: a quantum circuit proposes the moves for a sampler that builds long–short portfolios of real ETFs and stocks. This sphere is one qubit; the readout gives its odds of measuring 1.</p>
	        <p>I climb a few times a week, so I trained a detector for climbing holds. Under every detector is a filter like this one: Sobel edges, running on the wall photo in your browser.</p>
	        <p>Now I do machine learning research at ARLIS, University of Maryland: feature extraction and multimodal embeddings, where images and text share one space. Here, 16 image–text pairs train live with a contrastive loss until each pair lines up.</p>
	      </div>
	      <div className="f-ticks" aria-hidden="true"><i><b></b></i><i><b></b></i><i><b></b></i><i><b></b></i></div>
	    </div>
	    <div className="f-fig" aria-hidden="true"><canvas id="fcan"></canvas><div className="f-read mono" id="fread"></div></div>
	  </div>
	</section>
	);
}
