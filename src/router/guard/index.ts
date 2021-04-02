import router from '@/router';
import { createPermissionGuard } from './permissionGuard';
createPermissionGuard(router);
