import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesActions } from './store/categories.actions';
import { Observable } from 'rxjs';
import { Category } from './models';
import { selectCategoriesArray } from './store/categories.selectors';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [],
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  public isAdmin$: Observable<boolean>;

  constructor(private store: Store) {
    this.categories$ = this.store.select(selectCategoriesArray);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  displayedColumns = ['id', 'name', 'actions'];

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.loadCategories());
  }
}
