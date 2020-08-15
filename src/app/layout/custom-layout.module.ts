import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { LayoutModule } from '@angular/cdk/layout';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const materials = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatCardModule
];

const components = [
  NavbarComponent,
  FooterComponent
];

const modules = [
  RouterModule,
  HttpClientModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ...materials,
    ...modules
  ],
  exports: [
    ...components,
    ...materials,
    ...modules
  ]
})
export class CustomLayoutModule { }
