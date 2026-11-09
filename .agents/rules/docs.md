# Writing learning documents

1. Write learning documents under `docs/` in Simplified Chinese. Keep code identifiers and technical terms in their original spelling.
2. Give each overview one question. Start with a small example the reader can recognize, then explain the mechanism in the order it happens.
3. When explaining a transformation, show the original source first. When comparing modes, reuse the same input and show each mode’s output separately. Identify what the author writes and what the tool generates.
4. Explain what the example produces and when. For JSX, distinguish compilation, element creation, and rendering. For types, distinguish static checks from runtime behavior.
5. Keep paragraphs short. Link each upstream implementation claim to the relevant file and symbol in the project’s React source tag. Label simplified examples and report execution results only when observed.
6. Use one unnumbered H1 per document, formatted as `# 中文标题<sup>filename.md</sup>`. Use the actual filename including its extension in the superscript. Write heading titles in Simplified Chinese while retaining necessary code identifiers and technical terms.
7. Number H2 headings sequentially as `## 1. 二级标题`. Number H3 headings within their parent H2 as `### 1.1. 三级标题`, restarting the second number for each H2. Leave H4–H6 headings unnumbered, for example `#### 其他层级标题`. When reorganizing sections, update heading numbers and any affected anchor links together.
