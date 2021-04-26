import React, { lazy, Suspense } from 'react';
//error boundary
import { ErrorBoundary } from 'react-error-boundary';
//error boundary fallback
import ErrorBoundaryFallback from './js/generic/ErrorBoundaryFallback';
//components
import LoadingIcon from './js/components/shared/loadingIcon/LoadingIcon';
const TestComponent = lazy(() => import('./js/containers/TestComponent'));

const App = () => (
	<Suspense
		fallback={
			<div className="loader-wrapper">
				<LoadingIcon />
			</div>
		}
	>
		<ErrorBoundary
			FallbackComponent={ErrorBoundaryFallback}
			onReset={() => {
				//Reset the state of your app so the error doesn't happen again
				console.log('Try again clicked');
			}}
		>
			<TestComponent />
		</ErrorBoundary>
	</Suspense>
);

export default App;
