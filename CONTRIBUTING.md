# Contributing to ChunkLab

Thank you for your interest in contributing to ChunkLab! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chunklab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking
- `npm run lint:eslint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with Playwright UI

## Code Quality Standards

### TypeScript
- All code must pass TypeScript type checking (`npm run lint`)
- Use meaningful type annotations where inference isn't clear
- Avoid using `any` type - use specific types or `unknown` instead

### ESLint & Prettier
- All code must pass ESLint checks (`npm run lint:eslint`)
- Code is automatically formatted on pre-commit hooks
- Run `npm run lint:fix` to automatically fix linting issues
- Run `npm run format` to format code with Prettier

### Testing
- Write unit tests for utility functions and complex logic
- Write component tests for UI components
- Maintain test coverage above 80%
- Run tests before committing: `npm run test`

## Project Structure

```
chunklab/
├── src/
│   ├── components/       # React components
│   ├── data/            # Sample data and presets
│   ├── test/            # Test files
│   ├── types.ts         # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── e2e/                 # E2E tests
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## Commit Guidelines

### Commit Message Format
Follow conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(controls): add new chunking strategy`
- `fix(chunking): resolve overlap calculation bug`
- `docs(readme): update installation instructions`

### Pre-commit Hooks
The project uses Husky with lint-staged to run:
- ESLint on TypeScript files
- Prettier on TypeScript, CSS, and Markdown files
- Tests on changed files

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint && npm run test`)
5. Commit your changes with conventional commit messages
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### PR Requirements
- All tests must pass
- Code must be properly formatted
- TypeScript must have no errors
- Update documentation if needed
- Include description of changes in PR

## Development Workflow

1. **Create a new branch** for your feature or bugfix
2. **Make changes** following the code quality standards
3. **Test your changes** thoroughly
4. **Run linting and formatting** before committing
5. **Write tests** for new functionality
6. **Update documentation** if needed
7. **Submit a PR** with clear description

## Questions or Issues?

Feel free to open an issue for questions, bug reports, or feature requests.
