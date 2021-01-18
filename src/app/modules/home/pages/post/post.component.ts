import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { concatMap, map } from 'rxjs/operators';
import { Observable, of, zip } from 'rxjs';

import { ApiService } from '../../../../shared/services/api.service';
import { DetailsPost } from '../../../../shared/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  private readonly postId: string;
  private readonly POSTS_LIMIT = 100;

  isInvalidPostId = false;
  details$: Observable<DetailsPost> = new Observable<DetailsPost>();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.postId = this.route.snapshot.params.id;

    if (+this.postId < 0 || +this.postId > this.POSTS_LIMIT) {
      this.isInvalidPostId = true;
    } else {
      this.details$ = this.apiService.getPostById(this.postId)
        .pipe(
          concatMap(res => {
            return zip(
              of(res),
              this.apiService.getCommentsByPostId(res.id.toString()),
              this.apiService.getUserById(res.userId.toString())
            );
          }),
          map(([post, comments, user]) => ({ post, comments, user }))
        );
    }

  }
}
