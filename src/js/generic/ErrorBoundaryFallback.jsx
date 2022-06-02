const ErrorBoundaryFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <h3>Something went wrong:</h3>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

export default ErrorBoundaryFallback;
