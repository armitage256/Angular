import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// add imports
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // add import
    FormsModule, // add import
    BrowserAnimationsModule, // add import
    ToastrModule.forRoot() // add import
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
