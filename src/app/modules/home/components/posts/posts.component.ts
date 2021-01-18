import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ApiService } from '../../../../shared/services/api.service';
import { Post } from '../../../../shared/models/post.model';
import { PageEvent } from '@angular/material/paginator';
import { QueryParams } from '../../../../shared/models/query.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnDestroy {
  private readonly POSTS_LIMIT = 100;
  private readonly DEFAULT_START = 0;
  private readonly DEFAULT_LIMIT = 5;
  private readonly pagination$: Subject<QueryParams> = new Subject<QueryParams>();

  posts$: Observable<Post[]> = new Observable<Post[]>();
  length = this.POSTS_LIMIT;
  pageSize = this.DEFAULT_LIMIT;
  pageSizeOptions: number[] = [5, 10, 25];
  pageIndex: number;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let { start, limit } = this.route.snapshot.queryParams;

    if ((Number.isNaN(+start) || Number.isNaN(+limit)) || +start >= this.POSTS_LIMIT) {
      start = this.DEFAULT_START;
      limit = this.DEFAULT_LIMIT;
    }

    start = +start;
    limit = +limit;

    this.pageSize = limit;
    this.pageIndex = start / limit;

    this.pagination$
      .pipe(
        debounceTime(750),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(query => {
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: { start: query.start, limit: query.limit },
          }).then(() => {
          this.posts$ = this.apiService.getLimitPosts(query.start, query.limit);
        });
      });
    this.pagination$.next({ start, limit });
  }

  pageEvent(event: PageEvent): void {
    const limit = event.pageSize;
    const start = event.pageIndex * limit;
    this.pageSize = limit;
    this.pageIndex = start / limit;
    this.pagination$.next({ start, limit });
  }

  ngOnDestroy(): void {
    this.pagination$.unsubscribe();
  }
}
