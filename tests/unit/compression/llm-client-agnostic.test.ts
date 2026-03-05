import { describe, it, expect, vi } from 'vitest';
import { LlmSummarisationStrategy } from '../../../src/compression/llm-summarisation-strategy.js';
import { EpisodicLessonExtractor } from '../../../src/compression/episodic-lesson-extractor.js';
import type { ILlmClient } from '../../../src/compression/llm-client-interface.js';
import type { WorkingTurn, EpisodicTrace } from '../../../src/types/index.js';
import { generateId } from '../../../src/types/index.js';
import { buildSummarisationPrompt, buildLessonPrompt } from '../../../src/compression/prompts.js';

// ─── Mock LLM Implementations ───────────────────────────────────────────────

/** Mimics a Claude-like response: verbose, multi-paragraph */
function makeClaudeLikeMock(): ILlmClient {
  return {
    complete: vi.fn(async (prompt: string) => {
      // Returns a structured multi-paragraph summary
      return `Summary of conversation:\n\nThe user discussed project configuration. Key decisions were made about the architecture.\n\nAll tool outputs preserved.`;
    }),
  };
}

/** Mimics an OpenAI-like response: JSON-formatted text */
function makeOpenAILikeMock(): ILlmClient {
  return {
    complete: vi.fn(async (prompt: string) => {
      return JSON.stringify({
        summary: 'Project config discussion',
        key_points: ['architecture decisions', 'tool outputs'],
      });
    }),
  };
}

/** Mimics a local LLM response: short, terse */
function makeLocalLlmMock(): ILlmClient {
  return {
    complete: vi.fn(async (prompt: string) => {
      return 'Config discussed. Arch decided.';
    }),
  };
}

// ─── Test Data Factories ─────────────────────────────────────────────────────

function makeTurn(content: string, overrides: Partial<WorkingTurn> = {}): WorkingTurn {
  return {
    id: generateId(),
    type: 'working',
    projectId: 'test-project',
    status: 'success',
    createdAt: Date.now(),
    role: 'user',
    content,
    tokenCount: Math.ceil(content.length / 4),
    ...overrides,
  };
}

function makeTrace(overrides: Partial<EpisodicTrace> = {}): EpisodicTrace {
  return {
    id: generateId(),
    type: 'episodic',
    projectId: 'test-project',
    status: 'failure',
    createdAt: Date.now(),
    taskId: 'task-001',
    input: { cmd: 'npm build' },
    output: { exitCode: 1, stderr: 'Cannot find module' },
    ...overrides,
  };
}

// ─── LlmSummarisationStrategy: Cross-Provider Tests ─────────────────────────

describe('LlmSummarisationStrategy: Provider-agnostic behaviour', () => {
  const turns = [
    makeTurn('First: set up the project', { role: 'user' }),
    makeTurn('Done. Project initialised.', { role: 'assistant' }),
    makeTurn('Now configure the database', { role: 'user' }),
  ];

  const mocks: Array<[string, () => ILlmClient]> = [
    ['Claude-like', makeClaudeLikeMock],
    ['OpenAI-like', makeOpenAILikeMock],
    ['Local LLM', makeLocalLlmMock],
  ];

  for (const [name, factory] of mocks) {
    describe(`with ${name} mock`, () => {
      it('calls complete() with the prompt', async () => {
        const llm = factory();
        const strategy = new LlmSummarisationStrategy(llm);
        await strategy.compress(turns, 500);

        expect(llm.complete).toHaveBeenCalledOnce();
      });

      it('prompt contains all turn content', async () => {
        const llm = factory();
        const strategy = new LlmSummarisationStrategy(llm);
        await strategy.compress(turns, 500);

        const prompt = vi.mocked(llm.complete).mock.calls[0]![0];
        expect(prompt).toContain('set up the project');
        expect(prompt).toContain('Project initialised');
        expect(prompt).toContain('configure the database');
      });

      it('returns a CompressionResult with summary turn', async () => {
        const llm = factory();
        const strategy = new LlmSummarisationStrategy(llm);
        const result = await strategy.compress(turns, 500);

        expect(result.summary).toBeDefined();
        expect(result.summary.type).toBe('working');
        expect(result.summary.role).toBe('assistant');
        expect(result.summary.status).toBe('compressed');
        expect(result.droppedCount).toBe(turns.length);
      });

      it('summary content is whatever the LLM returned', async () => {
        const llm = factory();
        const strategy = new LlmSummarisationStrategy(llm);
        const result = await strategy.compress(turns, 500);

        const llmOutput = await llm.complete('');
        expect(result.summary.content).toBe(llmOutput);
      });

      it('summary has a valid tokenCount', async () => {
        const llm = factory();
        const strategy = new LlmSummarisationStrategy(llm);
        const result = await strategy.compress(turns, 500);

        expect(result.summary.tokenCount).toBeGreaterThan(0);
        expect(result.summary.tokenCount).toBe(
          Math.ceil(result.summary.content.length / 4),
        );
      });
    });
  }
});

