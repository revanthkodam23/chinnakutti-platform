# Story Studio Admin User Manual

**Product:** Chinnakutti.Fun Story Studio  
**Audience:** Content creators, editors, translators, and publishing administrators  
**Last reviewed:** June 5, 2026

> **Important current limitation**
>
> Story Studio saves stories to Supabase. The public `/stories` listing now reads
> published stories directly from Supabase. Other public content routes, including
> story detail, homepage, and category pages, still use the older content source.
> Complete the full public-site verification step with a developer until every
> public route uses Supabase.

## Overview

### Purpose of Story Studio

Story Studio is the private administration area for creating and managing
Chinnakutti.Fun content. It is designed for daily publishing of child-safe,
parent-friendly Telugu and English stories.

Administrators can:

- Create story records.
- Save stories as drafts or mark them published.
- Upload cover images.
- Mark multiple stories, rhymes, worksheets, or puzzles as featured.
- Add separate English and Telugu content blocks.
- Add headings, paragraphs, images, audio, activities, and morals.
- Search and filter the story list.

### How Stories Are Structured

A complete story has two levels:

1. **Story information** describes the story as a whole: titles, excerpts,
   category, age group, cover image, difficulty, publishing status, and SEO data.
2. **Story Blocks** contain the ordered reading experience: headings,
   paragraphs, images, audio, activities, and morals.

English and Telugu use the same Story record, but their Story Blocks are stored
separately by language.

### Key Terms

| Term | Meaning |
|---|---|
| **Story** | The complete content item and its publishing information. A Story may represent a traditional story, rhyme, worksheet, or puzzle depending on its category. |
| **Story Block** | One ordered piece of a Story, such as a paragraph, image, or audio clip. Each block belongs to one language. |
| **Category** | The content grouping, such as Moral Stories, Rhymes & Songs, Worksheets, or Puzzles & Games. |
| **Language** | The language assigned to a Story Block. English (`en`) and Telugu (`te`) are currently configured. |
| **Age Group** | The recommended reader age range, such as Ages 2-4, Ages 3-8, or Ages 5-10. |

## Login

### How Admin Authentication Works

Story Studio uses Supabase Authentication. Each administrator needs:

- A Supabase Auth user account with an email and password.
- Permission through either:
  - Supabase `app_metadata.role = "admin"`; or
  - The user's email listed in the application's `ADMIN_EMAILS` setting.

The recommended method is `app_metadata.role = "admin"`.

### How to Log In

1. Open `/admin` on the Chinnakutti website.
2. Enter the administrator email address.
3. Enter the administrator password.
4. Select **Enter Story Studio**.
5. After successful login, the Story Studio dashboard appears.

### Common Login Issues

| Problem | Likely cause | Resolution |
|---|---|---|
| “Invalid login credentials” | The email or password is incorrect. | Re-enter the credentials carefully. Ask the Supabase administrator to reset the password if needed. |
| Login succeeds but `/admin` still shows the login screen | The account is authenticated but is not authorized as an admin, or the session still contains an older role. | Confirm the account has `app_metadata.role = "admin"`. Sign out or clear the site session, then sign in again. |
| “Supabase environment variables are not configured yet.” | The application is missing its Supabase URL or anonymous key. | Ask the technical administrator to configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. |
| Story pages redirect back to `/admin` | The session expired or the account is no longer an admin. | Sign in again. If the issue continues, ask the technical administrator to verify the admin role. |

> Story Studio currently has no visible **Sign Out** button. To switch accounts,
> clear the site's cookies/session or ask a technical administrator for help.

## Story Management

Open `/admin/stories` to view all stories.

The Story List supports:

- **Search:** Searches slug, English title, Telugu title, English excerpt, and
  Telugu excerpt.
- **Status filter:** Filters by draft, scheduled, published, or archived status.
- **Category filter:** Shows stories in one selected category.
- **Language filter:** Shows stories that already contain at least one Story
  Block in the selected language.

Select **Create Story** to create a new story. Select **Edit** beside an existing
story to update its information and blocks.

### Story Form Field Guide

#### Title (English)

