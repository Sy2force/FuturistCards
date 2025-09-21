# Contributing to FuturistCards

Thank you for your interest in contributing to FuturistCards! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account or local MongoDB
- Git
- Code editor (VS Code recommended)

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/futuristcards.git`
3. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. Set up environment variables (see README.md)
5. Start development servers

## 📋 Development Guidelines

### Code Style
- Use ESLint and Prettier configurations
- Follow React best practices
- Use TypeScript where applicable
- Write meaningful commit messages

### Naming Conventions
- Components: PascalCase (`UserCard.jsx`)
- Files: camelCase (`userService.js`)
- Variables: camelCase (`userName`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── context/       # React contexts
├── hooks/         # Custom hooks
├── api/           # API services
└── utils/         # Utility functions
```

## 🔧 Development Process

### Branch Naming
- Feature: `feature/user-authentication`
- Bug fix: `fix/login-validation`
- Hotfix: `hotfix/security-patch`

### Commit Messages
Follow conventional commits:
- `feat: add user registration`
- `fix: resolve login validation issue`
- `docs: update API documentation`
- `style: format code with prettier`
- `refactor: optimize card rendering`
- `test: add unit tests for auth`

### Pull Request Process
1. Create feature branch from `main`
2. Make changes with tests
3. Update documentation if needed
4. Submit PR with clear description
5. Address review feedback
6. Merge after approval

## 🧪 Testing

### Running Tests
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# E2E tests
npm run test:e2e
```

### Test Coverage
- Maintain >80% code coverage
- Write unit tests for utilities
- Add integration tests for API endpoints
- Include E2E tests for critical flows

## 📝 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex logic
- Update README for new features
- Include examples in documentation

### API Documentation
- Document all endpoints
- Include request/response examples
- Specify authentication requirements
- Note any breaking changes

## 🐛 Bug Reports

### Before Submitting
- Check existing issues
- Verify bug in latest version
- Test in different browsers/environments

### Bug Report Template
```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce the behavior

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution**
Clear description of desired solution

**Describe alternatives**
Alternative solutions considered

**Additional context**
Any other context or screenshots
```

## 🔒 Security

### Reporting Security Issues
- Email: security@futuristcards.com
- Do not create public issues for security vulnerabilities
- Include detailed reproduction steps
- Allow time for fix before disclosure

### Security Guidelines
- Never commit secrets or API keys
- Use environment variables for configuration
- Validate all user inputs
- Follow OWASP security practices

## 📦 Release Process

### Versioning
We use Semantic Versioning (SemVer):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)

### Release Checklist
- [ ] Update version numbers
- [ ] Update CHANGELOG.md
- [ ] Run full test suite
- [ ] Update documentation
- [ ] Create release notes
- [ ] Tag release in Git

## 🤝 Community

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on what's best for the community

### Getting Help
- GitHub Discussions for questions
- Issues for bugs and features
- Discord for real-time chat
- Email for private matters

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FuturistCards! 🚀
