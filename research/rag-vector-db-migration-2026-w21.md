# Research: rag-vector-db-migration-2026-w21

**Date:** 2026-05-23
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** HIGH
**Requester:** claude-code
**Seeds:** https://qdrant.tech/documentation/,https://github.com/qdrant/qdrant,https://docs.trychroma.com/,https://github.com/chroma-core/chroma,https://weaviate.io/developers/weaviate,https://milvus.io/docs/install_standalone-docker.md,https://lancedb.github.io/lancedb/,https://github.com/pgvector/pgvector,https://www.pinecone.io/learn/series/faiss/faiss-tutorial/,https://ann-benchmarks.com/

---

## RAG Service Vector Database Migration - Findings Document

**ID:** rag-vector-db-migration-2026-w21
**Goal:** Investigate migrating the RAG service from FAISS IndexFlatL2 to a proper disk-backed vector database.

### Summary

The current RAG service relies on FAISS IndexFlatL2, which loads the entire 13 GB index into RAM, causing significant memory pressure on `wyltek-10700` (32 GB RAM) upon restarts. This approach is unsustainable for the projected growth to 20M vectors. The investigation focused on identifying a disk-backed vector database that supports incremental updates, offers a mature Python client, provides tunable indexing (HNSW/IVF-PQ), has a robust backup story, and ideally runs as a self-contained process on the same host.

After evaluating Qdrant, Chroma, Weaviate, Milvus-Lite, LanceDB, and pgvector, **LanceDB** emerges as the most suitable candidate, closely followed by **Chroma**. Both offer in-process or lightweight deployment options that align with the "single self-contained process" bias and are designed for efficient disk-backed operation, which is critical for the current 4.2M vectors and essential for the projected 20M vectors given the 32 GB RAM constraint. Qdrant, Weaviate, Milvus-Lite, and pgvector, while powerful, are likely to exceed the available RAM for their index in a non-quantized state, especially at 2