- **Purpose:** Main English name of the story.
- **Example:** `The Kind Elephant and the Little Mouse`
- **Required:** Yes.
- **Public website:** Intended to appear on English story cards, story pages,
  search results, browser titles, and sharing previews.

#### Title (Telugu)

- **Purpose:** Telugu translation of the story title.
- **Example:** `దయగల ఏనుగు మరియు చిన్న ఎలుక`
- **Required:** Optional in the current form, but strongly recommended for
  bilingual stories.
- **Public website:** Intended to appear when Telugu content is selected.

#### Slug

- **Purpose:** Creates the permanent, readable URL identifier.
- **Example:** `kind-elephant-little-mouse`
- **Required:** Yes. It must be unique.
- **Public website:** Intended URL:
  `/stories/kind-elephant-little-mouse`.
- **Rules:** Use lowercase English letters, numbers, and single hyphens only.

#### Excerpt (English)

- **Purpose:** Short English summary that helps families decide whether to read
  the story.
- **Example:** `A gentle forest tale about kindness and helping friends.`
- **Required:** Optional in the current form, but strongly recommended.
- **Public website:** Intended to appear on story cards, category pages, search
  results, and SEO descriptions.

#### Excerpt (Telugu)

- **Purpose:** Telugu translation of the short summary.
- **Example:** `దయ మరియు స్నేహం గురించి ఒక మధురమైన అడవి కథ.`
- **Required:** Optional, but strongly recommended for Telugu stories.
- **Public website:** Intended to appear on Telugu cards and Telugu story pages.

#### Cover Image Upload

- **Purpose:** Uploads the main visual for the story.
- **Example:** `kind-elephant-cover.webp`
- **Required:** Optional in the current form, but recommended before publishing.
- **Public website:** Intended to appear on story cards and at the top of the
  story page.
- **Current behavior:** A new upload is stored in the public `story-assets`
  bucket under `covers/`. When editing, leaving this field empty keeps the
  existing cover.

#### Category

- **Purpose:** Groups the item as a story, rhyme, worksheet, puzzle, or another
  configured content type.
- **Example:** `Moral Stories`
- **Required:** Yes.
- **Public website:** Intended to control category pages, labels, colors, and
  filtering.

#### Age Group

- **Purpose:** Identifies the recommended age range.
- **Example:** `Ages 3-8`
- **Required:** Optional.
- **Public website:** Intended to help parents choose suitable content and
  support future recommendations.

#### Featured Story

- **Purpose:** Marks the item for highlighted placement.
- **Example:** Checked for a weekly featured story or featured rhyme.
- **Required:** Optional; default is not featured.
- **Public website:** Intended to appear in featured sections.
- **Note:** Multiple published items can be featured at the same time.

#### Difficulty Level

- **Purpose:** Describes reading or activity difficulty.
- **Required:** Yes; defaults to `1 - Beginner`.
- **Public website:** Intended for filters and future recommendations.

| Level | Meaning |
|---|---|
| `1` | Beginner |
| `2` | Easy |
| `3` | Intermediate |
| `4` | Advanced |

#### Status

- **Purpose:** Controls the publishing state.
- **Required:** Yes; defaults to Draft.
- **Public website:** Only published stories are permitted by the database's
  public read policy.

| Status | Meaning |
|---|---|
| **Draft** | Work in progress. Not publicly readable from Supabase. |
| **Published** | Approved for public reading from Supabase. A published date is assigned automatically. |

The database also supports scheduled and archived statuses, and the Story List
can filter them. The current Story form only allows Draft and Published.

#### Reading Time

- **Purpose:** Estimated minutes needed to read the content.
- **Example:** `4`
- **Required:** Yes; defaults to 4 and must be greater than zero.
- **Public website:** Intended to appear on story cards and detail pages.

#### SEO Metadata

- **Purpose:** Provides title and description information for search engines and
  social sharing.
- **Example:** SEO title uses the English Title; SEO description uses the
  English Excerpt.
- **Required:** Stored automatically.
- **Public website:** Intended for page metadata and previews.
- **Current behavior:** There are no separate SEO fields in Story Studio.
  Saving the Story automatically copies the English Title and English Excerpt
  into SEO metadata.

#### Published Date

