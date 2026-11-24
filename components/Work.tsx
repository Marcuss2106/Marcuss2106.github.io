// Horizontal work reel (vertical stack on phones and with reduced motion).
export default function Work() {
	return (
	<section className="reel" id="work">
	  <div className="track" id="track">
	
	    <div className="panel p-intro pad">
	      <div className="cap mono"><span>Selected work</span><span>Scroll →</span></div>
	      <h2>Work</h2>
	      <p>Five projects, from a winning quantum computing hackathon entry to a C++ systems tool.</p>
	    </div>
	
	    <article className="panel pad" data-panel>
	      <div className="cap mono"><span>01 — Quantum computing</span><span>Nov 2026</span></div>
	      <div className="p-grid pad" style={{ paddingLeft: 'calc(var(--gx) + 2vw)', paddingRight: 'calc(var(--gr) + 2vw)' }}>
	        <div className="p-text">
	          <h3>QeMCMC</h3>
	          <p className="sub mono">Quantum-enhanced Markov chain Monte Carlo</p>
	          <p className="award">Winner, IBM Qiskit Fall Fest 2026 · Quantum Optimization advanced track</p>
	          <p>A sampler that builds market-neutral long–short portfolios from real ETFs and stocks. Each move is proposed by a quantum circuit instead of a random swap. In simulation it mixed faster than tuned classical moves; on IBM hardware, noise erased the gain. Every result is checked against an exact answer key.</p>
	          <div className="facts"><div><b>81–91%</b><span className="mono">held-out wins</span></div><div><b>~350×</b><span className="mono">faster exact sim</span></div><div><b>12 s</b><span className="mono">on ibm_marrakesh</span></div></div>
	          <a className="go" href="https://github.com/Marcuss2106/quantum-mcmc-portfolio-sampling">Code and write-up <span aria-hidden="true">↗</span></a>
	        </div>
	        <div className="diagram" aria-hidden="true">
	          <svg viewBox="0 0 640 300" id="circuit">
	            <g id="wires"></g>
	            <g id="gates"></g>
	            <path className="dim-line" d="M70 270 V280 H570 V270" />
	            <text className="dimtext" x="320" y="296" textAnchor="middle">U = M(β) · P(γ) · M(β)ᵀ — palindromic, so proposals are symmetric</text>
	          </svg>
	        </div>
	      </div>
	    </article>
	
	    <article className="panel pad" data-panel>
	      <div className="cap mono"><span>02 — Computer vision</span><span>2026</span></div>
	      <div className="p-grid" style={{ paddingLeft: 'calc(var(--gx) + 2vw)', paddingRight: 'calc(var(--gr) + 2vw)' }}>
	        <div className="p-text">
	          <h3>Polepad</h3>
	          <p className="award">First place, GridStorm Hackathon · presented to Dominion Energy's CTO</p>
	          <p>Built in 24 hours at GridStorm, run with Dominion Energy. A phone app sends a pole photo and a close-up of its ID tag to a FastAPI service that runs three models in one request: OCR for the tag, a fine-tuned YOLO detector for pole type and hardware, and YOLO segmentation for vegetation. An inspector then confirms the pre-filled record, with uncertain characters flagged.</p>
	          <p className="team mono">With Marshall Pigford, Joe Hardy and Gracen Greenburg</p>
	          <div className="facts"><div><b>0.84</b><span className="mono">mAP@0.5</span></div><div><b>&lt;1 s</b><span className="mono">inference</span></div><div><b>−65%</b><span className="mono">cold start</span></div></div>
	          <a className="go" href="https://github.com/Marcuss2106/gridstorm-polepad-ai">Code <span aria-hidden="true">↗</span></a>
	        </div>
	        <div className="shots">
	          <figure className="sh w"><img src="pole-seg.webp" alt="Model output on a street photo: detection boxes a wood pole, segmentation masks the vegetation, and the combined view flags encroachment" width="1400" height="489" loading="lazy" decoding="async" /><div className="cover"></div><figcaption className="mono">detection · segmentation · combined → encroachment</figcaption></figure>
	          <figure className="sh t"><img src="pole-app.webp" alt="PolePad tablet app reviewing AI results: pole ID 625296 at 100 percent, pole type wood at 83 percent, uncertain fields highlighted" width="800" height="1067" loading="lazy" decoding="async" /><div className="cover"></div><figcaption className="mono">inspector review</figcaption></figure>
	        </div>
	      </div>
	    </article>
	
	    <article className="panel pad" data-panel>
	      <div className="cap mono"><span>03 — Signal processing</span><span>Oct 2026</span></div>
	      <div className="p-grid" style={{ paddingLeft: 'calc(var(--gx) + 2vw)', paddingRight: 'calc(var(--gr) + 2vw)' }}>
	        <div className="p-text">
	          <h3>Routz</h3>
	          <p className="sub mono">Hear the train. Predict the blocked crossing. Reroute the ambulance.</p>
	          <p>Built in 24 hours. A 3D simulation streams three microphone channels as a freight train runs through downtown Columbia. A Python service finds the train from the audio alone, using GCC-PHAT time delays and a Kalman filter, and forecasts when each crossing will close. A mobile map then routes around the blockage with spoken alerts. All data is simulated.</p>
	          <div className="facts"><div><b>~30 m</b><span className="mono">median error, 20 dB</span></div><div><b>&lt;150 ms</b><span className="mono">alert latency p95</span></div><div><b>4</b><span className="mono">services</span></div></div>
	          <a className="go" href="https://github.com/Marcuss2106/Routz">Code <span aria-hidden="true">↗</span></a>
	        </div>
	        <div className="shots tall">
	          <figure className="sh w"><img src="routz-sim.webp" alt="3D simulation: a freight train passes three virtual microphones whose sound rings spread across downtown Columbia, beside an acoustic array panel" width="799" height="535" loading="lazy" decoding="async" /><div className="cover"></div><figcaption className="mono">listen: 3 mics, audio only</figcaption></figure>
	          <figure className="sh t"><img src="routz-map.webp" alt="Mobile map rerouted around a blocked crossing to Prisma Health Richland Hospital, 14 minutes" width="630" height="973" loading="lazy" decoding="async" /><div className="cover"></div><figcaption className="mono">reroute</figcaption></figure>
	        </div>
	      </div>
	    </article>
	
	    <article className="panel p-photo" data-panel>
	      <figure className="ph" style={{ margin: '0' }}><img src="holds2.webp" alt="Detector output on a bouldering video frame: holds boxed and labeled jug, crimp, pinch and sloper" width="1400" height="1132" loading="lazy" decoding="async" /><div className="cover" data-wipe></div><figcaption className="mono">model output · jug / crimp / pinch / sloper</figcaption></figure>
	      <div className="cap mono"><span>04 — Deep learning</span><span>2026</span></div>
	      <div className="p-grid" style={{ paddingLeft: 'calc(var(--gx) + 2vw)', paddingRight: 'calc(var(--gr) + 2vw)' }}>
	        <div className="p-text">
	          <h3>Hold<br /> detection</h3>
	          <p>A YOLOv11 detector finds climbing holds in gym video at 30 fps, and a CNN sorts them into six types. The hard part was data: a pipeline that pulls route footage and crops holds from annotations produced 60K training samples.</p>
	          <div className="facts"><div><b>92%</b><span className="mono">detection accuracy</span></div><div><b>30 fps</b><span className="mono">video</span></div><div><b>60K</b><span className="mono">samples</span></div></div>
	          <a className="go" href="https://github.com/Marcuss2106/indoor-climbing-gym-hold-classification">Code <span aria-hidden="true">↗</span></a>
	        </div>
	      </div>
	    </article>
	
	    <article className="panel pad" data-panel>
	      <div className="cap mono"><span>05 — Systems</span><span>2026</span></div>
	      <div className="p-grid" style={{ paddingLeft: 'calc(var(--gx) + 2vw)', paddingRight: 'calc(var(--gr) + 2vw)' }}>
	        <div className="p-text">
	          <h3>mmap_util</h3>
	          <p>A C++17 tool that edits files through <span className="mono">mmap</span>: create, insert bytes at any offset with the tail shifted, append from stdin. On the right: <span className="mono">create data.bin A 1024</span>, then <span className="mono">insert "hell"</span> at offset 100.</p>
	          <a className="go" href="https://github.com/Marcuss2106/memory-mapped-file-manipulation">Code <span aria-hidden="true">↗</span></a>
	        </div>
	        <div className="hex" id="hex" aria-hidden="true"></div>
	      </div>
	    </article>
	  </div>
	</section>
	);
}
