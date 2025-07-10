import { Injectable } from '@angular/core';
declare global {
 interface Window {
   excelAPI: {
     getAll: () => Promise<any[]>;
     getById: (id: number) => Promise<any>;
     create: (data: any) => Promise<any>;
     update: (id: number, data: any) => Promise<any>;
     remove: (id: number) => Promise<boolean>;
   };
 }
}

@Injectable({
  providedIn: 'root'
})
export class Excel {
 getAll() {
  return window.excelAPI.getAll();
}

getById(id: number) {
  return window.excelAPI.getById(id);
}

create(data: any) {
  return window.excelAPI.create(data);
}

update(id: number, data: any) {
  return window.excelAPI.update(id, data);
}

remove(id: number) {
  return window.excelAPI.remove(id);
}
}