- **Purpose:** Records when the story became published.
- **Example:** `2026-06-05T10:30:00Z`
- **Required:** Required by the database for published stories.
- **Public website:** Intended for ordering and publication information.
- **Current behavior:** It is not editable in Story Studio. The date is assigned
  when a story is first published and retained when editing an already
  published story. Changing a story back to Draft clears the date.

## Story Blocks

Story Blocks are available after the initial Story record is created. After
selecting **Create Story**, Story Studio opens the Story Editor.

Every block includes:

- **Language:** English or Telugu.
- **Block Type:** Heading, Paragraph, Image, Audio, Activity Prompt, or Moral.
- **Sort Order:** Number controlling the position within that language.
- **Asset URL:** Optional existing image or audio URL.
- **Upload Image or Audio:** Optional new media file.
- **Alt Text:** Accessibility description, mainly for images.
- **Content:** Text shown for the block.
- **Caption:** Optional supporting caption.

Each block must contain either **Content** or an **Asset URL/uploaded file**.

### Heading

- **When to use:** Section titles inside a longer story.
- **Example content:** `A Surprise in the Forest`
- **Required fields:** Language, Block Type, Sort Order, and Content.
- **Rendering behavior:** Intended to display as a prominent section heading.

### Paragraph

- **When to use:** Main story narration and dialogue.
- **Example content:** `Maya followed the tiny footprints past the mango tree.`
- **Required fields:** Language, Block Type, Sort Order, and Content.
- **Rendering behavior:** Intended to display as readable story text.

### Image

- **When to use:** Illustrations placed between story sections.
- **Example:** Upload `elephant-helps-mouse.webp`.
- **Required fields:** Language, Block Type, Sort Order, and either an uploaded
  image or Asset URL. Alt Text is strongly recommended.
- **Rendering behavior:** Intended to display the image with optional alt text
  and caption.

### Audio

- **When to use:** Narration or sound for a specific language or story section.
- **Example:** Upload `kind-elephant-telugu.mp3`.
- **Required fields:** Language, Block Type, Sort Order, and either an uploaded
  audio file or Asset URL.
- **Rendering behavior:** Intended to display an audio player.
- **Current limitation:** Automated narration generation is not configured.
  Upload a completed audio file manually.

### Activity Prompt

- **When to use:** Invite the child or parent to discuss, act, draw, or answer.
- **Example content:** `Can you name three ways the elephant was kind?`
- **Required fields:** Language, Block Type, Sort Order, and Content.
- **Rendering behavior:** Intended to appear as a visually distinct activity or
  discussion prompt.

### Moral

- **When to use:** Close a moral story with its central lesson.
- **Example content:** `Kindness is never too small to make a difference.`
- **Required fields:** Language, Block Type, Sort Order, and Content.
- **Rendering behavior:** Intended to display as a highlighted closing lesson.

### Reordering Blocks

Blocks are displayed in ascending **Sort Order**. To reorder:

1. Change the Sort Order on the affected blocks.
2. Select **Save Block** on every changed block.
3. Reload or revisit the editor to confirm the order.

For each language, Sort Order values must be unique within the story. Using the
same Sort Order twice for English blocks, or twice for Telugu blocks, causes a
database validation error.

## Story Creation Workflow

### Recommended Daily Workflow

1. **Create the Story**
   - Open `/admin/stories`.
   - Select **Create Story**.
   - Enter the English title, Telugu title, slug, excerpts, category, age group,
     difficulty, reading time, and Draft status.
   - Select **Create Story**.

2. **Upload the Cover Image**
   - On creation, select the prepared cover file before selecting Create Story.
   - If the Story already exists, upload the cover in the Story form and select
     **Save Story**.

3. **Add English Blocks**
   - Choose English as the language.
   - Add blocks in reading order: Heading, Paragraphs, Images, Activity Prompt,
     and Moral.
   - Use Sort Order values such as `10`, `20`, `30`, and `40`. Leaving gaps
     makes later insertion easier.

4. **Add Telugu Blocks**
   - Choose Telugu as the language.
   - Add the translated blocks in the same logical order.
   - Use the same Sort Order pattern as English where practical.

