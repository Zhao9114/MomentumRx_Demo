import { MOMENTUM_IP } from "./momentum-ip";
import { Profile } from "../../types";

export function buildCoachSystemPrompt(profile: Profile): string {
  return `${MOMENTUM_IP}

Current user profile:
- Name: ${profile.name}
- Goal: ${profile.goal.replace("_", " ")}
- Experience: ${profile.experience}
- Days per week: ${profile.days_per_week}
- Current weight: ${profile.current_weight_lb} lb → target ${profile.target_weight_lb} lb
- Injuries / limitations: ${profile.injuries || "none"}
- Biggest friction point: ${profile.friction || "not specified"}`;
}
