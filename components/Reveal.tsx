import React from 'react';
import { useReveal } from '../hooks/useReveal';

interface RevealProps {
	children: React.ReactNode;
	className?: string;
	/** Stagger in milliseconds. */
	delay?: number;
	as?: 'div' | 'section' | 'li' | 'article' | 'header';
}

const Reveal: React.FC<RevealProps> = ({
	children,
	className = '',
	delay = 0,
	as: Tag = 'div',
}) => {
	const { ref, visible } = useReveal<HTMLDivElement>();

	return (
		<Tag
			ref={ref as React.Ref<any>}
			className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</Tag>
	);
};

export default Reveal;
