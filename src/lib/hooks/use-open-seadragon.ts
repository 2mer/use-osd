
import { useCallback, useLayoutEffect, useRef } from 'react';
import { useViewerState } from './use-viewer-state';
import { useIsViewerReady } from './use-is-viewer-ready';
import OpenSeadragon, { TiledImage } from 'openseadragon';

// type AsyncAddTileSpecifier =
// 	| TileSourceSpecifier
// 	| ({ tileSource: TileSourceSpecifier; index: number } & Partial<
// 		TiledImageSpecifier
// 	>);

export function useOpenSeadragon(
	tileSources: OpenSeadragon.Options['tileSources'],
	osdOptions: OpenSeadragon.Options = {}
) {
	const osdRef = useRef<HTMLDivElement | null>(null);
	const [viewer, setViewer] = useViewerState();
	const [isReady, setIsReady] = useIsViewerReady(viewer);

	const asyncAddTile = useCallback(
		(options: any): Promise<void> => {
			if (!options.tileSource) {
				options = {
					tileSource: options,
					index: 0,
				};
			}

			return new Promise((success, err) => {
				if (!viewer) {
					return;
				}

				try {
					viewer.addTiledImage({
						...options,
						success: (item: TiledImage) => {
							success();
							if (options.success) {
								options.success(item);
							}
						},
					});
				} catch (e) {
					err(e);
				}
			});
		},
		[viewer]
	);

	const goHome = useCallback(() => {
		if (viewer) {
			viewer.viewport.goHome(true);
		}
	}, [viewer]);

	useLayoutEffect(() => {
		setViewer(
			OpenSeadragon({
				element: osdRef.current!,
				// Hide controls by default, since user must add path to UI to
				// render images.
				showSequenceControl: false,
				showNavigationControl: false,
				showZoomControl: false,
				showHomeControl: false,
				showFullPageControl: false,
				...osdOptions,
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setViewer]);

	// @todo if the OSD options change, how do you re-apply them?

	useLayoutEffect(() => {
		if (viewer) {
			const tileSourcesArray = Array.isArray(tileSources)
				? tileSources
				: [tileSources];
			Promise.all(
				tileSourcesArray.map(tileSource => asyncAddTile(tileSource))
			).then(goHome);
		}

		return () => {
			if (viewer) {
				setIsReady(false);
				viewer.close();
			}
		};
	}, [asyncAddTile, goHome, setIsReady, tileSources, viewer]);

	return [osdRef, { isReady, goHome, asyncAddTile, viewer }] as const;
}