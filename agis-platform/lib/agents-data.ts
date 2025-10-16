import fs from "fs";
import path from "path";

export interface Agent {
  category: string;
  name: string;
  description: string;
  connectors: string[];
  triggers: string;
  kpis: string;
  slug: string;
}

/**
 * Parse the agents catalog CSV file
 */
export function getAgentsData(): Agent[] {
  const csvPath = path.join(process.cwd(), "../04_agents/agents_catalog.csv");
  
  try {
    const fileContent = fs.readFileSync(csvPath, "utf-8");
    const lines = fileContent.split("\n").filter((line) => line.trim());
    
    // Skip header
    const dataLines = lines.slice(1);
    
    return dataLines.map((line) => {
      // Simple CSV parsing (handles basic cases)
      const values = line.split(",");
      
      const category = values[0]?.trim() || "";
      const name = values[1]?.trim() || "";
      const description = values[2]?.trim().replace(/^"|"$/g, "") || "";
      const connectors =
        values[3]
          ?.trim()
          .split(",")
          .map((c) => c.trim()) || [];
      const triggers = values[4]?.trim() || "";
      const kpis = values[5]?.trim().replace(/^"|"$/g, "") || "";
      
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-");
      
      return {
        category,
        name,
        description,
        connectors,
        triggers,
        kpis,
        slug,
      };
    });
  } catch (error) {
    console.error("Error reading agents CSV:", error);
    return [];
  }
}

/**
 * Get unique categories from agents data
 */
export function getCategories(agents: Agent[]): string[] {
  const categories = new Set(agents.map((agent) => agent.category));
  return Array.from(categories);
}

/**
 * Filter agents by category
 */
export function filterAgentsByCategory(
  agents: Agent[],
  category?: string
): Agent[] {
  if (!category) return agents;
  return agents.filter(
    (agent) => agent.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get agent by slug
 */
export function getAgentBySlug(agents: Agent[], slug: string): Agent | null {
  return agents.find((agent) => agent.slug === slug) || null;
}

/**
 * Fallback data if CSV is not found
 */
export function getFallbackAgentsData(): Agent[] {
  return [
    {
      category: "Coding",
      name: "Code Refactorer",
      description: "Refactors repo modules, updates docs, opens PRs.",
      connectors: ["github"],
      triggers: "schedule/webhook",
      kpis: "Merged PRs, lint/CI pass rate",
      slug: "code-refactorer",
    },
    {
      category: "Coding",
      name: "PR Reviewer",
      description: "LLM-assisted code review and SAST hints.",
      connectors: ["github"],
      triggers: "webhook",
      kpis: "Defect density, review time",
      slug: "pr-reviewer",
    },
    {
      category: "Coding",
      name: "Spec-to-Scaffold",
      description: "Converts spec tickets into repo scaffolds with tests.",
      connectors: ["github"],
      triggers: "webhook",
      kpis: "Lead time reduced",
      slug: "spec-to-scaffold",
    },
    {
      category: "Coding",
      name: "Dependency Sentinel",
      description: "Monitors CVEs, opens version-bump PRs.",
      connectors: ["github"],
      triggers: "schedule",
      kpis: "Vuln MTTR",
      slug: "dependency-sentinel",
    },
    {
      category: "Coding",
      name: "Docs Syncer",
      description: "Syncs code comments → docs site/Notion.",
      connectors: ["github", "notion"],
      triggers: "schedule",
      kpis: "Docs freshness",
      slug: "docs-syncer",
    },
    // Add more fallback agents as needed...
  ];
}

