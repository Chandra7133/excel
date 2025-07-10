import { Routes } from '@angular/router';

export const routes: Routes = [
 {path:"",redirectTo:"layout",pathMatch:"full"},
 {path:"layout",loadChildren:()=>import("./layout/layout.routes").then((c)=>c.layoutRoutes)}
];
