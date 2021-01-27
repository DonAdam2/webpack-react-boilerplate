import React, { Component } from 'react';

class ErrorBoundary extends Component {
	state = { hasError: false };

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		//logErrorToMyService(error, errorInfo);
	}

	render() {
		const { hasError } = this.state,
			{ children } = this.props;

		if (hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}

		return children;
	}
}

export default ErrorBoundary;
