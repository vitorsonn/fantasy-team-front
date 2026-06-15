import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface AppNotification {
  id: number;
  type: NotificationType;
  message: string;
  title?: string;
  durationMs: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  private nextId = 1;

  public readonly notifications$ = this.notificationsSubject.asObservable();

  success(message: string, title = 'Sucesso'): void {
    this.show('success', message, title);
  }

  error(message: string, title = 'Erro'): void {
    this.show('error', message, title, 6000);
  }

  warning(message: string, title = 'Atencao'): void {
    this.show('warning', message, title);
  }

  info(message: string, title = 'Info'): void {
    this.show('info', message, title);
  }

  dismiss(id: number): void {
    this.notificationsSubject.next(
      this.notificationsSubject.value.filter((notification) => notification.id !== id),
    );
  }

  private show(
    type: NotificationType,
    message: string,
    title?: string,
    durationMs = 4000,
  ): void {
    const notification: AppNotification = {
      id: this.nextId++,
      type,
      message,
      title,
      durationMs,
    };

    this.notificationsSubject.next([...this.notificationsSubject.value, notification]);

    window.setTimeout(() => {
      this.dismiss(notification.id);
    }, durationMs);
  }
}
