#!/usr/bin/env node

/**
 * Security Audit Script for FuturistCards
 * Checks for security vulnerabilities, best practices, and compliance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SecurityAuditor {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.frontendPath = path.join(this.projectRoot, 'frontend');
    this.backendPath = path.join(this.projectRoot, 'backend');
    this.results = {
      vulnerabilities: [],
      bestPractices: [],
      compliance: [],
      score: 0
    };
  }

  async runAudit() {

    try {
      await this.checkDependencyVulnerabilities();
      await this.auditAuthentication();
      await this.checkDataProtection();
      await this.validateInputSanitization();
      await this.checkSecurityHeaders();
      await this.auditPermissions();
      await this.generateSecurityReport();
    } catch (error) {
      process.exit(1);
    }
  }

  async checkDependencyVulnerabilities() {
    
    try {
      // Check frontend dependencies
      const frontendAudit = execSync('npm audit --json', { 
        cwd: this.frontendPath, 
        encoding: 'utf8' 
      });
      const frontendResults = JSON.parse(frontendAudit);
      
      // Check backend dependencies
      const backendAudit = execSync('npm audit --json', { 
        cwd: this.backendPath, 
        encoding: 'utf8' 
      });
      const backendResults = JSON.parse(backendAudit);
      
      this.processDependencyResults(frontendResults, 'frontend');
      this.processDependencyResults(backendResults, 'backend');
      
    } catch (error) {
      // npm audit returns non-zero exit code when vulnerabilities found
      if (error.stdout) {
        const results = JSON.parse(error.stdout);
        this.processDependencyResults(results, error.cwd.includes('frontend') ? 'frontend' : 'backend');
      }
    }

  }

  processDependencyResults(auditResults, location) {
    if (auditResults.vulnerabilities) {
      Object.entries(auditResults.vulnerabilities).forEach(([pkg, vuln]) => {
        if (vuln.severity === 'high' || vuln.severity === 'critical') {
          this.results.vulnerabilities.push({
            type: 'dependency',
            severity: vuln.severity,
            package: pkg,
            location,
            description: vuln.title || 'Vulnerability found',
            recommendation: 'Update to latest secure version'
          });
        }
      });
    }
  }

  async auditAuthentication() {
    
    const authFiles = [
      path.join(this.backendPath, 'controllers', 'authController.js'),
      path.join(this.backendPath, 'middleware', 'authMiddleware.js'),
      path.join(this.frontendPath, 'src', 'contexts', 'AuthContext.jsx')
    ];

    authFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        this.checkAuthenticationSecurity(content, file);
      }
    });

  }

  checkAuthenticationSecurity(content, filePath) {
    const checks = [
      {
        pattern: /password.*===.*req\.body/i,
        issue: 'Plain text password comparison',
        severity: 'high',
        recommendation: 'Use bcrypt.compare() for password verification'
      },
      {
        pattern: /jwt\.sign\([^,]*,\s*['"`][^'"`]{1,10}['"`]/,
        issue: 'Weak JWT secret',
        severity: 'high',
        recommendation: 'Use strong, environment-based JWT secret'
      },
      {
        pattern: /localStorage\.setItem.*token/i,
        issue: 'Token stored in localStorage',
        severity: 'medium',
        recommendation: 'Consider using httpOnly cookies for token storage'
      },
      {
        pattern: /console\.log.*password/i,
        issue: 'Password logging detected',
        severity: 'high',
        recommendation: 'Remove password logging statements'
      }
    ];

    checks.forEach(check => {
      if (check.pattern.test(content)) {
        this.results.vulnerabilities.push({
          type: 'authentication',
          severity: check.severity,
          file: path.basename(filePath),
          issue: check.issue,
          recommendation: check.recommendation
        });
      }
    });
  }

  async checkDataProtection() {
    
    const serverFile = path.join(this.backendPath, 'server.js');
    if (fs.existsSync(serverFile)) {
      const content = fs.readFileSync(serverFile, 'utf8');
      
      const protectionChecks = [
        {
          pattern: /helmet\(/,
          present: true,
          issue: 'Security headers middleware found',
          type: 'good'
        },
        {
          pattern: /cors\(/,
          present: true,
          issue: 'CORS configuration found',
          type: 'good'
        },
        {
          pattern: /rateLimit/,
          present: true,
          issue: 'Rate limiting found',
          type: 'good'
        },
        {
          pattern: /express\.json\(\s*\)/,
          present: false,
          issue: 'No body size limit set',
          severity: 'medium',
          recommendation: 'Set body size limits to prevent DoS attacks'
        }
      ];

      protectionChecks.forEach(check => {
        const found = check.pattern.test(content);
        if (check.present && !found) {
          this.results.vulnerabilities.push({
            type: 'data_protection',
            severity: check.severity || 'medium',
            issue: `Missing: ${check.issue}`,
            recommendation: check.recommendation || 'Implement security middleware'
          });
        } else if (!check.present && found) {
          this.results.vulnerabilities.push({
            type: 'data_protection',
            severity: check.severity,
            issue: check.issue,
            recommendation: check.recommendation
          });
        }
      });
    }

  }

  async validateInputSanitization() {
    
    const controllerFiles = fs.readdirSync(path.join(this.backendPath, 'controllers'))
      .filter(file => file.endsWith('.js'))
      .map(file => path.join(this.backendPath, 'controllers', file));

    controllerFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      this.checkInputValidation(content, file);
    });

  }

  checkInputValidation(content, filePath) {
    const validationChecks = [
      {
        pattern: /req\.body\.[a-zA-Z]+.*(?!.*validate|.*sanitize|.*joi|.*express-validator)/,
        issue: 'Direct use of req.body without validation',
        severity: 'medium',
        recommendation: 'Implement input validation using Joi or express-validator'
      },
      {
        pattern: /\$\{.*req\.(body|params|query)/,
        issue: 'Potential SQL injection via template literals',
        severity: 'high',
        recommendation: 'Use parameterized queries or ORM methods'
      },
      {
        pattern: /eval\(|new Function\(/,
        issue: 'Dynamic code execution detected',
        severity: 'critical',
        recommendation: 'Remove eval() and Function() calls'
      }
    ];

    validationChecks.forEach(check => {
      if (check.pattern.test(content)) {
        this.results.vulnerabilities.push({
          type: 'input_validation',
          severity: check.severity,
          file: path.basename(filePath),
          issue: check.issue,
          recommendation: check.recommendation
        });
      }
    });
  }

  async checkSecurityHeaders() {
    
    const serverFile = path.join(this.backendPath, 'server.js');
    if (fs.existsSync(serverFile)) {
      const content = fs.readFileSync(serverFile, 'utf8');
      
      const requiredHeaders = [
        'helmet',
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection',
        'Strict-Transport-Security'
      ];

      requiredHeaders.forEach(header => {
        if (!content.includes(header)) {
          this.results.bestPractices.push({
            type: 'security_headers',
            severity: 'medium',
            issue: `Missing security header: ${header}`,
            recommendation: 'Implement comprehensive security headers using helmet.js'
          });
        }
      });
    }

  }

  async auditPermissions() {
    
    const middlewareFile = path.join(this.backendPath, 'middleware', 'authMiddleware.js');
    if (fs.existsSync(middlewareFile)) {
      const content = fs.readFileSync(middlewareFile, 'utf8');
      
      if (!content.includes('role') && !content.includes('permission')) {
        this.results.bestPractices.push({
          type: 'access_control',
          severity: 'medium',
          issue: 'No role-based access control detected',
          recommendation: 'Implement RBAC for different user types'
        });
      }
    }

  }

  calculateSecurityScore() {
    let score = 100;
    
    // Deduct points for vulnerabilities
    this.results.vulnerabilities.forEach(vuln => {
      switch (vuln.severity) {
        case 'critical': score -= 25; break;
        case 'high': score -= 15; break;
        case 'medium': score -= 8; break;
        case 'low': score -= 3; break;
      }
    });

    // Deduct points for missing best practices
    this.results.bestPractices.forEach(practice => {
      switch (practice.severity) {
        case 'high': score -= 10; break;
        case 'medium': score -= 5; break;
        case 'low': score -= 2; break;
      }
    });

    return Math.max(0, Math.round(score));
  }

  async generateSecurityReport() {
    this.results.score = this.calculateSecurityScore();
    
    
    
    if (this.results.vulnerabilities.length > 0) {
      this.results.vulnerabilities.forEach((vuln, index) => {
        const icon = vuln.severity === 'critical' ? '🚨' : 
                    vuln.severity === 'high' ? '⚠️' : 
                    vuln.severity === 'medium' ? '⚡' : 'ℹ️';
      });
    }

    if (this.results.bestPractices.length > 0) {
      this.results.bestPractices.forEach(practice => {
      });
    }

    if (this.results.vulnerabilities.length === 0 && this.results.bestPractices.length === 0) {
    }

    // Save detailed report
    const reportPath = path.join(this.projectRoot, 'security-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    
    
    if (this.results.score < 80) {
      process.exit(1);
    }
  }
}

// Run audit if called directly
if (require.main === module) {
  const auditor = new SecurityAuditor();
}

module.exports = SecurityAuditor;
