import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';





@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, CommonModule, CardModule, InputTextModule, InputTextareaModule, CalendarModule,SharedModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',

})
export class AddBookComponent {
  addbookform = new FormGroup({
    id: new FormControl('', [Validators.required,
    Validators.maxLength(3),
    Validators.pattern('[0-9].*')
    ]),
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern('[0-9].*'),
    Validators.min(1), Validators.maxLength(4)
    ]),
    pbdate: new FormControl('', [Validators.required,Validators.pattern('[0-9].*'),
      Validators.maxLength(8)
    ]),
    desc: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  })

  constructor(private router: Router) {}



  addbook() {
    // Check if any form control value is an empty string
    const hasEmptyFields = Object.values(this.addbookform.controls).some(control => control.value === '');

    if (this.addbookform.invalid || hasEmptyFields) {
      this.addbookform.markAllAsTouched();
    } else {
      const bookData = this.addbookform.value;
      let storedBooks = JSON.parse(localStorage.getItem('addbookdata') || '[]');

      // Ensure storedBooks is an array before pushing
      if (!Array.isArray(storedBooks)) {
        storedBooks = []; // If it's not an array, initialize it to an empty array
      }

      // Push new book data to the array
      storedBooks.push(bookData);

      // Save the updated array back to localStorage
      localStorage.setItem('addbookdata', JSON.stringify(storedBooks));
      this.addbookform.reset();

              // Redirect to book list after 2 seconds to show the toast
              setTimeout(() => {
                this.router.navigate(['/books']);  // Adjust the route as per your app's book list path
              }, 20);
    }
  }

  get id(): FormControl {
    return this.addbookform.get('id') as FormControl;
  }

  get title(): FormControl {
    return this.addbookform.get('title') as FormControl;
  }

  get author(): FormControl {
    return this.addbookform.get('author') as FormControl;
  }


  get genre(): FormControl {
    return this.addbookform.get('genre') as FormControl;
  }

  get price(): FormControl {
    return this.addbookform.get('price') as FormControl;
  }

  get pbdate(): FormControl {
    return this.addbookform.get('pbdate') as FormControl;
  }


  get desc(): FormControl {
    return this.addbookform.get('desc') as FormControl;
  }


}

