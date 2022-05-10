import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { BlogsComponentComponent } from './blogs-component/blogs-component.component';
import { CreateBlogComponentComponent } from './create-blog-component/create-blog-component.component';
import { ForumsComponentComponent } from './forums-component/forums-component.component';
import { ContactusComponentComponent } from './contactus-component/contactus-component.component';
import { SidenavComponentComponent } from './sidenav-component/sidenav-component.component';
import { PostMethodComponent } from './post-method/post-method.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComp } from './material.module';
import { BlogService } from './services/blog.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostMethodService } from './post-method/post-method.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { FilterPipe } from './filter/filter.pipe';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DialogOverviewExampleDialog } from './dialog-overview-example/dialog-overview-example.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    HeaderComponentComponent,
    BlogsComponentComponent,
    CreateBlogComponentComponent,
    ForumsComponentComponent,
    ContactusComponentComponent,
    SidenavComponentComponent,
    DialogExampleComponent,
    FilterPipe,
    DialogOverviewExampleDialog
  ],
  entryComponents:[DialogExampleComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComp,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
    
  ],
  providers: [BlogService, PostMethodService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
