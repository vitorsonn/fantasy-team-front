import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppNotification, NotificationService, NotificationType } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  public readonly notifications$: Observable<AppNotification[]>;

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationService.notifications$;
  }

  dismiss(id: number): void {
    this.notificationService.dismiss(id);
  }

  getContainerClass(type: NotificationType): string {
    const classes: Record<NotificationType, string> = {
      success: 'border-emerald-500/50 bg-emerald-950/95 text-emerald-50',
      error: 'border-red-500/50 bg-red-950/95 text-red-50',
      warning: 'border-amber-500/50 bg-amber-950/95 text-amber-50',
      info: 'border-sky-500/50 bg-sky-950/95 text-sky-50',
    };

    return classes[type];
  }

  getBadgeClass(type: NotificationType): string {
    const classes: Record<NotificationType, string> = {
      success: 'bg-emerald-400 text-emerald-950',
      error: 'bg-red-400 text-red-950',
      warning: 'bg-amber-400 text-amber-950',
      info: 'bg-sky-400 text-sky-950',
    };

    return classes[type];
  }

  getBadgeText(type: NotificationType): string {
    const texts: Record<NotificationType, string> = {
      success: 'OK',
      error: '!',
      warning: '!',
      info: 'i',
    };

    return texts[type];
  }

  trackById(_index: number, notification: AppNotification): number {
    return notification.id;
  }
}
