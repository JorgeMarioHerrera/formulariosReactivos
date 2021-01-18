import { ReactiveComponent } from './componentes/reactive/reactive.component';
import { TemplateComponent } from './componentes/template/template.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'template', component: TemplateComponent},
  {path: 'reactivo', component: ReactiveComponent},
  {path: '**', pathMatch: 'full',  redirectTo: 'template'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
