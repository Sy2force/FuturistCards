import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RealTimeChart = ({ data, title, color = 'blue', type: _type = 'line' }) => {
  const [chartData, setChartData] = useState([]);
  const maxDataPoints = 20;

  useEffect(() => {
    if (data !== undefined && data !== null) {
      const timestamp = new Date().toLocaleTimeString('he-IL', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      
      // Use functional update to avoid lint warning
      setChartData(prev => {
        const newData = [...prev, { value: data, time: timestamp }];
        return newData.slice(-maxDataPoints);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const maxValue = Math.max(...chartData.map(d => d.value), 1);
  const minValue = Math.min(...chartData.map(d => d.value), 0);
  const range = maxValue - minValue || 1;

  const getColorClasses = (color) => {
    const colors = {
      blue: 'stroke-blue-400 fill-blue-400/20',
      green: 'stroke-green-400 fill-green-400/20',
      purple: 'stroke-purple-400 fill-purple-400/20',
      orange: 'stroke-orange-400 fill-orange-400/20',
      red: 'stroke-red-400 fill-red-400/20'
    };
    return colors[color] || colors.blue;
  };

  const generatePath = () => {
    if (chartData.length < 2) return '';
    
    const width = 300;
    const height = 100;
    const padding = 10;
    
    const points = chartData.map((point, index) => {
      const x = padding + (index / (chartData.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const generateAreaPath = () => {
    if (chartData.length < 2) return '';
    
    const linePath = generatePath();
    const width = 300;
    const height = 100;
    const padding = 10;
    
    // Calculate last X position
    const lastX = padding + ((chartData.length - 1) / (chartData.length - 1)) * (width - 2 * padding);
    const bottomY = height - padding;
    const firstX = padding;
    
    return `${linePath} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full bg-${color}-400 animate-pulse`}></div>
          <span className="text-sm text-gray-400">Real time</span>
        </div>
      </div>
      
      <div className="relative">
        <svg width="300" height="100" className="w-full h-24">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="30" height="20" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Chart area */}
          {chartData.length >= 2 && (
            <>
              <path
                d={generateAreaPath()}
                className={getColorClasses(color)}
                strokeWidth="0"
              />
              <motion.path
                d={generatePath()}
                className={`${getColorClasses(color)} fill-none`}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            </>
          )}
          
          {/* Data points */}
          {chartData.map((point, index) => {
            const x = 10 + (index / (chartData.length - 1)) * 280;
            const y = 90 - ((point.value - minValue) / range) * 80;
            
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                className={`fill-${color}-400`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            );
          })}
        </svg>
        
        {/* Current value display */}
        <div className="absolute top-2 right-2 bg-black/50 rounded px-2 py-1">
          <span className={`text-${color}-400 font-bold text-lg`}>
            {chartData.length > 0 ? chartData[chartData.length - 1].value : 0}
          </span>
        </div>
      </div>
      
      {/* Time labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {chartData.length >= 2 && (
          <>
            <span>{chartData[0].time}</span>
            <span>{chartData[chartData.length - 1].time}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default RealTimeChart;
