/*
 * Ask Lane retrieval.
 *
 * Deterministic keyword scoring over the curated knowledge chunks — no
 * embeddings, no external services, easy to review. Used server-side by
 * api/ask-lane.ts to pick which chunks accompany a question to the model.
 */

import {
  ASK_LANE_KNOWLEDGE,
  DEFAULT_CHUNK_IDS,
  type KnowledgeChunk,
  type KnowledgeLink,
} from '../data/askLaneKnowledge'

// Common words that carry no retrieval signal.
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'can', 'do',
  'does', 'for', 'from', 'get', 'has', 'have', 'how', 'i', 'if', 'in',
  'is', 'it', 'its', 'me', 'my', 'need', 'of', 'on', 'or', 'our', 'so',
  'that', 'the', 'their', 'them', 'they', 'this', 'to', 'us', 'was',
  'we', 'what', 'when', 'where', 'which', 'who', 'why', 'will', 'with',
  'would', 'you', 'your',
])

/** Lowercase, strip punctuation, drop stopwords and single letters. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9$]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
}

interface ScoredChunk {
  chunk: KnowledgeChunk
  score: number
}

// Scoring weights, in descending order of confidence:
// a whole keyword phrase appearing in the question is the strongest signal;
// shared keyword words are next; title and content word overlap break ties.
const PHRASE_HIT = 6
const KEYWORD_WORD_HIT = 3
const TITLE_WORD_HIT = 2
const CONTENT_WORD_HIT = 1

function scoreChunk(
  chunk: KnowledgeChunk,
  question: string,
  questionTokens: Set<string>,
): number {
  let score = 0

  for (const keyword of chunk.keywords) {
    const phrase = keyword.toLowerCase()
    if (phrase.includes(' ')) {
      if (question.includes(phrase)) {
        score += PHRASE_HIT
        continue
      }
      // Partial credit when the question uses the keyword's words separately.
      const words = tokenize(phrase)
      const hits = words.filter((w) => questionTokens.has(w)).length
      if (words.length > 0 && hits === words.length) {
        score += KEYWORD_WORD_HIT * 2
      } else {
        score += KEYWORD_WORD_HIT * Math.min(hits, 2)
      }
    } else if (questionTokens.has(phrase)) {
      score += KEYWORD_WORD_HIT
    }
  }

  for (const word of new Set(tokenize(chunk.title))) {
    if (questionTokens.has(word)) score += TITLE_WORD_HIT
  }

  // Content overlap is capped so long chunks can't dominate on volume.
  let contentHits = 0
  const contentTokens = new Set(tokenize(chunk.content))
  for (const token of questionTokens) {
    if (contentTokens.has(token)) contentHits += 1
  }
  score += CONTENT_WORD_HIT * Math.min(contentHits, 5)

  return score
}

/**
 * Return the most relevant knowledge chunks for a question (top `limit`,
 * default 5). Deterministic: ties resolve in knowledge-file order. Falls
 * back to the default intro chunks when nothing matches.
 */
export function retrieveKnowledge(question: string, limit = 5): KnowledgeChunk[] {
  const normalized = question.toLowerCase()
  const questionTokens = new Set(tokenize(question))

  const scored: ScoredChunk[] = ASK_LANE_KNOWLEDGE.map((chunk) => ({
    chunk,
    score: scoreChunk(chunk, normalized, questionTokens),
  }))

  const matched = scored
    .filter((s) => s.score >= KEYWORD_WORD_HIT) // ignore trivial 1–2 point noise
    .sort((a, b) => b.score - a.score) // Array.prototype.sort is stable
    .slice(0, limit)
    .map((s) => s.chunk)

  if (matched.length > 0) return matched

  return ASK_LANE_KNOWLEDGE.filter((c) => DEFAULT_CHUNK_IDS.includes(c.id))
}

/**
 * Collect the related links for a set of chunks, deduplicated by path and
 * capped, preserving chunk relevance order.
 */
export function collectLinks(chunks: KnowledgeChunk[], max = 4): KnowledgeLink[] {
  const seen = new Set<string>()
  const links: KnowledgeLink[] = []
  for (const chunk of chunks) {
    for (const link of chunk.relatedLinks) {
      if (seen.has(link.to)) continue
      seen.add(link.to)
      links.push(link)
      if (links.length >= max) return links
    }
  }
  return links
}