5. **Save and Review**
   - Save each block individually.
   - Save the Story form.
   - Check titles, excerpts, language selections, block order, images, audio,
     age group, difficulty, and category.

6. **Publish**
   - Change Status from Draft to Published.
   - Select **Save Story**.
   - The published date is assigned automatically.

7. **Verify on the Public Website**
   - Ask the publishing/development owner to confirm the Supabase content
     delivery connection.
   - Open the intended public story URL.
   - Verify English and Telugu content, cover image, block order, mobile layout,
     audio playback, category, and metadata.

## Language Handling

### Entering English and Telugu Content

- Enter both titles and excerpts on the main Story form.
- Add separate Story Blocks for English and Telugu.
- Always verify the selected Language before adding or saving a block.
- Do not mix English and Telugu paragraphs inside one block unless the content
  intentionally requires both.

### Recommended Block Ordering

Use matching block structures where possible:

| Sort Order | English | Telugu |
|---:|---|---|
| 10 | Heading | Translated Heading |
| 20 | Paragraph | Translated Paragraph |
| 30 | Image | Image |
| 40 | Paragraph | Translated Paragraph |
| 50 | Moral | Translated Moral |

The English and Telugu blocks do not need identical wording, but they should
provide the same complete reading experience.

### Translation Workflow

1. Complete and approve the English draft.
2. Translate the title and excerpt.
3. Translate each text block individually.
4. Reuse images where appropriate by entering the existing Asset URL, or upload
   a language-specific image.
5. Upload separate English and Telugu narration files when available.
6. Review Telugu script, punctuation, names, and age suitability.
7. Confirm that both languages contain all necessary blocks before publishing.

## Images and Media

### Supported Formats

The interface accepts:

- **Cover images:** Browser-supported `image/*` files.
- **Block assets:** Browser-supported `image/*` and `audio/*` files.

Recommended formats:

- Images: WebP, JPEG, or PNG.
- Audio: MP3 or M4A/AAC.

The current application does not enforce a file size limit. For reliable page
performance, compress files before uploading.

Recommended practical limits:

- Cover image: under 500 KB where possible.
- Story illustration: under 500 KB where possible.
- Audio: compressed, clear speech, and only as long as necessary.

### Storage Bucket Usage

Uploaded files are saved in the Supabase Storage bucket:

`story-assets`

Storage paths:

- Cover images: `covers/<generated-file-name>`
- Story block media: `blocks/<generated-file-name>`

The bucket must exist and be public because Story Studio saves and uses public
asset URLs.

### Image Upload Workflow

1. Prepare and compress the image.
2. Use a clear source filename for your own records.
3. Upload it through Cover Image Upload or a Story Block.
4. For image blocks, enter useful Alt Text.
5. Save the Story or Block.
6. Verify the image after publishing.

### Audio Upload Workflow

1. Record and edit the narration outside Story Studio.
2. Choose the correct block Language.
3. Select Audio as the Block Type.
4. Upload the audio file or enter an existing Asset URL.
5. Set the Sort Order.
6. Save the block and verify playback after publishing.

## SEO Guide

### Slug Best Practices

Good slug:

`kind-elephant-little-mouse`

Avoid:

- Uppercase letters.
- Spaces.
- Telugu characters in the current slug field.
- Underscores.
- Special characters.
- Dates unless they are meaningful.
- Changing the slug after publication.

The accepted pattern is lowercase English letters and numbers separated by
single hyphens.

### SEO Title

The current system automatically uses **Title (English)** as the SEO title.

Recommendations:

- Make it clear and specific.
- Put important story words near the beginning.
- Keep it natural for parents and children.
- Avoid keyword stuffing.

### SEO Description

The current system automatically uses **Excerpt (English)** as the SEO
description.

Recommendations:

- Write one clear sentence.
- Describe the theme, characters, or learning value.
- Keep it appealing to parents.
- Avoid revealing the entire ending.

### Common SEO Mistakes

- Leaving the English Excerpt empty.
- Using a vague title such as `New Story`.
- Reusing another story's slug.
- Changing a published slug without adding a redirect.
- Writing a very long excerpt.
- Forgetting that Telugu SEO fields are not separately editable yet.

## Publishing Guide

### Draft Workflow

