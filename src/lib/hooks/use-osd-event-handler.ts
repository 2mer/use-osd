import { useLayoutEffect } from 'react';

export function useOsdEventHandler(
	source: any,
	eventName: any,
	callback: any,
	active: boolean = true
) {
	useLayoutEffect(() => {
		if (source && active) {
			source.addHandler(eventName, callback);
			return () => source.removeHandler(eventName, callback);
		}
		return;
	}, [active, callback, eventName, source]);
}