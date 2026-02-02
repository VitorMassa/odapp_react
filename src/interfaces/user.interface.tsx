export interface user {
    id:number,
    name: string,
    email: string,
    uuid_user: string,
    uuid_role: string,
    name_role: string
}

export interface userPatient {
    name: string,
    cpf: string,
    age: string,
    city: string,
    state: string,
    content: string,
}