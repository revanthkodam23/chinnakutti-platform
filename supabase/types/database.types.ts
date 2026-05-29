export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      age_groups: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          label: string;
          max_age: number;
          min_age: number;
          slug: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          label: string;
          max_age: number;
          min_age: number;
          slug: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          label?: string;
          max_age?: number;
          min_age?: number;
          slug?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          color: string;
          created_at: string;
          description: Json;
          icon: string | null;
          id: string;
          is_active: boolean;
          name: Json;
          slug: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          color?: string;
          created_at?: string;
          description?: Json;
          icon?: string | null;
          id?: string;
          is_active?: boolean;
          name: Json;
          slug: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          color?: string;
          created_at?: string;
          description?: Json;
          icon?: string | null;
          id?: string;
          is_active?: boolean;
          name?: Json;
          slug?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      languages: {
        Row: {
          code: string;
          created_at: string;
          direction: "ltr" | "rtl";
          id: string;
          is_active: boolean;
          name: string;
          native_name: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          direction?: "ltr" | "rtl";
          id?: string;
          is_active?: boolean;
          name: string;
          native_name: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          direction?: "ltr" | "rtl";
          id?: string;
          is_active?: boolean;
          name?: string;
          native_name?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      stories: {
        Row: {
          age_group_id: string | null;
          audio_narration_url: string | null;
          author_name: string | null;
          category_id: string;
          cover_image_alt: Json;
          cover_image_url: string | null;
          created_at: string;
          difficulty_level: number;
          excerpt: Json;
          id: string;
          is_featured: boolean;
          published_at: string | null;
          reading_time_minutes: number;
          seo_metadata: Json;
          slug: string;
          status: Database["public"]["Enums"]["story_status"];
          tags: string[];
          title: Json;
          updated_at: string;
          view_count: number;
        };
        Insert: {
          age_group_id?: string | null;
          audio_narration_url?: string | null;
          author_name?: string | null;
          category_id: string;
          cover_image_alt?: Json;
          cover_image_url?: string | null;
          created_at?: string;
          difficulty_level?: number;
          excerpt?: Json;
          id?: string;
          is_featured?: boolean;
          published_at?: string | null;
          reading_time_minutes?: number;
          seo_metadata?: Json;
          slug: string;
          status?: Database["public"]["Enums"]["story_status"];
          tags?: string[];
          title: Json;
          updated_at?: string;
          view_count?: number;
        };
        Update: {
          age_group_id?: string | null;
          audio_narration_url?: string | null;
          author_name?: string | null;
          category_id?: string;
          cover_image_alt?: Json;
          cover_image_url?: string | null;
          created_at?: string;
          difficulty_level?: number;
          excerpt?: Json;
          id?: string;
          is_featured?: boolean;
          published_at?: string | null;
          reading_time_minutes?: number;
          seo_metadata?: Json;
          slug?: string;
          status?: Database["public"]["Enums"]["story_status"];
          tags?: string[];
          title?: Json;
          updated_at?: string;
          view_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "stories_age_group_id_fkey";
            columns: ["age_group_id"];
            isOneToOne: false;
            referencedRelation: "age_groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      story_blocks: {
        Row: {
          asset_url: string | null;
          block_type: Database["public"]["Enums"]["story_block_type"];
          content: string | null;
          created_at: string;
          id: string;
          language_id: string;
          metadata: Json;
          sort_order: number;
          story_id: string;
          updated_at: string;
        };
        Insert: {
          asset_url?: string | null;
          block_type?: Database["public"]["Enums"]["story_block_type"];
          content?: string | null;
          created_at?: string;
          id?: string;
          language_id: string;
          metadata?: Json;
          sort_order?: number;
          story_id: string;
          updated_at?: string;
        };
        Update: {
          asset_url?: string | null;
          block_type?: Database["public"]["Enums"]["story_block_type"];
          content?: string | null;
          created_at?: string;
          id?: string;
          language_id?: string;
          metadata?: Json;
          sort_order?: number;
          story_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "story_blocks_language_id_fkey";
            columns: ["language_id"];
            isOneToOne: false;
            referencedRelation: "languages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "story_blocks_story_id_fkey";
            columns: ["story_id"];
            isOneToOne: false;
            referencedRelation: "stories";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      set_updated_at: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
    };
    Enums: {
      story_block_type:
        | "heading"
        | "paragraph"
        | "image"
        | "audio"
        | "activity_prompt"
        | "moral";
      story_status: "draft" | "scheduled" | "published" | "archived";
    };
    CompositeTypes: Record<string, never>;
  };
};

type PublicSchema = Database["public"];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends { Row: infer R }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
