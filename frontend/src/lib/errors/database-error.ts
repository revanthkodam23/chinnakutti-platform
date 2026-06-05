import type { ActionState } from "@/types/action-state";

type PostgreSqlErrorLike = {
  code?: unknown;
  message?: unknown;
  details?: unknown;
  hint?: unknown;
};

export function databaseErrorState(error: unknown): ActionState {
  const parsed = parsePostgreSqlError(error);

  return {
    status: "error",
    message: parsed.message,
    code: parsed.code,
    details: parsed.details,
    hint: parsed.hint,
    resolution: resolutionForError(parsed)
  };
}

function parsePostgreSqlError(error: unknown) {
  if (error instanceof Error) {
    return {
      code: valueFromError(error, "code"),
      message: error.message,
      details: valueFromError(error, "details"),
      hint: valueFromError(error, "hint")
    };
  }

  if (isPostgreSqlErrorLike(error)) {
    return {
      code: stringValue(error.code),
      message: stringValue(error.message) ?? "An unknown database error occurred.",
      details: stringValue(error.details),
      hint: stringValue(error.hint)
    };
  }

  return {
    code: undefined,
    message: typeof error === "string" ? error : "An unknown database error occurred.",
    details: undefined,
    hint: undefined
  };
}

function resolutionForError(error: ReturnType<typeof parsePostgreSqlError>) {
  const combined = `${error.message} ${error.details ?? ""}`;

  if (error.code === "23505" && combined.includes("story_blocks_story_language_sort_idx")) {
    return "Choose a Sort Order that is not already used by another block in this story and language.";
  }

  if (error.code === "23505") {
    return "A value that must be unique is already in use. Review the PostgreSQL details above.";
  }

  if (error.code === "23514" && combined.includes("story_blocks_content_or_asset")) {
    return "Enter Content, an Asset URL, or upload an image/audio file before saving.";
  }

  return undefined;
}

function isPostgreSqlErrorLike(value: unknown): value is PostgreSqlErrorLike {
  return typeof value === "object" && value !== null;
}

function valueFromError(error: Error, key: keyof PostgreSqlErrorLike) {
  return stringValue((error as Error & PostgreSqlErrorLike)[key]);
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
