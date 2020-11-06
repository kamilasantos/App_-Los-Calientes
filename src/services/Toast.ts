import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable()

/**
 * Classe Service responsável por mostrar os toasts para o usuário.
 * @author  Matheus Martins
 * @since   01/08/2018
 */
export class Toast {
  constructor(private toastCtrl: ToastController) {}

  /**
   * @public
   * Mostra um toast para o usuário
   * @param {string} message Mensagem que será mostrada no toast
   * @param {number} duration Duração em milisegundos que o toast ficará na tela
   * @param {string} position Posição em que o toast aparecerá na tela
   */
  public showToast(
    message: string,
    duration?: number,
    position?: string
  ): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration || 3000,
      position: position || "middle"
    });
    toast.present();
  }
}