Use Draft while:

- Writing or translating content.
- Waiting for illustrations or narration.
- Reviewing child safety, grammar, or learning goals.
- Checking block order and media.

Draft stories are not publicly readable through the Supabase public policy.

### Published Workflow

Before changing to Published:

1. Confirm English Title, Slug, Category, and reading time.
2. Confirm English and Telugu titles/excerpts as required.
3. Confirm all Story Blocks and their languages.
4. Confirm Sort Order values are correct and unique per language.
5. Confirm images have useful Alt Text.
6. Confirm audio belongs to the correct language.
7. Confirm age group and difficulty.
8. Confirm the content is safe and age appropriate.
9. Change Status to Published and select **Save Story**.

### Featured Stories

Featured is independent of Published status. A Draft can technically be marked
Featured, but only a published story is eligible for public featured queries.

Multiple published items may be featured, including:

- Featured Story
- Featured Rhyme
- Featured Worksheet
- Featured Puzzle

Use the Category to distinguish the featured content type.

## Troubleshooting

### Missing Supabase Environment Variables

- **Root cause:** One or more required application settings are missing:
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, or
  `SUPABASE_SERVICE_ROLE_KEY`.
- **How to identify it:** Login displays “Supabase environment variables are not
  configured yet,” or admin data pages fail with a missing Supabase environment
  variable error.
- **Resolution:**
  1. Contact the technical administrator.
  2. Confirm all required variables exist in the deployment environment.
  3. Confirm the service role key is server-side only.
  4. Restart or redeploy the application.

### Bucket Not Found

- **Root cause:** The `story-assets` Supabase Storage bucket does not exist.
- **How to identify it:** Saving a Story or Block with a file upload fails and
  reports that the bucket was not found.
- **Resolution:**
  1. Open Supabase Storage.
  2. Create a bucket named exactly `story-assets`.
  3. Configure it as public.
  4. Retry the upload.

### `stories_slug_format` Constraint Error

- **Root cause:** The Slug contains invalid characters or formatting.
- **How to identify it:** Saving fails with a database error mentioning
  `stories_slug_format`.
- **Resolution:**
  1. Use lowercase English letters and numbers only.
  2. Separate words with single hyphens.
  3. Remove spaces, underscores, punctuation, and trailing hyphens.
  4. Save again.

### Duplicate Slug Error

- **Root cause:** Another Story already uses the same Slug.
- **How to identify it:** Saving fails with a duplicate key or unique constraint
  error related to the story slug.
- **Resolution:**
  1. Search Story Studio for the slug.
  2. Open the existing Story if it is the same item.
  3. Otherwise, choose a new descriptive slug.

### Authentication Failures

- **Root cause:** Incorrect credentials, expired session, missing admin role, or
  removed admin permission.
- **How to identify it:** Invalid credentials message, repeated login screen, or
  redirect to `/admin`.
- **Resolution:**
  1. Verify email and password.
  2. Confirm the user exists in Supabase Authentication.
  3. Confirm `app_metadata.role` is `admin`, or the email is configured in
     `ADMIN_EMAILS`.
  4. Sign in again to refresh the session.

### Storage Upload Failures

- **Root cause:** Missing bucket, invalid service role configuration, network
  problem, unsupported/corrupt file, or file too large for project limits.
- **How to identify it:** Saving fails after choosing a cover image or block
  asset.
- **Resolution:**
  1. Confirm the `story-assets` bucket exists and is public.
  2. Retry with a compressed WebP/JPEG/PNG or MP3/M4A file.
  3. Confirm the internet connection.
  4. Ask the technical administrator to verify the service role key and Storage
     project limits.

### Story Block Content or Asset Validation Error

- **Root cause:** The block has neither Content nor an Asset URL/uploaded file.
- **How to identify it:** Saving fails with an error mentioning
  `story_blocks_content_or_asset`.
- **Resolution:**
  1. For text blocks, enter Content.
  2. For Image or Audio blocks, upload a file or enter an Asset URL.
  3. Save the block again.

### Duplicate Story Block Sort Order Error

- **Root cause:** Two blocks in the same Story and Language use the same Sort
  Order.
