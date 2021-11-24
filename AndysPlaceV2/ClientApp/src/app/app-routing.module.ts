import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './aboutMe/about-me.component';
import { CrudComponent } from './crud/crud.component';
import { EditCreateComponent } from './crud/edit-create.component';
import { ContactComponent } from './contact/contact.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "AboutMe", component: AboutMeComponent, pathMatch: "full" },
  { path: "Crud", component: CrudComponent, pathMatch: "full" },
  { path: "Customer", component: EditCreateComponent, pathMatch: "full"},
  { path: "Customer/:id", component: EditCreateComponent, pathMatch: "full" },
  { path: "Contact", component: ContactComponent, pathMatch: "full" },
  { path: "Charts", component: ChartsComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



