export interface ReportBalance {
  execute(tenantId: string): Promise<number>;
}
