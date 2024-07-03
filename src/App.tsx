import { useOpenSeadragon } from './lib';

function App() {
	const [ref, { isReady }] = useOpenSeadragon(
		'https://openseadragon.github.io/example-images/highsmith/highsmith.dzi'
	);

	return (
		<div>
			{isReady}
			<div
				id='content'
				ref={ref}
				style={{ width: '500px', height: '500px' }}
			/>
		</div>
	);
}

export default App;
