export interface Course{
    id: number | string;
    courses_type: number | string | null;
    name: string;
    description: string;
    enabled: number;
    created_at: Date;
    updated_at: Date;
}