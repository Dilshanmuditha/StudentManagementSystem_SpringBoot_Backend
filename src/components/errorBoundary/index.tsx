import React, { ErrorInfo, ReactNode } from 'react';
import Loader from '../pageLoader';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("Error - ", error);
    console.log("ErrorInfo - ", errorInfo);
    // You can also log the error to an error reporting service
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Loader />;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
