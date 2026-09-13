import React from 'react';
import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Stack from './components/Stack';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => (
	<div className="relative min-h-screen antialiased">
		<Background />
		<ScrollProgress />
		<Nav />

		<div className="relative z-10">
			<main>
				<Hero />
				<Marquee />
				<About />
				<Experience />
				<Projects />
				<Stack />
				<Contact />
			</main>
			<Footer />
		</div>
	</div>
);

export default App;
