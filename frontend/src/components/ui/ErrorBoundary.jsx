import React from 'react';
import { motion } from 'framer-motion';
import GlassContainer from '../common/GlassContainer';
import ButtonGlass from '../common/ButtonGlass';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(err, errorInfo) {
    this.setState({
      error: err,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', err, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full"
          >
            <GlassContainer className="text-center">
              <div className="text-6xl mb-6">💥</div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-white/70 mb-6">
                We encountered an unexpected error. Don't worry, our team has been notified.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-red-400 mb-2">
                    Error Details (Development)
                  </summary>
                  <div className="bg-red-900/20 border border-red-400/30 rounded p-3 text-xs text-red-300 overflow-auto max-h-40">
                    <div className="font-semibold mb-2">{this.state.error.toString()}</div>
                    <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                  </div>
                </details>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <ButtonGlass
                  variant="primary"
                  onClick={this.handleReload}
                  className="flex-1"
                >
                  🔄 Reload Page
                </ButtonGlass>
                <ButtonGlass
                  variant="ghost"
                  onClick={this.handleGoHome}
                  className="flex-1"
                >
                  🏠 Go Home
                </ButtonGlass>
              </div>
            </GlassContainer>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
