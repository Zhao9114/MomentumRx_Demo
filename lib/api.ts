import { Intake, Plan } from "../types";
import { PlanSchema } from "./schemas/plan";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function sendCoachMessage(
  messages: { role: string; content: string }[],
  profile: object
): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/coach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, profile }),
  });
  if (!res.ok) throw new Error(`Coach API error ${res.status}`);
  const data = await res.json();
  return data.content;
}

export async function generatePlan(intake: Intake): Promise<Plan> {
  const res = await fetch(`${BASE_URL}/api/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ intake }),
  });
  if (!res.ok) throw new Error(`Plan API error ${res.status}`);
  const data = await res.json();
  return PlanSchema.parse(data);
}
