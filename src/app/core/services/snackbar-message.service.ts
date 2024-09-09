import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  private showMessage(message: string, config: MatSnackBarConfig) {
    this.snackBar.open(message, null, config);
  }

  error(message: string, duration: number = 3000) {
    const config = this.getConfig('background-danger', duration);
    this.showMessage(message, config);
  }

  success(message: string, duration: number = 3000) {
    const config = this.getConfig('background-success', duration);
    this.showMessage(message, config);
  }

  warning(message: string, duration: number = 3000) {
    const config = this.getConfig('background-warning', duration);
    this.showMessage(message, config);
  }

  private getConfig(color: string, duration: number): MatSnackBarConfig {
    return {
        panelClass: color,
        duration: duration,
        verticalPosition: "top",
        horizontalPosition: "center"
    };
  }
}