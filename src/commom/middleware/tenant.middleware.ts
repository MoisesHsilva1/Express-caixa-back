import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validateTenantId } from 'src/utils/validate-tenant-id';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string;

    validateTenantId(tenantId);

    req['tenantId'] = tenantId;
    next();
  }
}
