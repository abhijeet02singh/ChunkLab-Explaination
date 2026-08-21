export interface SamplePreset {
  id: string;
  name: string;
  desc: string;
  text: string;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'general',
    name: 'General RAG',
    desc: 'Standard prose & explanations',
    text: `The quick brown fox jumps over the lazy dog. Chunking is a process of splitting large text into smaller, meaningful pieces. This helps LLMs process information within context windows efficiently. Modern RAG systems rely heavily on finding the right chunking strategy to balance context and relevance. If chunks are too small, they lose meaning. If they are too large, they might introduce noise or exceed limits.`,
  },
  {
    id: 'markdown',
    name: 'Markdown Doc',
    desc: 'Headers, lists, and code blocks',
    text: `# Retrieval-Augmented Generation (RAG)

RAG connects external document repositories directly to language model context windows.

## Core Architecture
- **Document Store**: Ingests raw files and extracts text streams.
- **Embedding Pipeline**: Translates text chunks into high-dimensional vector coordinates.
- **Vector Index**: Performs approximate nearest neighbor (ANN) retrieval.

### Python Embedding Snippet
\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter
splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)
chunks = splitter.split_text(raw_doc)
\`\`\`

## Evaluation Metrics
1. Context Recall: Measures completeness of retrieved references.
2. Answer Faithfulness: Ensures grounding without hallucination.`,
  },
  {
    id: 'structured',
    name: 'Legal / Spec',
    desc: 'Sections, clauses & table structure',
    text: `SECTION 1.0 DEFINITIONS AND SCOPE
1.1 "Authorized User" refers to individual engineers possessing valid OAuth credentials.
1.2 "Data Retention" stipulates that vector embeddings shall be stored for a maximum period of ninety (90) days.

SECTION 2.0 SERVICE OBLIGATIONS
2.1 The Provider agrees to maintain 99.9% uptime SLA for semantic search vector query endpoints.
2.2 Maintenance windows will occur bi-weekly on Sundays at 03:00 UTC.

ARTICLE 3.0 DATA PROTECTION & COMPLIANCE
3.1 Confidential customer documents must undergo AES-256 encryption both in-transit and at rest.
3.2 Cross-region database replication is strictly restricted to approved sovereign zones.`,
  },
];
