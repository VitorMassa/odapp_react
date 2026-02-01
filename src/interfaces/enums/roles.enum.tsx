export const roleTypes = {
    admin: "admin",
    medic: "medic",
    stake_holder: "stake_holder"
} as const;

export type roleTypes = typeof roleTypes[keyof typeof roleTypes];