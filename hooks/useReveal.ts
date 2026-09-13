import { useEffect, useRef, useState } from 'react';

/**
 * Adds the `reveal-visible` class the first time an element scrolls into view.
 * Elements already in the viewport on mount reveal immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
	threshold = 0.15
) {
	const ref = useRef<T>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		if (typeof IntersectionObserver === 'undefined') {
			setVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold, rootMargin: '0px 0px -8% 0px' }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [threshold]);

	return { ref, visible };
}

/**
 * Unlike useReveal this keeps reporting, so decorative animations can be
 * paused whenever they scroll out of view rather than running forever.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>() {
	const ref = useRef<T>(null);
	const [inView, setInView] = useState(true);

	useEffect(() => {
		const node = ref.current;
		if (!node || typeof IntersectionObserver === 'undefined') return;

		const observer = new IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ rootMargin: '120px' }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return { ref, inView };
}

/** Tracks which section id currently owns the viewport, for nav highlighting. */
export function useActiveSection(ids: string[]) {
	const [active, setActive] = useState(ids[0] ?? '');

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const inView = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (inView) setActive(inView.target.id);
			},
			{ rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
		);

		const nodes = ids
			.map((id) => document.getElementById(id))
			.filter((n): n is HTMLElement => Boolean(n));
		nodes.forEach((n) => observer.observe(n));

		return () => observer.disconnect();
	}, [ids.join('|')]);

	return active;
}

/** Returns true once the user has scrolled past `offset` pixels. */
export function useScrolled(offset = 24) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > offset);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [offset]);

	return scrolled;
}
