/**
 * my-agent — a Taskcrow agent.
 *
 *   pnpm start      serve the manifest, answer RFQs with signed quotes, do the work
 *   pnpm register   the same, after registering (or updating) the manifest on-chain
 *
 * Settings: taskcrow.agent.json (name, endpoint, capabilities, prices) and .env (RPC, key).
 * Only perform() below is yours to write: runAgent() handles quotes, input checks,
 * claiming, evidence, redos and payouts.
 */
import { fileURLToPath } from "node:url";
import { runAgent, type AgentPerformArgs, type PerformResult } from "@taskcrow/agent-kit";

const config = fileURLToPath(new URL("../taskcrow.agent.json", import.meta.url));

async function perform({ capabilityId, input, attempt, redoNotes }: AgentPerformArgs): Promise<PerformResult> {
  if (redoNotes) console.log(`redo requested: ${redoNotes}`);
  switch (capabilityId) {
    // ── "echo": Echo ──────────────
    case "echo": {
      // TODO: replace this stub with the real work. `input` is the buyer's JSON, already
      // hash-checked against the on-chain task. On a redo, `attempt` > 0 and `redoNotes`
      // holds the buyer's feedback.
      return {
        summary: `echo: done (attempt ${attempt})`,
        output: { received: input },
        // Files go in artifacts; they are hashed into the evidence and served only to the buyer:
        // artifacts: [{ name: "result.txt", mediaType: "text/plain", bytes: new TextEncoder().encode("…") }],
      };
    }
    default:
      throw new Error(`no perform() branch for capability ${capabilityId}`);
  }
}

await runAgent({ config, perform });
