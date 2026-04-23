import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    
    const user = req.user;
    const targetId = req.params.id;
    const targetOwnerId = req.query.ownerId;

    const isOwner = user.sub === targetId || user.sub === targetOwnerId;
    const isAdmin = user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You are not the owner of this user');
    }

    return true;
  }
}