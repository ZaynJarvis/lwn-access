import React from 'react';
import './App.css';
import Code39 from './code39';

function App() {
	const [id, setID] = React.useState(localStorage.getItem('id') || '');
	const inputEl = React.useRef(null);
	const [temp, setTemp] = React.useState('');

	React.useEffect(() => {
		if (!id) inputEl.current.focus();
	}, [id]);

	return (
		<div className="App">
			<div className="wrapper">
				{id ? (
					<div className="barcode-page">
						<h2 className="title id-wrapper">
							{id}
							<span
								className="delete"
								onClick={() => {
									setID('');
									localStorage.clear();
								}}
							>
								X
							</span>
						</h2>
						<div className="barcode">
							{Code39(id)
								.toString()
								.split('')
								.map(x => (x === '1' ? 'set' : 'clear'))
								.map((className, idx) => (
									<span key={idx} className={className}></span>
								))}
						</div>
					</div>
				) : (
					<>
						<h2 className="title">Matric No.</h2>
						<input
							autofocus="true"
							className="input"
							ref={inputEl}
							onChange={e => {
								setTemp(e.target.value);
							}}
						/>
						<button
							className="confirm"
							onClick={() => {
								inputEl.current.focus();
								setID(temp);
								localStorage.setItem('id', temp);
							}}
						>
							This is me!
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default App;
