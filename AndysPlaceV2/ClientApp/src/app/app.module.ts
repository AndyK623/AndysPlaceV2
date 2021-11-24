import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './aboutMe/about-me.component';
import { CrudComponent } from './crud/crud.component';
import { DeleteDialogComponent } from './crud/delete-dialog.component';
import { EditCreateComponent } from './crud/edit-create.component';
import { ContactComponent } from './contact/contact.component';
import { ChartsComponent } from './charts/charts.component';

import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AboutMeComponent,
    CrudComponent,
    DeleteDialogComponent,
    EditCreateComponent,
    ContactComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxEchartsModule.forRoot({ echarts })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
