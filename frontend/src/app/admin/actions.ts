"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/services/admin-auth.service";
import {
  createBlockFromForm,
  createStoryFromForm,
  deleteBlock,
  updateBlockFromForm,
  updateStoryFromForm
} from "@/services/story.service";

export async function createStoryAction(formData: FormData) {
  await requireAdmin();
  const storyId = await createStoryFromForm(formData);
  revalidatePath("/admin/stories");
  redirect(`/admin/stories/${storyId}/edit`);
}

export async function updateStoryAction(storyId: string, formData: FormData) {
  await requireAdmin();
  await updateStoryFromForm(storyId, formData);
  revalidatePath("/admin/stories");
  revalidatePath(`/admin/stories/${storyId}/edit`);
}

export async function createBlockAction(storyId: string, formData: FormData) {
  await requireAdmin();
  await createBlockFromForm(storyId, formData);
  revalidatePath(`/admin/stories/${storyId}/edit`);
}

export async function updateBlockAction(storyId: string, blockId: string, formData: FormData) {
  await requireAdmin();
  await updateBlockFromForm(blockId, formData);
  revalidatePath(`/admin/stories/${storyId}/edit`);
}

export async function deleteBlockAction(storyId: string, blockId: string) {
  await requireAdmin();
  await deleteBlock(blockId);
  revalidatePath(`/admin/stories/${storyId}/edit`);
}
