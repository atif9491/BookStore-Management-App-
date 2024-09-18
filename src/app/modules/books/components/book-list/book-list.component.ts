import { Component, OnInit } from '@angular/core';
import { Book } from "../../services/book.model";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule, RouterLink,SharedModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  books!: Book[];

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
    // Retrieve the book data from localStorage
    const storedBooks = localStorage.getItem('addbookdata');

    if (storedBooks) {
      // Parse the data and ensure it is an array
      this.books = JSON.parse(storedBooks);

      // Check if it is an array
      if (!Array.isArray(this.books)) {
        this.books = [];  // Fallback to empty array if not an array
      }
    }
  }
}

 deletebook(book:Book){
  const index=this.books.findIndex(b=>b.id ===book.id);

  if (index !== -1) {
    // Remove the book from the books array
    this.books.splice(index, 1);
    // Update the localStorage with the modified books array
    localStorage.setItem('addbookdata', JSON.stringify(this.books));
  }
 }

}










