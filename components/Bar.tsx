// Skip link and fixed top bar. The Motion button is wired up in lib/site.ts.
export default function Bar() {
	return (
		<>
		<a className="skip" href="#fields">Skip to content</a>
		<header className="bar pad">
		  <a className="name" href="#top">Marcus Sostak</a>
		  <div className="rt"><button type="button" className="mt" id="motion">Motion</button><nav aria-label="Sections"><a href="#fields">About</a><a href="#work">Work</a><a href="#experience">Experience</a><a className="keep" href="#contact">Contact</a></nav></div>
		</header>
		</>
	);
}
