export interface Rol {
    id:         number | string;
    name:       string;
    guard_name: string;
    enabled:    number | string;
    created_at: Date;
    updated_at: Date;
}
