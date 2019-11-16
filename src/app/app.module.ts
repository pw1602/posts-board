import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UsersComponent } from '@pages/users/users.component';
import { DataService } from '@shared/services/data.service';
import { MainNavigationComponent } from '@core/components/main-navigation/main-navigation.component';
import { UserActionsComponent } from '@pages/users/user-actions/user-actions.component';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { AddUserComponent } from '@core/components/add-user/add-user.component';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { UserInfoComponent } from '@pages/user-info/user-info.component';
import { AddPostComponent } from './shared/components/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    MainNavigationComponent,
    UserActionsComponent,
    AddUserComponent,
    ErrorMessageComponent,
    UserInfoComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    DialogModule,
    InputTextareaModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    SelectButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DataViewModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DataService, MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
