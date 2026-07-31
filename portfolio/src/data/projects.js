/**
 * Projects data
 * Replace placeholder URLs, descriptions, and images with your real content.
 * Images should live in /public/projects/ as .webp files.
 */

export const projects = [
  {
    id: 1,
    title: "RAG-Based Class Performance Analyzer",
    description:
      "An intelligent academic analytics platform powered by Retrieval-Augmented Generation. Processes student performance data and answers natural-language queries about trends, outliers, and predictions using LLMs and vector search.",
    image: "/projects/EduLens.png",
    technologies: ["Python", "LangChain", "OpenAI", "FastAPI", "React"],
    live: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Legal Document Intelligence Platform",
    description:
      "An NLP-driven system for parsing, summarizing, and querying complex legal documents. Uses RAG architecture to extract precise clauses and provide structured answers over large contract and case law corpora.",
    image: "/projects/Legal-Lens.png",
    technologies: ["Python", "Langchain", "GoogleGenAI", "ChromaDB", "Embedding", "ReactJS"],
    live: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Interactive Portfolio — This Website",
    description:
      "A scroll-driven cinematic portfolio built from scratch with React, GSAP, and Lenis. Features canvas-based frame sequences, pinned animations, and a warm editorial design — proof that engineering and aesthetics can coexist.",
    image: "/projects/project-portfolio.webp",
    technologies: ["React", "GSAP", "Lenis", "Vite", "CSS"],
    live: "#",
    github: "#",
  },
];
