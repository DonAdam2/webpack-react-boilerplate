import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
//error boundary
import ErrorBoundary from './js/generic/ErrorBoundary';
//components
import LoadingIcon from './js/components/UI/LoadingIcon';
const TestComponent = lazy(() => import('./js/components/TestComponent'));

const App = () => (
	<Suspense
		fallback={
			<div className="loader-wrapper">
				<LoadingIcon />
			</div>
		}
	>
		<ErrorBoundary>
			<TestComponent />
			<p style={{ textAlign: 'center' }}>Hello World</p>
		</ErrorBoundary>
	</Suspense>
);

export default hot(App);
