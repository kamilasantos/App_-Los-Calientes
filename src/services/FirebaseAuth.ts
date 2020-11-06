import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database-deprecated";

import { Toast } from "../services/Toast";
import { OneSignal } from "@ionic-native/onesignal";

@Injectable()

/**
 * Classe responsável por fazer autenticacao do usuário.
 * @author  Matheus Martins
 * @since   18/09/2018
 */
export class FirebaseAuth {
  user: any;
  usersFirebase: FirebaseListObservable<any[]> = this.af.list("/Users");
  constructor(
    private storage: Storage,
    private afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    private toast: Toast,
    private oneSignal: OneSignal
  ) {}

  public addDocument(document: any) {
    return new Promise<any>((resolve) => {
      let newDocument = this.af.list("/Users").push(document);
      newDocument.update({
        id: newDocument.key
      });
      resolve();
    });
  }

  setLoggedUser(user: any) {
    this.user = user;
  }

  getLoggedUser() {
    return this.user;
  }

  getUserByEmail(email: string) {
    this.usersFirebase.subscribe((response) => {
      for (let index in response) {
        if (response[index].email == email) {
          this.setLoggedUser(response[index]);
          this.storage.set("user", response[index]);
          this.setLoggedUser(response[index]);
          this.storage.set("user", response[index]);
          break;
        }
      }
    });
  }

  /**
   * @public
   * Loga usuário com email e senha
   * @param {string} email Email do usuário
   * @param {string} password Senha do usuário
   * @returns {Promise<any>} Usuário logado
   */
  public loginWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<any> =>
    new Promise<any>((resolve) =>
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          if (data.emailVerified) resolve(data.email);
          else
            this.toast.showToast("Por favor verifique o email antes de logar.");
        })
        .catch((err) => console.log(err.message))
    );

  /**
   * @public
   * Faz logout no aplicativo
   * @returns {Promise<any>} Retorno da requisicao
   */
  public logout = (): Promise<any> =>
    new Promise<any>((resolve) =>
      this.afAuth.auth.signOut().then(() =>
        this.storage
          .clear()
          .then(() => resolve())
          .catch((err) => console.log(err.message))
      )
    );

  /**
   * @public
   * Cria o usuário com email e senha
   * @param {string} email Email do usuário
   * @param {string} password Senha do usuário
   * @returns {Promise<any>} Usuário cadastrado
   */
  public register(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve) =>
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.sendVerificationEmail(this.afAuth.auth.currentUser);
          resolve();
        })
        .catch((err) => console.log(err.message))
    );
  }

  /**
   * @public
   * Envia um email de verificacao para o usuário
   * @param {any} user Usuário a ser verificado
   * @returns {Promise<any>} Usuário cadastrado
   */
  public sendVerificationEmail = (user: any): Promise<any> =>
    user.sendEmailVerification();
}
