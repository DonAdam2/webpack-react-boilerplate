import { lazy, Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from '@/components/errorBoundaryFallback/ErrorBoundaryFallback';
import LoadingIcon from '@/components/shared/LoadingIcon';
const TestComponent = lazy(() => import('./components/testComponent/TestComponent'));

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
      <h1 style={{ textAlign: 'center' }}>Webpack react boilerplate</h1>
      <TestComponent />
    </Suspense>
  </ErrorBoundary>
);

export default App;
