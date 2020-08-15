import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
  template: ''
})
export abstract class EpisodeAbstractComponent implements OnInit, OnDestroy {

  loading: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    protected iziToast: Ng2IzitoastService
  ) { }

  abstract ngOnInit(): void;

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleError(error: HttpErrorResponse): void {
    this.iziToast.warning({
      position: 'bottomRight',
      timeout: 5000,
      title: error.status.toString(),
      message: error.message
    });
    this.loading = false;
  }
}
