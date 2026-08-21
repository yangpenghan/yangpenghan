---
title: "A knowledge base delivers paragraphs, not storage"
description: "How 146 product documents and 217 usability documents became 6,000+ indexed paragraphs: separate libraries, three-level retrieval, and why chunking decides everything."
publishDate: 2026-08-20
locale: en
category: solution-engineering
categoryLabel: Solution engineering
readingMinutes: 6
featured: true
relatedWork: medical-devices
---

Most people think of a knowledge base as a place to store documents: collect the files, make them searchable, done. After building two of these systems, I have learned that almost nothing important happens on the storage side.

I maintain two separate knowledge bases. One comes from 146 Noldus product documents, covering the product line from observation labs to behavioral analysis software. The other comes from 217 usability documents covering IEC 62366, ANSI/AAMI HE75, and NMPA guidance. I deliberately kept them apart instead of merging them into one large library, because the questions they answer are completely different. The product library answers "how does this feature work, how is it configured." The usability library answers "how does this regulatory requirement land in practice." Merge them and retrieval degrades on both sides: a product-configuration query returns a passage of regulation text, a regulation query returns setup instructions, and a human has to filter every result. The cost of separation is maintaining two indexes; the benefit is that every question enters the right corpus.

## The processing chain

The product library runs on this pipeline:

- Text conversion, normalizing various document formats into plain text;
- Paragraph chunking, split at semantic boundaries rather than fixed lengths;
- A keyword index for exact matching;
- Vector embeddings stored in ChromaDB for semantic retrieval.

Chunking is the step that determines quality. Cut too long, and retrieval returns "the section containing the answer" rather than the answer. Cut too short, and a paragraph loses its context and makes no sense on its own. The target size is the smallest semantic unit that can stand alone and be cited directly. Across both libraries, this currently adds up to more than 6,000 indexed paragraphs.

## Three levels of retrieval

Retrieval runs in three tiers, ordered by cost:

**L1, filename matching**, essentially free, locates the rough territory of a question. **L2, keyword search**, around 0.2 seconds, handles queries with precise terminology—product names, feature names, standard numbers. **L3, semantic search**, one to two seconds, handles vaguely phrased queries that require intent understanding.

Most day-to-day questions end at L2 and never touch semantic search. This layering is not showing off; it follows from usage frequency. Cheap paths serve the frequent questions, and the expensive path is reserved for queries that genuinely need it.

## Where the value sits

Once the base was running, its value showed up in one concrete scenario: after asking a question, you get back paragraphs you can use directly—a standard's wording on formative-study sample size, or the configuration notes for a specific product parameter. Not a list of file links that you then have to open and navigate yourself.

That changes the design standard for a knowledge base. You judge it not by how many documents it holds, but by how much rework a retrieval leaves the user with. The less rework, the closer your chunking and indexing are to the real units of use.

Maintenance matters just as much. Product documentation gets updated, standards get revised, and the index has to be rebuildable. Paragraph-level chunking helps here too: when one document changes, you reprocess only that document and leave the rest of the library untouched.

Knowledge engineering sounds like a one-time construction project. In practice it is continuous curation—deciding what belongs together, what must stay apart, and along which path a question should be answered.
