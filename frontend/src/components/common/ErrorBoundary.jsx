import { Component } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (import.meta.env.MODE === 'development') {
      // Error caught by ErrorBoundary - logged for debugging
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Oups, quelque chose s&apos;est mal passé !
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Une erreur inattendue s&apos;est produite. Veuillez rafraîchir la page ou réessayer plus tard.
            </p>
            
            {import.meta.env.MODE === 'development' && this.state.error && (
              <details className="text-left bg-gray-100 dark:bg-gray-700 p-3 rounded mb-4">
                <summary className="cursor-pointer font-medium">Détails de l&apos;erreur</summary>
                <pre className="text-xs mt-2 text-red-600 dark:text-red-400 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Rafraîchir la page
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
