import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { RestaurantDetailsComponent } from './restaurants/restaurant-details/restaurant-details.component';
import { RestaurantListComponent } from './restaurants/restaurant-list/restaurant-list.component';
import { ImageDetailsComponent } from './restaurants/image-details/image-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantDetailsComponent,
    RestaurantListComponent,
    ImageDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
