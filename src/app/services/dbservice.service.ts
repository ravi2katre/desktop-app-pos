import { Injectable } from '@angular/core';
import {ElectronService} from 'ngx-electron';
@Injectable()
export class DbserviceService {

  constructor( private _electronService: ElectronService) {
      if (this._electronService.isElectronApp) {
          this.electron_renderer_methods();
      }
  }
  call(action, args) {
      if (this._electronService.isElectronApp) {
          return this.electron_services(action, args);
      } else {
          this.web_services(action, args);
      }
  }

  electron_renderer_methods() {
      this._electronService.ipcRenderer.on('pong', function(event, arg) {
          console.log('called pong function');
      });
  }
  electron_services(action, args) {
      console.log('Electron service action:' + action);
      let result: any ;
      switch (action) {

          case 'DbService':
              result = this._electronService.ipcRenderer.sendSync('DbService', args);
              // console.log(result);

              break;
          default:
              result = this._electronService.ipcRenderer.sendSync(action);
              console.log(result);
              break;

      }

      return result;
  }

  web_services(action, args) {
        console.log('Web service action:' + action);
      switch (action) {

          case 'DbService':
              console.log(args);
              break;
          default:
              console.log(args);
              break;

      }
  }
}
