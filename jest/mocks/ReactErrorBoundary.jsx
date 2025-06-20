const React = require('react');

// Mock ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.FallbackComponent) {
        return React.createElement(this.props.FallbackComponent, {
          error: this.state.error,
          resetErrorBoundary: this.resetErrorBoundary,
        });
      }
      if (this.props.fallback) {
        return this.props.fallback;
      }
      if (this.props.fallbackRender) {
        return this.props.fallbackRender({
          error: this.state.error,
          resetErrorBoundary: this.resetErrorBoundary,
        });
      }
    }

    return this.props.children;
  }
}

// Mock useErrorBoundary hook
const useErrorBoundary = () => ({
  showBoundary: (error) => {
    throw error;
  },
  resetBoundary: () => {},
});

// Mock withErrorBoundary HOC
const withErrorBoundary = (Component, errorBoundaryProps) => {
  const WrappedComponent = (props) =>
    React.createElement(ErrorBoundary, errorBoundaryProps, React.createElement(Component, props));

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
};

module.exports = {
  ErrorBoundary,
  useErrorBoundary,
  withErrorBoundary,
};
