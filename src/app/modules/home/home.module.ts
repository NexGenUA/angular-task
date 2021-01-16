import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { PostsComponent } from './components/posts/posts.component';


@NgModule({
  declarations: [HomeComponent, PostComponent, NavbarComponent, PostsComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
