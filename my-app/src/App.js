import logo from './logo.svg';
import './App.css';
import { createElement } from 'react';

/* export const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload 2.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<span className="fullYear">{new Date().getFullYear()}</span>
			</header>
		</div>
	);
};*/

const getFullYear = () => new Date().getFullYear();

function Image({ srcLogo }) {
	return createElement('img', {
		src: srcLogo,
		className: 'App-logo',
		alt: 'logo',
	});
}

function Paragraph() {
	return createElement(
		'p',
		null,
		'Edit ',
		createElement('code', null, 'src/App.js'),
		' and save to reload.',
	);
}

function Anchor({ hrefAddress }) {
	return createElement(
		'a',
		{
			className: 'App-link',
			href: hrefAddress,
			target: '_blank',
			rel: 'noopener noreferrer',
		},
		'Learn React',
	);
}

function Span() {
	return createElement(
		'span',
		{
			className: 'fullYear',
		},
		getFullYear(),
	);
}

export const App = function () {
	return createElement(
		'div',
		{
			className: 'App',
		},
		createElement(
			'header',
			{
				className: 'App-header',
			},
			createElement(Image, { srcLogo: logo }),
			createElement(Paragraph),
			createElement(Anchor, { hrefAddress: 'https://reactjs.org' }),
			createElement(Span),
		),
	);
};

/* Весь HTML код является декларативным
    функция new Date - является декларативным
    getFullYear() - является декларативным
*/
