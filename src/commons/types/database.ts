export type Database = {
  public: {
    Tables: {
      diaries: {
        Row: {
          id: number;
          title: string;
          content: string;
          emotion: string;
          createdAt: string | null;
          userId: string | null;
          userName: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          content: string;
          emotion: string;
          createdAt?: string | null;
          userId?: string | null;
          userName?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          content?: string;
          emotion?: string;
          createdAt?: string | null;
          userId?: string | null;
          userName?: string | null;
        };
        Relationships: [];
      };
      retrospects: {
        Row: {
          id: number;
          content: string;
          diaryId: number;
          createdAt: string | null;
          userId: string | null;
          userName: string | null;
        };
        Insert: {
          id?: number;
          content: string;
          diaryId: number;
          createdAt?: string | null;
          userId?: string | null;
          userName?: string | null;
        };
        Update: {
          id?: number;
          content?: string;
          diaryId?: number;
          createdAt?: string | null;
          userId?: string | null;
          userName?: string | null;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
