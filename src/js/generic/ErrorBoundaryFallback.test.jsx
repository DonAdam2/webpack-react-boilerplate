import { render, fireEvent, screen } from '@testing-library/react';
import ErrorBoundaryFallback from './ErrorBoundaryFallback';

describe('ErrorBoundaryFallback', () => {
  it('displays error message and a reset button', () => {
    const errorMessage = 'An error has occurred';
    const resetErrorBoundary = jest.fn();

    render(
      <ErrorBoundaryFallback
        error={new Error(errorMessage)}
        resetErrorBoundary={resetErrorBoundary}
      />
    );

    expect(screen.getByText(/Something went wrong:/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Try Again/i));

    expect(resetErrorBoundary).toHaveBeenCalled();
  });
});
