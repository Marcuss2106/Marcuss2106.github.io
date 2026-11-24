// Pinned hero: the name widens over a live 2D Ising lattice (lib/site.ts drives the canvas).
export default function Hero() {
	return (
	<section className="hero" id="hero">
	  <div className="lat" id="lat"><canvas id="ising" aria-hidden="true"></canvas></div>
	  <div className="hero-inner">
	    <h1 className="nm l1"><span id="l1">Marcus</span> <span className="sr">Sostak</span></h1>
	    <div className="hgap"></div>
	    <div className="nm l2" aria-hidden="true"><span id="l2">Sostak</span></div>
	  </div>
	  <div className="over pad" aria-hidden="true"><p id="over">Machine learning, computer vision and quantum sampling.</p></div>
	  <div className="tag pad mono"><span>Software engineer · AI researcher</span><span className="live"><span id="ireadout" aria-hidden="true"></span><button type="button" id="ipause">Pause</button></span></div>
	</section>
	);
}
