#!/usr/bin/env node

/**
 * Performance Audit Script for FuturistCards
 * Analyzes bundle size, component performance, and optimization opportunities
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PerformanceAuditor {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.frontendPath = path.join(this.projectRoot, 'frontend');
    this.results = {
      bundleAnalysis: {},
      componentAnalysis: {},
      optimizations: [],
      score: 0
    };
  }

  async runAudit() {

    try {
      await this.analyzeBundleSize();
      await this.analyzeComponents();
      await this.checkOptimizations();
      await this.generateReport();
    } catch (error) {
      process.exit(1);
    }
  }

  async analyzeBundleSize() {
    
    const distPath = path.join(this.frontendPath, 'dist');
    if (!fs.existsSync(distPath)) {
      execSync('npm run build', { cwd: this.frontendPath, stdio: 'inherit' });
    }

    const assets = this.getAssetSizes(distPath);
    this.results.bundleAnalysis = {
      totalSize: assets.reduce((sum, asset) => sum + asset.size, 0),
      assets: assets.sort((a, b) => b.size - a.size),
      recommendations: this.getBundleRecommendations(assets)
    };

  }

  getAssetSizes(distPath) {
    const assets = [];
    
    const scanDirectory = (dir, basePath = '') => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(basePath, item);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          scanDirectory(fullPath, relativePath);
        } else {
          assets.push({
            name: relativePath,
            size: stats.size,
            type: path.extname(item).slice(1) || 'other'
          });
        }
      });
    };

    scanDirectory(distPath);
    return assets;
  }

  getBundleRecommendations(assets) {
    const recommendations = [];
    const jsAssets = assets.filter(a => a.type === 'js');
    const cssAssets = assets.filter(a => a.type === 'css');
    
    // Check for large JS bundles
    jsAssets.forEach(asset => {
      if (asset.size > 500 * 1024) { // 500KB
        recommendations.push({
          type: 'warning',
          message: `Large JS bundle: ${asset.name} (${this.formatBytes(asset.size)}). Consider code splitting.`
        });
      }
    });

    // Check for large CSS files
    cssAssets.forEach(asset => {
      if (asset.size > 100 * 1024) { // 100KB
        recommendations.push({
          type: 'info',
          message: `Large CSS file: ${asset.name} (${this.formatBytes(asset.size)}). Consider CSS purging.`
        });
      }
    });

    return recommendations;
  }

  async analyzeComponents() {
    
    const componentsPath = path.join(this.frontendPath, 'src', 'components');
    const components = this.scanComponents(componentsPath);
    
    this.results.componentAnalysis = {
      totalComponents: components.length,
      largeComponents: components.filter(c => c.lines > 200),
      complexComponents: components.filter(c => c.complexity > 10),
      recommendations: this.getComponentRecommendations(components)
    };

  }

  scanComponents(dir, components = []) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        this.scanComponents(fullPath, components);
      } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const analysis = this.analyzeComponentFile(content, fullPath);
        components.push(analysis);
      }
    });

    return components;
  }

  analyzeComponentFile(content, filePath) {
    const lines = content.split('\n').length;
    const complexity = this.calculateComplexity(content);
    const hasUseMemo = content.includes('useMemo');
    const hasUseCallback = content.includes('useCallback');
    const hasMemo = content.includes('memo(') || content.includes('React.memo');
    
    return {
      name: path.basename(filePath),
      path: filePath,
      lines,
      complexity,
      optimizations: {
        hasUseMemo,
        hasUseCallback,
        hasMemo
      }
    };
  }

  calculateComplexity(content) {
    let complexity = 1; // Base complexity
    
    // Count decision points
    const patterns = [
      /if\s*\(/g,
      /else\s+if\s*\(/g,
      /while\s*\(/g,
      /for\s*\(/g,
      /switch\s*\(/g,
      /case\s+/g,
      /catch\s*\(/g,
      /&&/g,
      /\|\|/g,
      /\?/g
    ];

    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        complexity += matches.length;
      }
    });

    return complexity;
  }

  getComponentRecommendations(components) {
    const recommendations = [];
    
    components.forEach(component => {
      if (component.lines > 200) {
        recommendations.push({
          type: 'warning',
          component: component.name,
          message: `Large component (${component.lines} lines). Consider breaking into smaller components.`
        });
      }
      
      if (component.complexity > 15) {
        recommendations.push({
          type: 'warning',
          component: component.name,
          message: `High complexity (${component.complexity}). Consider refactoring.`
        });
      }
      
      if (component.lines > 100 && !component.optimizations.hasMemo) {
        recommendations.push({
          type: 'info',
          component: component.name,
          message: 'Consider using React.memo for performance optimization.'
        });
      }
    });

    return recommendations;
  }

  async checkOptimizations() {
    
    const optimizations = [];
    
    // Check for lazy loading
    const hasLazyLoading = this.checkForPattern('React.lazy|lazy(');
    if (!hasLazyLoading) {
      optimizations.push({
        type: 'suggestion',
        title: 'Implement Lazy Loading',
        description: 'Use React.lazy() for route-based code splitting to reduce initial bundle size.'
      });
    }

    // Check for image optimization
    const hasImageOptimization = this.checkForPattern('LazyImage|loading="lazy"');
    if (!hasImageOptimization) {
      optimizations.push({
        type: 'suggestion',
        title: 'Optimize Images',
        description: 'Implement lazy loading for images and use modern formats (WebP, AVIF).'
      });
    }

    // Check for service worker
    const hasServiceWorker = fs.existsSync(path.join(this.frontendPath, 'public', 'sw.js'));
    if (!hasServiceWorker) {
      optimizations.push({
        type: 'suggestion',
        title: 'Add Service Worker',
        description: 'Implement service worker for caching and offline functionality.'
      });
    }

    this.results.optimizations = optimizations;
  }

  checkForPattern(pattern) {
    const srcPath = path.join(this.frontendPath, 'src');
    return this.searchInDirectory(srcPath, new RegExp(pattern.replace(/([()[\]{}*+?^$|\\])/g, '\\$1')));
  }

  searchInDirectory(dir, pattern) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        if (this.searchInDirectory(fullPath, pattern)) {
          return true;
        }
      } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (pattern.test(content)) {
          return true;
        }
      }
    }
    
    return false;
  }

  calculateScore() {
    let score = 100;
    
    // Deduct points for large bundles
    const totalSizeMB = this.results.bundleAnalysis.totalSize / (1024 * 1024);
    if (totalSizeMB > 2) score -= Math.min(20, (totalSizeMB - 2) * 5);
    
    // Deduct points for large components
    const largeComponents = this.results.componentAnalysis.largeComponents.length;
    score -= Math.min(15, largeComponents * 3);
    
    // Deduct points for complex components
    const complexComponents = this.results.componentAnalysis.complexComponents.length;
    score -= Math.min(15, complexComponents * 2);
    
    // Deduct points for missing optimizations
    score -= Math.min(20, this.results.optimizations.length * 5);
    
    return Math.max(0, Math.round(score));
  }

  async generateReport() {
    this.results.score = this.calculateScore();
    
    
    
    
    if (this.results.bundleAnalysis.recommendations.length > 0) {
      this.results.bundleAnalysis.recommendations.forEach(rec => {
      });
    }
    
    
    if (this.results.componentAnalysis.recommendations.length > 0) {
      this.results.componentAnalysis.recommendations.slice(0, 5).forEach(rec => {
      });
    }
    
    if (this.results.optimizations.length > 0) {
      this.results.optimizations.forEach(opt => {
      });
    }
    
    // Save detailed report
    const reportPath = path.join(this.projectRoot, 'performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Run audit if called directly
if (require.main === module) {
  const auditor = new PerformanceAuditor();
}

module.exports = PerformanceAuditor;