- **How to identify it:** Saving fails with a unique constraint error mentioning
  `story_blocks_story_language_sort_idx`.
- **Resolution:**
  1. Review all blocks in that language.
  2. Give each block a unique Sort Order.
  3. Save each changed block.

### Difficulty Level Validation Error

- **Root cause:** Difficulty is outside levels 1 to 4.
- **How to identify it:** Database error mentions
  `stories_difficulty_level_range`.
- **Resolution:** Select Beginner, Easy, Intermediate, or Advanced from the
  Story form.

### Published Date Validation Error

- **Root cause:** A Story was marked Published without a Published Date through
  an external database/API operation.
- **How to identify it:** Database error mentions
  `stories_published_at_required`.
- **Resolution:** Publish through Story Studio, which assigns the date
  automatically, or ask a technical administrator to provide a valid date.

### Story Does Not Appear on the Public Website

- **Root cause:** The Story is still Draft, or the requested public route has not
  yet been connected to Story Studio Supabase records. The `/stories` listing is
  connected; story detail, homepage, and category routes are not yet fully
  connected.
- **How to identify it:** The Story exists and is Published in Story Studio but
  its public URL does not show the new content.
- **Resolution:**
  1. Confirm Status is Published.
  2. Confirm the intended public URL and slug.
  3. Ask the development/publishing owner to verify the Content API or Supabase
     public-site integration.

### Database Validation Failure

- **Root cause:** Required data is missing or violates a database rule.
- **How to identify it:** Saving fails with a constraint or database validation
  message.
- **Resolution:**
  1. Confirm English Title, Slug, and Category are filled.
  2. Confirm reading time is greater than zero.
  3. Confirm difficulty is between 1 and 4.
  4. Confirm blocks contain Content or an Asset.
  5. Confirm block Sort Orders are unique per language.
  6. If the message remains unclear, send the exact error text and Story slug to
     the technical administrator.

## Administrator Checklist

### Daily Content Publishing Checklist

- [ ] Sign in with the correct admin account.
- [ ] Search for the Story first to avoid duplicates.
- [ ] Create or open the Story in Draft status.
- [ ] Confirm English Title.
- [ ] Confirm Telugu Title where required.
- [ ] Confirm the Slug is clear, valid, and unique.
- [ ] Write English and Telugu Excerpts.
- [ ] Select the correct Category.
- [ ] Select the correct Age Group.
- [ ] Select Difficulty Level.
- [ ] Confirm Reading Time.
- [ ] Upload and review the Cover Image.
- [ ] Add all English Story Blocks.
- [ ] Add all Telugu Story Blocks.
- [ ] Confirm every block's Language.
- [ ] Confirm every block's Sort Order is correct and unique.
- [ ] Add Alt Text to images.
- [ ] Upload and verify audio where available.
- [ ] Review spelling, translation, child safety, and learning value.
- [ ] Decide whether the item should be Featured.
- [ ] Change Status to Published.
- [ ] Save the Story.
- [ ] Verify the intended public page with the publishing/development owner.

## Future Features

The application architecture includes placeholders for the following features,
but they are not yet available to content creators.

### AI Story Generation

Planned support for generating a draft from a prompt, language selection, age
group, category, and difficulty. AI output must always receive human editorial,
safety, cultural, and translation review before publication.

### Audio Narration

Planned support for automatically generating narration by Story and Language.
Current workflow requires manual audio upload.

### Worksheets

The Worksheets category already exists. A dedicated worksheet editor, printable
file workflow, and worksheet-specific fields are not yet implemented.

### Rhymes

The Rhymes & Songs category already exists. Dedicated rhyme timing, lyrics,
music, and sing-along controls are not yet implemented.

### Recommendations

The database stores age group, category, difficulty, featured status, and view
count for future recommendation and popularity features. Story Studio does not
currently manage recommendation rules.

## Support Information to Provide

When reporting a problem, include:

- Admin email address used.
- Story title and slug.
- Page URL where the problem occurred.
- Exact error message.
- Whether the Story was Draft or Published.
- Whether a file upload was involved.
- File type and approximate file size.
- Screenshot when possible.

Never send passwords, Supabase secret keys, or service role keys in a support
message.
