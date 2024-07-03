import { useOpenSeadragon } from './lib';

function App() {
	const [ref, { isReady }] = useOpenSeadragon(
		'https://openseadragon.github.io/example-images/highsmith/highsmith.dzi'
	);

	return (
		<div>
			<div
				id='content'
				ref={ref}
				style={{
					width: '500px',
					height: '500px',
					border: '2px solid red',
					background: '#acacac',
				}}
			/>
		</div>
	);
}

export default App;
