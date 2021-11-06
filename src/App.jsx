import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
//error boundary
import { ErrorBoundary } from 'react-error-boundary';
//error boundary fallback
import ErrorBoundaryFallback from './js/generic/ErrorBoundaryFallback';
//components
import LoadingIcon from './js/components/shared/LoadingIcon';
const TestComponent = lazy(() => import('./js/containers/TestComponent'));

const App = () => (
	<ErrorBoundary
		FallbackComponent={ErrorBoundaryFallback}
		onReset={() => {
			//Reset the state of your app so the error doesn't happen again
			console.log('Try again clicked');
		}}
	>
		<Suspense
			fallback={
				<div className="loader-wrapper">
					<LoadingIcon />
				</div>
			}
		>
			<TestComponent />
		</Suspense>
	</ErrorBoundary>
);

export default hot(App);
