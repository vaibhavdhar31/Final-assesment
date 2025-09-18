import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.component.html'
})
export class EmployeeAddComponent {
  employeeForm: FormGroup;
  submitting = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    public router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      salary: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.submitting = true;
      this.error = null;

      this.employeesService.create(this.employeeForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/employees']);
          }, 1500);
        },
        error: (error) => {
          this.error = 'Failed to create employee';
          this.submitting = false;
          console.error('Error creating employee:', error);
        }
      });
    }
  }

  get name() { return this.employeeForm.get('name'); }
  get address() { return this.employeeForm.get('address'); }
  get salary() { return this.employeeForm.get('salary'); }
}
