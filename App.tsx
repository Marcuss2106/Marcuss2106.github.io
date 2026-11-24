import { useEffect } from 'react';
import Bar from './components/Bar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Wins from './components/Wins';
import Spec from './components/Spec';
import Experience from './components/Experience';
import Leadership from './components/Leadership';
import Tools from './components/Tools';
import MoreProjects from './components/MoreProjects';
import Contact from './components/Contact';
import { initSite } from './lib/site';

// The page is static markup. All motion, canvases and scroll choreography live in lib/site.ts,
// which runs once after the first render.
export default function App() {
	useEffect(() => {
		initSite();
	}, []);

	return (
		<>
			<Bar />
			<main id="top">
				<Hero />
				<About />
				<Work />
				<Wins />
				<Spec />
				<Experience />
				<Leadership />
				<Tools />
				<MoreProjects />
				<Contact />
			</main>
		</>
	);
}
