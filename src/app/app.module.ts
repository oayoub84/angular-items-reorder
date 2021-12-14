import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {
  TransitionGroupComponent,
  TransitionGroupItemDirective,
} from './transition-group.component';

@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    TransitionGroupItemDirective,
    TransitionGroupComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
