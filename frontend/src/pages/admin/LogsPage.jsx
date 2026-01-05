import { useState, useEffect } from 'react';
import { useRoleTheme } from '../../context/ThemeProvider';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const LogsPage = () => {
  const { currentTheme } = useRoleTheme();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('today');

  useEffect(() => {
    // Simulate loading log data
    const timer = setTimeout(() => {
      setLogs([
        {
          id: '1',
          timestamp: new Date(Date.now() - 5 * 60000),
          level: 'info',
          action: 'USER_LOGIN',
          user: 'john.doe@example.com',
          details: 'User logged in successfully',
          ip: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 12 * 60000),
          level: 'success',
          action: 'CARD_CREATED',
          user: 'sarah.smith@example.com',
          details: 'New business card created: "Tech Innovator Card"',
          ip: '192.168.1.105',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 25 * 60000),
          level: 'warning',
          action: 'FAILED_LOGIN',
          user: 'unknown@example.com',
          details: 'Failed login attempt - invalid credentials',
          ip: '203.0.113.45',
          userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
        },
        {
          id: '4',
          timestamp: new Date(Date.now() - 35 * 60000),
          level: 'info',
          action: 'USER_REGISTERED',
          user: 'emily.davis@example.com',
          details: 'New user registration completed',
          ip: '192.168.1.120',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
        },
        {
          id: '5',
          timestamp: new Date(Date.now() - 45 * 60000),
          level: 'error',
          action: 'API_ERROR',
          user: 'system',
          details: 'Database connection timeout on cards fetch',
          ip: 'localhost',
          userAgent: 'Internal System'
        },
        {
          id: '6',
          timestamp: new Date(Date.now() - 55 * 60000),
          level: 'success',
          action: 'ROLE_UPDATED',
          user: 'admin@futuristcards.com',
          details: 'User role changed from user to business for john.doe@example.com',
          ip: '192.168.1.10',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        {
          id: '7',
          timestamp: new Date(Date.now() - 2 * 60 * 60000),
          level: 'info',
          action: 'CARD_LIKED',
          user: 'michael.j@example.com',
          details: 'Card liked: "Creative Designer Portfolio"',
          ip: '192.168.1.115',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'
        },
        {
          id: '8',
          timestamp: new Date(Date.now() - 3 * 60 * 60000),
          level: 'warning',
          action: 'RATE_LIMIT',
          user: '203.0.113.50',
          details: 'Rate limit exceeded for API calls',
          ip: '203.0.113.50',
          userAgent: 'Unknown Bot/1.0'
        }
      ]);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': {
        return '#EF4444';
      }
      case 'warning': {
        return '#F59E0B';
      }
      case 'success': {
        return '#10B981';
      }
      case 'info':
      default: {
        return '#3B82F6';
      }
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error': {
        return '❌';
      }
      case 'warning': {
        return '⚠️';
      }
      case 'success': {
        return '✅';
      }
      case 'info':
      default: {
        return 'ℹ️';
      }
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    const now = new Date();
    const logDate = new Date(log.timestamp);
    
    switch (dateRange) {
      case 'today': {
        matchesDate = logDate.toDateString() === now.toDateString();
        break;
      }
      case 'week': {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = logDate >= weekAgo;
        break;
      }
      case 'month': {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        matchesDate = logDate >= monthAgo;
        break;
      }
      default: {
        matchesDate = true;
      }
    }
    
    return matchesFilter && matchesSearch && matchesDate;
  });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-t-transparent rounded-full"
          style={{ borderColor: currentTheme.colors.primary }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>System Logs | FuturistCards</title>
        <meta name="description" content="Monitor system activity and logs in FuturistCards platform" />
      </Helmet>

      <div
        className="min-h-screen p-6"
        style={{ backgroundColor: currentTheme.colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ color: currentTheme.colors.text.primary }}
            >
              System Logs
            </h1>
            <p 
              className="text-lg"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Monitor system activity, user actions, and security events
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text.primary
                }}
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text.primary
                }}
              >
                <option value="all">All Levels</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text.primary
                }}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg border hover:shadow-md transition-all duration-200"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text.primary
                }}
              >
                Export Logs
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg text-white transition-all duration-200"
                style={{ backgroundColor: currentTheme.colors.primary }}
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Logs List */}
          <motion.div
            className="glass-card rounded-xl overflow-hidden"
            style={{
              backgroundColor: currentTheme.colors.surface,
              borderColor: currentTheme.colors.border
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-h-[70vh] overflow-y-auto">
              <AnimatePresence>
                {filteredLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 border-b last:border-b-0 hover:bg-opacity-50 transition-colors duration-200"
                    style={{ borderColor: currentTheme.colors.border }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                          style={{ backgroundColor: getLevelColor(log.level) + '20' }}
                        >
                          {getLevelIcon(log.level)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span 
                              className="font-medium text-sm px-2 py-1 rounded"
                              style={{ 
                                backgroundColor: getLevelColor(log.level) + '20',
                                color: getLevelColor(log.level)
                              }}
                            >
                              {log.action}
                            </span>
                            <span 
                              className="text-sm font-medium"
                              style={{ color: currentTheme.colors.text.primary }}
                            >
                              {log.user}
                            </span>
                          </div>
                          
                          <p 
                            className="text-sm mb-2"
                            style={{ color: currentTheme.colors.text.secondary }}
                          >
                            {log.details}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs">
                            <span style={{ color: currentTheme.colors.text.secondary }}>
                              IP: {log.ip}
                            </span>
                            <span 
                              className="truncate max-w-xs"
                              style={{ color: currentTheme.colors.text.secondary }}
                              title={log.userAgent}
                            >
                              {log.userAgent.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <div 
                          className="text-sm font-medium"
                          style={{ color: currentTheme.colors.text.primary }}
                        >
                          {log.timestamp.toLocaleTimeString()}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: currentTheme.colors.text.secondary }}
                        >
                          {getTimeAgo(log.timestamp)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredLogs.length === 0 && (
              <div className="p-8 text-center">
                <p style={{ color: currentTheme.colors.text.secondary }}>
                  No logs found matching your criteria.
                </p>
              </div>
            )}
          </motion.div>

          {/* Summary */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <span style={{ color: currentTheme.colors.text.secondary }}>
              Showing {filteredLogs.length} of {logs.length} log entries
            </span>
            
            <div className="flex gap-4">
              <span style={{ color: currentTheme.colors.text.secondary }}>
                <span style={{ color: getLevelColor('error') }}>●</span> {logs.filter(l => l.level === 'error').length} Errors
              </span>
              <span style={{ color: currentTheme.colors.text.secondary }}>
                <span style={{ color: getLevelColor('warning') }}>●</span> {logs.filter(l => l.level === 'warning').length} Warnings
              </span>
              <span style={{ color: currentTheme.colors.text.secondary }}>
                <span style={{ color: getLevelColor('success') }}>●</span> {logs.filter(l => l.level === 'success').length} Success
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogsPage;
