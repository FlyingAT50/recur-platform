export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      agreements: {
        Row: {
          bike_id: string
          choice_opens_on: string | null
          consumer_id: string
          created_at: string
          dealer_org_id: string
          finance_provider_org_id: string | null
          id: string
          lifecycle_choice: Database["public"]["Enums"]["lifecycle_choice"]
          reference: string
          started_on: string | null
          status: Database["public"]["Enums"]["agreement_status"]
          term_ends_on: string | null
        }
        Insert: {
          bike_id: string
          choice_opens_on?: string | null
          consumer_id: string
          created_at?: string
          dealer_org_id: string
          finance_provider_org_id?: string | null
          id?: string
          lifecycle_choice?: Database["public"]["Enums"]["lifecycle_choice"]
          reference: string
          started_on?: string | null
          status?: Database["public"]["Enums"]["agreement_status"]
          term_ends_on?: string | null
        }
        Update: {
          bike_id?: string
          choice_opens_on?: string | null
          consumer_id?: string
          created_at?: string
          dealer_org_id?: string
          finance_provider_org_id?: string | null
          id?: string
          lifecycle_choice?: Database["public"]["Enums"]["lifecycle_choice"]
          reference?: string
          started_on?: string | null
          status?: Database["public"]["Enums"]["agreement_status"]
          term_ends_on?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agreements_bike_id_fkey"
            columns: ["bike_id"]
            isOneToOne: false
            referencedRelation: "bikes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agreements_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agreements_dealer_org_id_fkey"
            columns: ["dealer_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agreements_finance_provider_org_id_fkey"
            columns: ["finance_provider_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      bikes: {
        Row: {
          created_at: string
          current_dealer_org_id: string | null
          frame_number: string
          id: string
          lifecycle_status: string
          manufacturer_org_id: string | null
          model: string
          original_specification: Json
        }
        Insert: {
          created_at?: string
          current_dealer_org_id?: string | null
          frame_number: string
          id?: string
          lifecycle_status?: string
          manufacturer_org_id?: string | null
          model: string
          original_specification?: Json
        }
        Update: {
          created_at?: string
          current_dealer_org_id?: string | null
          frame_number?: string
          id?: string
          lifecycle_status?: string
          manufacturer_org_id?: string | null
          model?: string
          original_specification?: Json
        }
        Relationships: [
          {
            foreignKeyName: "bikes_current_dealer_org_id_fkey"
            columns: ["current_dealer_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bikes_manufacturer_org_id_fkey"
            columns: ["manufacturer_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          consent_at: string | null
          created_at: string
          email: string
          id: string
          kind: string
          message: string | null
          name: string | null
        }
        Insert: {
          consent_at?: string | null
          created_at?: string
          email: string
          id?: string
          kind: string
          message?: string | null
          name?: string | null
        }
        Update: {
          consent_at?: string | null
          created_at?: string
          email?: string
          id?: string
          kind?: string
          message?: string | null
          name?: string | null
        }
        Relationships: []
      }
      lifecycle_events: {
        Row: {
          actor_org_id: string | null
          actor_user_id: string | null
          agreement_id: string | null
          bike_id: string
          detail: Json
          event_type: string
          id: string
          occurred_at: string
        }
        Insert: {
          actor_org_id?: string | null
          actor_user_id?: string | null
          agreement_id?: string | null
          bike_id: string
          detail?: Json
          event_type: string
          id?: string
          occurred_at?: string
        }
        Update: {
          actor_org_id?: string | null
          actor_user_id?: string | null
          agreement_id?: string | null
          bike_id?: string
          detail?: Json
          event_type?: string
          id?: string
          occurred_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lifecycle_events_actor_org_id_fkey"
            columns: ["actor_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lifecycle_events_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lifecycle_events_bike_id_fkey"
            columns: ["bike_id"]
            isOneToOne: false
            referencedRelation: "bikes"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          external_ref: string | null
          id: string
          kind: string
          name: string
        }
        Insert: {
          created_at?: string
          external_ref?: string | null
          id?: string
          kind: string
          name: string
        }
        Update: {
          created_at?: string
          external_ref?: string | null
          id?: string
          kind?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          finance_authorized: boolean
          id: string
          organization_id: string | null
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string
          display_name: string
          finance_authorized?: boolean
          id: string
          organization_id?: string | null
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string
          display_name?: string
          finance_authorized?: boolean
          id?: string
          organization_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      service_events: {
        Row: {
          agreement_id: string | null
          bike_id: string
          created_at: string
          dealer_org_id: string
          event_type: string
          evidence: Json
          id: string
          occurred_at: string
          summary: string
          technician_user_id: string | null
        }
        Insert: {
          agreement_id?: string | null
          bike_id: string
          created_at?: string
          dealer_org_id: string
          event_type: string
          evidence?: Json
          id?: string
          occurred_at: string
          summary: string
          technician_user_id?: string | null
        }
        Update: {
          agreement_id?: string | null
          bike_id?: string
          created_at?: string
          dealer_org_id?: string
          event_type?: string
          evidence?: Json
          id?: string
          occurred_at?: string
          summary?: string
          technician_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_events_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_events_bike_id_fkey"
            columns: ["bike_id"]
            isOneToOne: false
            referencedRelation: "bikes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_events_dealer_org_id_fkey"
            columns: ["dealer_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      agreement_finance_visible: {
        Row: {
          agreement_id: string | null
          monthly_payment: number | null
          next_payment_on: string | null
          paid_percent: number | null
          remaining_balance: number | null
          updated_at: string | null
        }
        Insert: {
          agreement_id?: string | null
          monthly_payment?: number | null
          next_payment_on?: string | null
          paid_percent?: number | null
          remaining_balance?: number | null
          updated_at?: string | null
        }
        Update: {
          agreement_id?: string | null
          monthly_payment?: number | null
          next_payment_on?: string | null
          paid_percent?: number | null
          remaining_balance?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      agreement_status:
        | "application"
        | "active"
        | "service_due"
        | "return_window"
        | "return_booked"
        | "renewed"
        | "completed"
        | "exception"
      app_role: "consumer" | "dealer" | "operations"
      lifecycle_choice: "undecided" | "return" | "renew"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agreement_status: [
        "application",
        "active",
        "service_due",
        "return_window",
        "return_booked",
        "renewed",
        "completed",
        "exception",
      ],
      app_role: ["consumer", "dealer", "operations"],
      lifecycle_choice: ["undecided", "return", "renew"],
    },
  },
} as const

