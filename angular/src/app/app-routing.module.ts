import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponentComponent } from './blogs-component/blogs-component.component';
import { ContactusComponentComponent } from './contactus-component/contactus-component.component';
import { CreateBlogComponentComponent } from './create-blog-component/create-blog-component.component';
import { ForumsComponentComponent } from './forums-component/forums-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { PostMethodComponent } from './post-method/post-method.component';
import { PostMethodService } from './post-method/post-method.service';

const routes: Routes = [
  { path:"creatingBlog", component: CreateBlogComponentComponent},
  {path:'home',component:HomeComponentComponent},
  {path:'blogs',component:BlogsComponentComponent},
  {path:'contactUs',component:ContactusComponentComponent},
  {path: 'forums', component:PostMethodComponent},
  {path:'contact', component:ContactusComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
