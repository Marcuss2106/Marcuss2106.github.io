import React, { useEffect, useRef } from 'react';

/** Writes the scale directly to the node so scrolling never triggers a render. */
const ScrollProgress: React.FC = () => {
	const barRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let frame = 0;

		const update = () => {
			frame = 0;
			const scrollable =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
			if (barRef.current) {
				barRef.current.style.transform = `scaleX(${progress})`;
			}
		};

		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, []);

	return (
		<div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-px bg-transparent">
			<div
				ref={barRef}
				className="h-full origin-left scale-x-0 bg-gradient-to-r from-iris-500 via-flare-400 to-aqua-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
			/>
		</div>
	);
};

export default ScrollProgress;
