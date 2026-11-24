// Steel sign-off with email copy and links.
export default function Contact() {
	return (
	<section className="contact pad" id="contact">
	  <div>
	    <h2 className="big"><span className="s1">Open for </span><span className="s2">summer 2027</span></h2>
	    <div className="mail">
	      <span className="addr" id="email">marcuss2106@gmail.com</span>
	      <button type="button" id="copy">Copy email</button><span className="sr" role="status" id="copystat"></span>
	      <span className="links"><a href="https://github.com/Marcuss2106">GitHub</a><a href="https://www.linkedin.com/in/marcus-sostak/">LinkedIn</a><a href="Marcus_Sostak_Resume.pdf" target="_blank" rel="noopener">Resume (PDF)</a></span>
	    </div>
	  </div>
	  <footer className="mono"><span>© 2026 Marcus Sostak</span><span>Columbia, SC</span></footer>
	</section>
	);
}
