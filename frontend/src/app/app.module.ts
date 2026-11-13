import {
  NgModule,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { App } from './app.component';
import { EmpleadosComponent } from './empleados/empleados.component';

@NgModule({
  declarations: [
    App,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule {}