import { Component } from 'react';
import { withTranslation } from 'react-i18next';

class ErrorBoundaryClass extends Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log to monitoring service in production
    if (import.meta.env.PROD) {
      // Production error logging would be configured here
      // In production, this would send to monitoring service like Sentry
    }
  }

  render() {
    const { t } = this.props;
    
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-white mb-4">
                {t('common.errorOccurred')}
              </h1>
              <p className="text-gray-300 mb-6">
                {t('common.errorMessage')}
              </p>
              
              {!import.meta.env.PROD && this.state.error && (
                <details className="text-left bg-black/30 rounded-lg p-4 mb-4">
                  <summary className="cursor-pointer text-red-400 font-semibold mb-2">
                    {t('common.errorDetails')}
                  </summary>
                  <pre className="text-xs text-red-300 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
              
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                {t('common.refreshPage')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary = withTranslation()(ErrorBoundaryClass);

export default ErrorBoundary;
