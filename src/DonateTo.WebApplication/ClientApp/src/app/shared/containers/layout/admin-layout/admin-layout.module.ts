import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';

import { HeartOutline, ProfileOutline, StarOutline, TeamOutline } from '@ant-design/icons-angular/icons';

import {
  NzButtonModule,
  NzDividerModule,
  NzEmptyModule,
  NzIconModule,
  NzLayoutModule,
  NzMenuModule,
  NzTableModule,
} from 'ng-zorro-antd';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/shared/components';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { OrganizationComponent } from '../../../../admin/organization/organization.component';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const ICONS: IconDefinition[] = [HeartOutline, TeamOutline, ProfileOutline, StarOutline];

@NgModule({
  imports: [
    NzIconModule.forChild(ICONS),
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzDividerModule,
    NzTableModule,
    NzEmptyModule,
    AdminLayoutRoutingModule,
    CommonModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
    }),
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [AdminLayoutComponent, OrganizationComponent],
})
export class AdminLayoutModule {}
