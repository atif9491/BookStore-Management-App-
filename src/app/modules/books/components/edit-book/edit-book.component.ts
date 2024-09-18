import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { Book } from '../../services/book.model';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';  // Import PrimeNG MessageService
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';



@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,InputTextModule,InputTextareaModule,SharedModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
  providers: [MessageService]  // Provide the MessageService
})
export class EditBookComponent implements OnInit {
  books!: Book[];
  editForm!: FormGroup;
  currentBook: Book | null = null;
   isEditing=false;


  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,        // Inject Angular Router for redirection
    private messageService: MessageService  // Inject MessageService for toast notifications
  ) {}

  ngOnInit(): void {
    const storedBooks = localStorage.getItem('addbookdata');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }

    // Initialize the edit form
    this.editForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern('[0-9].*')]),
      pbdate: new FormControl('', [Validators.required,Validators.pattern('[0-9].*'),
        Validators.maxLength(8)
      ]),
      desc: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });

    // Get the book ID from the route and load the book data
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.loadBookDetails(bookId);
    }
  }

  loadBookDetails(bookId: string) {
    const book = this.books.find(b => b.id.toString() === bookId); // Compare as strings
    if (book) {
      this.editForm.patchValue(book);
      this.currentBook = book;
    }
  }

  // Save the edited details
  saveBook() {
    if (this.currentBook && this.editForm.valid) {
      const index = this.books.findIndex(b => b.id === this.currentBook?.id);

      if (index !== -1) {
        // Update the book details
        this.books[index] = { ...this.currentBook, ...this.editForm.getRawValue() };
        // Show success message
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Book has been updated!'});

        // Redirect to book list after 2 seconds to show the toast
        setTimeout(() => {
          this.router.navigate(['/books']);  // Adjust the route as per your app's book list path
        }, 20);

        // Save to localStorage
        localStorage.setItem('addbookdata', JSON.stringify(this.books));
      }

    }
  }
cancelEdit() {
  this.editForm.reset();
 // Redirect to book list after 2 seconds to show the toast
 setTimeout(() => {
  this.router.navigate(['/books']);  // Adjust the route as per your app's book list path
}, 20);

}
get id(): FormControl {
  return this.editForm.get('id') as FormControl;
}

get title(): FormControl {
  return this.editForm.get('title') as FormControl;
}

get author(): FormControl {
  return this.editForm.get('author') as FormControl;
}


get genre(): FormControl {
  return this.editForm.get('genre') as FormControl;
}

get price(): FormControl {
  return this.editForm.get('price') as FormControl;
}

get pbdate(): FormControl {
  return this.editForm.get('pbdate') as FormControl;
}


get desc(): FormControl {
  return this.editForm.get('desc') as FormControl;
}
}
