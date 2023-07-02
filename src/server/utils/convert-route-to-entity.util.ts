const mapping: Record<string, string> = {
  analysts: 'analyst',
  customers: 'customer',
  organizations: 'organization',
  traders: 'trader',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
