export const steps = [
  {
    value: "personal",
    title: "Informations personnelles",
    description: "Nom, sexe, date de naissance",
    fields: ["firstName", "lastName", "birthDate", "sex"] as const,
  },
  {
    value: "contact",
    title: "Informations de contact",
    description: "Email, téléphone, adresse",
    fields: ["email", "phoneNumber", "address"] as const,
  },
  {
    value: "security",
    title: "Sécurité du compte",
    description: "Mot de passe d'accès",
    fields: ["password"] as const,
  },
];
