export const validateTenantId = (tenantId: string) => {
  if (!tenantId) {
    throw new Error('Tenant ID is required');
  }
};