// ─── EpisodicLessonExtractor: Cross-Provider Tests ──────────────────────────

describe('EpisodicLessonExtractor: Provider-agnostic behaviour', () => {
  const traces = [
    makeTrace({ input: { cmd: 'npm install' }, output: { stderr: 'ERESOLVE' } }),
    makeTrace({ input: { cmd: 'npm build' }, output: { stderr: 'Cannot find module' } }),
  ];

  const mocks: Array<[string, () => ILlmClient]> = [
    ['Claude-like', makeClaudeLikeMock],
    ['OpenAI-like', makeOpenAILikeMock],
    ['Local LLM', makeLocalLlmMock],
  ];

  for (const [name, factory] of mocks) {
    describe(`with ${name} mock`, () => {
      it('calls complete() with the trace data in the prompt', async () => {
        const llm = factory();
        const extractor = new EpisodicLessonExtractor(llm);
        await extractor.extract(traces);

        expect(llm.complete).toHaveBeenCalledOnce();
        const prompt = vi.mocked(llm.complete).mock.calls[0]![0];
        expect(prompt).toContain('ERESOLVE');
        expect(prompt).toContain('Cannot find module');
      });

      it('returns a SemanticChunk', async () => {
        const llm = factory();
        const extractor = new EpisodicLessonExtractor(llm);
        const result = await extractor.extract(traces);

        expect(result.type).toBe('semantic');
        expect(result.source).toBe('lesson-learned');
        expect(result.status).toBe('success');
        expect(result.projectId).toBe('test-project');
      });

      it('lesson content is whatever the LLM returned', async () => {
        const llm = factory();
        const extractor = new EpisodicLessonExtractor(llm);
        const result = await extractor.extract(traces);

        const llmOutput = await llm.complete('');
        expect(result.content).toBe(llmOutput);
      });
    });
  }
});

// ─── Prompt Builders: Provider-Agnostic Verification ─────────────────────────

describe('Prompt builders are provider-agnostic', () => {
  it('buildSummarisationPrompt returns plain text (no message arrays)', () => {
    const turns = [makeTurn('Hello'), makeTurn('World', { role: 'assistant' })];
    const prompt = buildSummarisationPrompt(turns);

    expect(typeof prompt).toBe('string');
    // Should not contain JSON array syntax for messages
    expect(prompt).not.toMatch(/^\[/);
    // Should contain the content
    expect(prompt).toContain('Hello');
    expect(prompt).toContain('World');
  });

  it('buildLessonPrompt returns plain text', () => {
    const traces = [makeTrace()];
    const prompt = buildLessonPrompt(traces);

    expect(typeof prompt).toBe('string');
    expect(prompt).not.toMatch(/^\[/);
    expect(prompt).toContain('task-001');
  });
});
