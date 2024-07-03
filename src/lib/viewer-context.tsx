import { Viewer } from 'openseadragon';
import React, { PropsWithChildren, useMemo, useState } from 'react';

export type ViewerContextValue = {
	viewer: Viewer;
	setViewer: (viewer: Viewer) => void;
	isReady: boolean;
	setIsReady: (value: boolean) => void;
};

export const ViewerContext = React.createContext<
	ViewerContextValue | undefined
>(undefined);

export const ViewerProvider = ({ children }: PropsWithChildren<{}>) => {
	const [viewer, setViewer] = useState<Viewer>();
	const [isReady, setIsReady] = useState(false);

	return (
		<ViewerContext.Provider
			value={useMemo(
				() => ({ viewer: viewer!, setViewer, isReady, setIsReady }),
				[isReady, viewer]
			)}
		>
			{children}
		</ViewerContext.Provider>
	);
};
