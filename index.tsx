import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
	throw new Error('Could not find root element to mount to');
}

// Cheap proxy for "this machine will struggle with continuous GPU work".
// index.css and Background key the most expensive ambient effects off this.
// Append ?lite to the URL to force it on and A/B the ambient effects.
const forcedLite = new URLSearchParams(window.location.search).has('lite');
if (forcedLite || (navigator.hardwareConcurrency ?? 8) <= 4) {
	document.documentElement.dataset.lowPower = 'true';
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
