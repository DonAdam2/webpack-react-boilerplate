import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
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
		<TestComponent />
	</Suspense>
);

export default hot(App);
