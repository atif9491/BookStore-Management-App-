import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem} from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MenubarModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bookstore-management-app';
  constructor() {}

  ngOnInit(): void {
  }
  items: MenuItem[]= [
    {
      icon: 'pi pi-bars',
      label: 'Book List',
      routerLink: ['/books']
    },
    {
      icon: 'pi pi-file-plus',
      label: 'Add Book',
      routerLink: ['/books/add']
    },
    {
      icon: 'pi pi-pencil',
      label: 'Edit Book',
      routerLink: ['/books/edit/:id']  // Example ID, replace as needed
    },
    {
      icon: 'pi pi-info-circle',
      label: 'Book Details',
      routerLink: ['/books/:id']  // Example ID, replace as needed
    }
  ];
}
