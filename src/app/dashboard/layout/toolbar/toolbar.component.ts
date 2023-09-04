import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { User } from '../../pages/users/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAuthUser,
  selectIsAdmin,
} from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Input()
  public drawer?: MatDrawer;
  public isAdmin$: Observable<boolean>;

  public authUser$: Observable<User | null>;

  constructor(private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }
}
