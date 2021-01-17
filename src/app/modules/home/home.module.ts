import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { PostsComponent } from './components/posts/posts.component';



@NgModule({
  declarations: [HomeComponent, PostComponent, NavbarComponent, PostsComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
  ]
})
export class HomeModule {
}
