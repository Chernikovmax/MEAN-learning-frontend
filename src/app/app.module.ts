import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PostsComponent} from './components/post/posts.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {PostCreationComponent} from './components/post-creation/post-creation.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmailRecipientsComponent} from "./components/email-recipients/email-recipients.component";
import {ChipComponent} from "./components/chip/chip.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {EmailSchedulesComponent} from './components/email-schedules/email-schedules.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostCreationComponent,
    EmailRecipientsComponent,
    ChipComponent,
    EmailSchedulesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
