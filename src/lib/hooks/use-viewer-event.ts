import { EventHandler, ViewerEventMap } from 'openseadragon';
import { useOsdEventHandler } from './use-osd-event-handler';
import { useViewerContext } from './use-viewer-context';

export function useViewerEvent<
	Name extends keyof ViewerEventMap,
	Callback extends EventHandler<ViewerEventMap[Name]>
>(eventName: Name, callback: Callback, active: boolean = true) {
	const { viewer, isReady } = useViewerContext();

	useOsdEventHandler(viewer, eventName, callback, active && isReady);
}