export interface patient {
    uuid_patient: string;
    created_by_uuid_user: string;
    name: string;
    cpf: string;
    age: string;
    city: string;
    state: string;
    uuid_team?: string;
}