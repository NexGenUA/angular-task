import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostsComponent } from './components/posts/posts.component';



@NgModule({
  declarations: [HomeComponent, PostComponent, NavbarComponent, PostsComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressBarModule
  ]
})
export class HomeModule {
}
