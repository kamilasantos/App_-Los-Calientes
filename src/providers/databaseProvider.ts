import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { OneSignal } from '@ionic-native/onesignal';
import { resolveDefinition } from '@angular/core/src/view/util';


declare var google;
@Injectable()

export class DatabaseProvider {

searchParams: any;
foundUsers: any = [];

  constructor(public af: AngularFireDatabase, private oneSignal: OneSignal) {
    let search: Array<{ price: number, distance: number, category: string, case: string }> = [
      {price: 2000, distance: 200, category: 'civil', case: 'I have a case. Can you help me?'}
    ];
    this.setSearchParams(search);
  }

  updateLocation(id: string,latitude: number, longitude: number) {
    return new Promise((resolve, reject) => {
      let users = this.af.list('/Users');

      users.update(id, {
        latitude: latitude,
        longitude: longitude
      });

      resolve();
    })
  }

  setSearchParams(searchParams: any) {
    return new Promise((resolve) => {
      this.searchParams = searchParams;
      resolve();
    })
  }

  searchUsers(userLocation: any, id: string) {
    return new Promise((resolve,reject) => {
      let users = this.af.list('/Users');
      this.foundUsers = [];
    
      if (this.searchParams == undefined) {
        users.subscribe(response => {
          for (let item in response) {
            if (response[item].id != id) {
              this.foundUsers.push(response[item]);
            }
          }
        });
      } else {
        users.subscribe(response => {
          for (let item in response) {
            if (response[item].id != id && response[item].price <= this.searchParams[0].price 
              && response[item].category == this.searchParams[0].category) {
                this.foundUsers.push(response[item]);
            }
          }
        });
      }
      resolve(this.foundUsers);
    })
  }

  updateImg(id: string, img: String) {
    let users = this.af.list('/Users');

    users.update(id, {
      img: img
    });
  }

  sendCase(user: any, oneSignalId: string) {
    let notificationObj: any = {
      headings: {en: "New Case"},
      contents: {en: this.searchParams[0].case},
      include_player_ids: [oneSignalId],
      data: { page: 'CasePage', sender: user, case: this.searchParams[0].case}
    };
  
    this.oneSignal.postNotification(notificationObj).then((success) => {
      
    }).catch((error) => {
      
    });   
  }

  sendResponse(user: any, oneSignalId: string, response: string) {
    let notificationObj: any = {
      headings: {en: "Lawyer Response"},
      contents: {en: user.name + " " + response + ' your case.'},
      include_player_ids: [oneSignalId],
      data: { page: 'HomePage'}
    };
  
    this.oneSignal.postNotification(notificationObj).then((success) => {
      
    }).catch((error) => {
      
    });   
  }

  agreeProject(user: any) {
    return new Promise((resolve,reject) => {
      let users = this.af.list('/Users');

      let casesAccepted = parseInt(user.casesAccepted);
      casesAccepted++;
  
      users.update(user.id, {
        casesAccepted: casesAccepted
      });

      resolve();
    })
  }

  declineProject(user: any) {
    return new Promise((resolve,reject) => {
      let users = this.af.list('/Users');

      let casesDeclined = parseInt(user.casesAccepted);
      casesDeclined++;

      users.update(user.id, {
        casesDeclined: casesDeclined
      });

      resolve();
    })
  }
}
