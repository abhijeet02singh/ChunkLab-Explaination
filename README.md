# ChunkLab - RAG Text Chunking Visualizer

<div align="center">
  <h3>Interactive tool to visualize, compare, and optimize text chunking strategies for RAG systems</h3>
</div>

ChunkLab is a modern web application designed for AI engineers and RAG practitioners to understand, compare, and optimize different text chunking strategies. It provides real-time visual feedback on how various splitting algorithms divide text into chunks.

## Features

- **6 Chunking Strategies**: Recursive Character, Character, Sentence, Token-based, Markdown/Structure, and Document Structure
- **Interactive Visualization**: Color-coded chunks with overlap highlighting
- **Real-time Analysis**: Instant feedback on chunk size, overlap, and statistics
- **Sample Presets**: Pre-loaded samples for different use cases (general RAG, markdown docs, legal documents)
- **Export Functionality**: Export chunks as JSON for use in your RAG pipeline
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS v4
- **Icons**: Lucide React
- **Animations**: Motion
- **Testing**: Vitest + React Testing Library + Playwright
- **Code Quality**: ESLint + Prettier + Husky

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chunklab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (optional):
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:3000`

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

## Usage

1. **Enter Text**: Type or paste your text into the textarea, or use one of the sample presets
2. **Choose Strategy**: Select a chunking strategy from the available options
3. **Adjust Parameters**: Use the sliders to set chunk size and overlap
4. **Visualize Results**: See how your text is divided into chunks with color-coded visualization
5. **Export Data**: Click "Export JSON" to copy chunk data for use in your RAG pipeline

## Chunking Strategies

### Recursive Character Splitter
The industry default for RAG. Preserves paragraphs and newlines first before subdividing into sentences or characters.

### Character Splitter
Divides text strictly by character count, regardless of word or sentence boundaries.

### Sentence Splitter
Keeps complete grammatical sentences intact by splitting on punctuation (., ?, !).

### Token-based
Splits along natural token/word units, preventing mid-word cuts and matching how LLMs process embeddings.

### Markdown/Structure-based
Understands headers (#), code blocks (```), blockquotes, and lists to preserve syntax hierarchy.

### Document Structure
Respects high-level document sections, articles, numbered clauses, tables, and chapters for structured documents.

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed development guidelines.

### Code Quality

The project maintains high code quality standards:
- TypeScript strict mode enabled
- ESLint with React and TypeScript rules
- Prettier for consistent code formatting
- Husky pre-commit hooks for automated checks
- Comprehensive test coverage (unit + E2E)

### Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

## Production Deployment

### Build

```bash
npm run build
```

The optimized production build will be in the `dist` directory.

### Environment Variables

- `GEMINI_API_KEY` - Optional: Gemini API key for AI features
- `APP_URL` - Optional: The URL where the app is hosted
- `NODE_ENV` - Environment (development/production/test)

## License

[Specify your license here]

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Support

For issues, questions, or suggestions, please open an issue on the repository.
