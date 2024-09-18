import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';

const route: Routes = [
  { path: '', component: BookListComponent },          // Route for the book list page
  { path: 'add', component: AddBookComponent },         // Route for adding a new book
  { path: 'edit/:id', component: EditBookComponent },   // Route for editing a book
  { path: ':id', component: BookDetailsComponent }      // Route for viewing book details
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
  ],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
