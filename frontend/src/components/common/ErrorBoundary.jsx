import { Component } from 'react';

// Composant ErrorBoundary pour capturer les erreurs React
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Met à jour le state pour afficher l'UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log l'erreur pour le débogage
    // Log error silently for production
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Composant de fallback sans dépendance au thème pour éviter les erreurs circulaires
const ErrorFallback = ({ error }) => {

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center p-8 rounded-2xl backdrop-blur-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="font-orbitron text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Oops! Une erreur s'est produite
        </h1>
        <p className="font-inter text-base mb-6 opacity-80 text-gray-700 dark:text-gray-300">
          L'application a rencontré un problème inattendu. Veuillez rafraîchir la page ou contacter le support.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700"
          >
            Rafraîchir la page
          </button>
          <button
            onClick={() => window.history.back()}
            className="w-full px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Retour
          </button>
        </div>
        {import.meta.env.DEV && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm opacity-60 hover:opacity-100">
              Détails de l'erreur (dev)
            </summary>
            <pre className="mt-2 text-xs opacity-60 overflow-auto max-h-32 p-2 rounded bg-gray-100 dark:bg-gray-800">
              {error.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default ErrorBoundary;
