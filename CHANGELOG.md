# Changelog

## [0.2.0](https://github.com/djm204/franken-brain/compare/franken-brain-v0.1.0...franken-brain-v0.2.0) (2026-03-06)


### Features

* **compression:** implement TruncationStrategy, LlmSummarisationStrategy, EpisodicLessonExtractor ([883334b](https://github.com/djm204/franken-brain/commit/883334bbf9bfee2bbd917ebd9ffcd27744f26b5d))
* **compression:** Phase 5 — Compression strategies ([bb8c32b](https://github.com/djm204/franken-brain/commit/bb8c32b98bbf1b03bd3c460f9d6a6c4797cc1f06))
* **episodic:** implement EpisodicMemoryStore with SQLite persistence ([a298ae8](https://github.com/djm204/franken-brain/commit/a298ae8c64a44061b945515ccfea09256a06e5ce))
* **episodic:** Phase 3 — EpisodicMemoryStore ([b352463](https://github.com/djm204/franken-brain/commit/b352463f676080144edca9012607508456c1ed25))
* **orchestrator:** implement MemoryOrchestrator composing all three tiers ([f9ab3d8](https://github.com/djm204/franken-brain/commit/f9ab3d825ab5912311a37f30e53efe35c02931df))
* **orchestrator:** Phase 6 — MemoryOrchestrator ([f1f4c62](https://github.com/djm204/franken-brain/commit/f1f4c62a53bca632d816db3934564c17e4aa7958))
* **pii:** implement PiiGuard, PiiDetectedError, and decorator stores ([b4c678a](https://github.com/djm204/franken-brain/commit/b4c678acde0689f0a4e9ca6ae39f7a043c274c9d))
* **pii:** Phase 7 — PII guard decorators (MOD-01 integration hook) ([c38a765](https://github.com/djm204/franken-brain/commit/c38a765cbaa304c472f7b2480c8844bce2caf091))
* **semantic:** implement SemanticMemoryStore with injected IChromaClient and IEmbeddingProvider ([0786211](https://github.com/djm204/franken-brain/commit/078621135cc419bfc1c569fd35162fed32c5b8f6))
* **semantic:** Phase 4 — SemanticMemoryStore ([ecd25a9](https://github.com/djm204/franken-brain/commit/ecd25a90d14a3af548c8dd7d59c3db653cecfaba))
* **types:** add generateId() using ulid ([9393902](https://github.com/djm204/franken-brain/commit/9393902976bb4df47d83ce3ce37468cbc6c6fe11))
* **types:** define WorkingTurn, EpisodicTrace, SemanticChunk union with Zod ([16fa1b8](https://github.com/djm204/franken-brain/commit/16fa1b8461bf91bb42169257fb0fcd2692c95d42))
* **types:** implement TokenBudget with remaining, isExhausted, isPressured ([a42caca](https://github.com/djm204/franken-brain/commit/a42caca06d596887a132975fb377bb41743eaa63))
* **types:** Phase 1 — types and interfaces ([79961c3](https://github.com/djm204/franken-brain/commit/79961c3b31d3f311830d5f3cfeafd10dd6ee040f))
* **working:** implement WorkingMemoryStore with ICompressionStrategy injection ([1d075e4](https://github.com/djm204/franken-brain/commit/1d075e4c9883deac87d793d61aa19d44ca14b04a))
* **working:** Phase 2 — WorkingMemoryStore ([abd3711](https://github.com/djm204/franken-brain/commit/abd371129b5b64e2751982b7eed89bcc77408d70))


### Miscellaneous

* **scaffold:** init package.json, tsconfig, vitest, and gitignore ([3d5ab74](https://github.com/djm204/franken-brain/commit/3d5ab7460fd641361f9111853472cc257ea97aec))


### Documentation

* add ADRs, implementation plan, and project CLAUDE.md ([886f9bc](https://github.com/djm204/franken-brain/commit/886f9bc0ebf0f582590dd62a0eaf614d518a0550))
* add RAMP_UP.md for agent onboarding ([8040e25](https://github.com/djm204/franken-brain/commit/8040e257d8dbe9e26c0a1c103f6c5be72b8566e8))
* add README for MOD-03 Memory Systems ([48c56be](https://github.com/djm204/franken-brain/commit/48c56be45fbf2f4746c814898e9c16f2858fc188))


### CI/CD

* add release-please config and workflow ([a403043](https://github.com/djm204/franken-brain/commit/a403043313d79017a1af351d6f991cffab204fde))


### Tests

* **compression:** add all-pinned edge case and wire barrel into src/index ([5577ffc](https://github.com/djm204/franken-brain/commit/5577ffceaa5096c552c289d28033a60081497497))
* **compression:** add failing tests for TruncationStrategy, LlmSummarisationStrategy, EpisodicLessonExtractor ([0bad96c](https://github.com/djm204/franken-brain/commit/0bad96cf957c164df39f06a2cd09760558f150bc))
* **episodic:** add failing tests for EpisodicMemoryStore ([330788e](https://github.com/djm204/franken-brain/commit/330788e7c7407f249b0ff3d1186e9d6b512f9f05))
* **episodic:** add integration tests and fix integration test runner ([d9a69a0](https://github.com/djm204/franken-brain/commit/d9a69a0796bd18c2813c1e930fb90218970557cc))
* **orchestrator:** add failing tests for MemoryOrchestrator ([5ef5228](https://github.com/djm204/franken-brain/commit/5ef5228ed166bbfde91b259fbdd5400be2d6b623))
* **orchestrator:** add unit + integration tests and wire into src/index ([c404ced](https://github.com/djm204/franken-brain/commit/c404cedd274805b5240d103581586c325ab19201))
* **pii:** add failing tests for PiiGuard, PiiGuardedEpisodicStore, PiiGuardedSemanticStore ([eafa581](https://github.com/djm204/franken-brain/commit/eafa58114a697b4405d99267677be0eadfb1a436))
* **pii:** add PII guard tests including redact-mode path — 100% coverage ([59d1449](https://github.com/djm204/franken-brain/commit/59d14490f0350ccac1e257592aabdbae6e8adf4d))
* **scaffold:** add smoke test to verify vitest harness runs ([cb5579e](https://github.com/djm204/franken-brain/commit/cb5579ef54a8032dd77155e409ab716e6d083af6))
* **semantic:** add failing tests for SemanticMemoryStore ([70f2f80](https://github.com/djm204/franken-brain/commit/70f2f806ca2e2da74099f9bb10989909ff101ae2))
* **semantic:** add tests including defensive guards and wire barrel into src/index ([5e7ba03](https://github.com/djm204/franken-brain/commit/5e7ba03d29aa878a51ac0061aeaa1ab26fb01006))
* **types:** add failing tests for MemoryEntry discriminated union ([a80b649](https://github.com/djm204/franken-brain/commit/a80b64981d9b554f1333e3791e71251cccc9115f))
* **types:** add failing tests for TokenBudget value object ([9993fc8](https://github.com/djm204/franken-brain/commit/9993fc82be787e49978e36746d3c1e0757aa5e60))
* **types:** add failing tests for ULID sort property ([8f1da44](https://github.com/djm204/franken-brain/commit/8f1da444c10b60248b70f0b06ccd1b85a51550ae))
* **working:** add dedicated tests for partitionForPruning pure function ([2787fd5](https://github.com/djm204/franken-brain/commit/2787fd5c63ad705714019f0c7191d0ba6b1de801))
* **working:** add failing tests for WorkingMemoryStore ([8aa1bf6](https://github.com/djm204/franken-brain/commit/8aa1bf68c651477cbecdf5d8ad08d31773924b2a))


### Refactoring

* **types:** add barrel export for src/types and wire into src/index ([8b6e83d](https://github.com/djm204/franken-brain/commit/8b6e83d6cf3f56e3ca96dbb8990de4189b189fe1))
* **working:** add barrel export and wire WorkingMemoryStore into src/index ([bc773da](https://github.com/djm204/franken-brain/commit/bc773dafcc531260cdac96378b6370e8d2dc9092))
