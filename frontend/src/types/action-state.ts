export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
  resolution?: string;
};

export const initialActionState: ActionState = {
  status: "idle"
};
