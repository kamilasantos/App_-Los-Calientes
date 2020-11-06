import { Directive, HostListener, Input } from '@angular/core';
import { App } from 'ionic-angular';

@Directive({
  selector: '[go-page]' // Attribute selector
})
export class GoPageDirective {

  @Input('go-page') goPage: string;
  @Input('go-root') root: boolean;
  @Input('go-params') params: any;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public appCtrl: App
) {
    this.pages = [
      { title: 'login', component: 'LoginPage' },
      { title: 'reset-password', component: 'ResetPasswordPage' },
      { title: 'settings', component: 'SettingsPage' },
      { title: 'register', component: 'RegisterPage' },
      { title: 'profile', component: 'ProfilePage' },
      { title: 'search', component: 'SearchPage' },
    ];
  }

  @HostListener('click') click() {
    let page = this.pages.filter((val) => {
      return val.title == this.goPage;
    });

    if(this.root) {
      this.appCtrl.getRootNav().setRoot(page[0].component);
    }else {
      this.appCtrl.getRootNav().push(page[0].component);
    }
  }

}
