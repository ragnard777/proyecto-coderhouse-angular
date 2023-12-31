import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Product } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  loadProducts(): void {
    // fetch ...
    /// .then((data) => this.products$.next(data))
    this.products$.next([
      {
        id: 1,
        name: 'Angular',
        description: 'lorem ipsum',
        price: 800000,
        stock: 50,
        categoryId: 1,
      },
      {
        id: 2,
        name: 'Scrum master',
        description: 'lorem ipsum',
        price: 1400000,
        stock: 25,
        categoryId: 1,
      },
      {
        id: 3,
        name: 'Product Manager',
        description: 'lorem ipsum',
        price: 1800000,
        stock: 15,
        categoryId: 1,
      },
    ]);
  }

  create(): void {
    this.products$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.products$.next([
          ...arrayActual,
          {
            id: arrayActual.length + 1,
            name: 'Random name',
            description: 'Random description',
            price: 5400,
            stock: 23,
            categoryId: 1,
          },
        ]);
      },
    });
  }

  deleteById(id: number): void {
    this.products$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.products$.next(arrayActual.filter((p) => p.id !== id));
      },
    });
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.baseApiUrl + `/products?categoryId=${categoryId}`
    );
  }
}
