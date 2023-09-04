import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../categories/models';
import { selectCategoriesArray } from '../categories/store/categories.selectors';
import { CategoriesActions } from '../categories/store/categories.actions';
import { ProductService } from '../products/product.service';
import { selectSales } from '../sales/store/sale.selectors';
import { SaleActions } from '../sales/store/sale.actions';
import { SaleWithProductAndBuyer } from '../sales/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sales$: Observable<SaleWithProductAndBuyer[]>;
  verInscripciones = false;
  numeroInscripciones = 0;

  constructor(private store: Store) {
    this.sales$ = this.store.select(selectSales);
  }

  ngOnInit(): void {}

  verNumeroInscripciones() {
    console.log('funcion verNumeroInscripciones');
    this.store.dispatch(SaleActions.loadSales());
    this.verInscripciones = true;
    this.sales$.subscribe((le) => {
      console.log('numero de inscripciones .... ', le.length);
      this.numeroInscripciones = le.length;
    });
  }
}
