// Simple analytics utility for tracking user interactions
class Analytics {
  constructor() {
    this.events = [];
    this.isEnabled = import.meta.env.PROD;
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  track(event, properties = {}) {
    if (!this.isEnabled) return;

    const eventData = {
      event,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer
      }
    };

    this.events.push(eventData);
    
    // In a real implementation, you would send this to your analytics service
    // For now, we'll just store it locally
    this.sendToAnalytics(eventData);
  }

  sendToAnalytics(eventData) {
    // Store in localStorage for demo purposes
    const stored = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    stored.push(eventData);
    
    // Keep only last 100 events
    if (stored.length > 100) {
      stored.splice(0, stored.length - 100);
    }
    
    localStorage.setItem('analytics_events', JSON.stringify(stored));
  }

  // Track page views
  pageView(pageName) {
    this.track('page_view', {
      page: pageName,
      title: document.title
    });
  }

  // Track user interactions
  interaction(element, action) {
    this.track('user_interaction', {
      element,
      action
    });
  }

  // Track errors
  error(errorMessage, errorStack) {
    this.track('error', {
      message: errorMessage,
      stack: errorStack,
      url: window.location.href
    });
  }

  // Track performance metrics
  performance(metric, value) {
    this.track('performance', {
      metric,
      value,
      sessionDuration: Date.now() - this.startTime
    });
  }

  // Get stored events for analysis
  getEvents() {
    return JSON.parse(localStorage.getItem('analytics_events') || '[]');
  }

  // Clear stored events
  clearEvents() {
    localStorage.removeItem('analytics_events');
  }
}

// Create singleton instance
const analytics = new Analytics();

// Track unhandled errors
window.addEventListener('error', (event) => {
  analytics.error(event.message, event.error?.stack);
});

// Track unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  analytics.error(`Unhandled Promise Rejection: ${event.reason}`, '');
});

export default analytics;
