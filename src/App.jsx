import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
//components
import LoadingIndicator from './js/components/UI/LoadingIndicator';
const TestComponent = lazy(() => import('./js/components/TestComponent'));

const App = () => (
	<Suspense
		fallback={
			<div className="loader-wrapper">
				<LoadingIndicator />
			</div>
		}
	>
		<TestComponent />
	</Suspense>
);

export default hot(App);
