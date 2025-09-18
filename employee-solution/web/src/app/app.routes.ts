import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { 
    path: 'employees', 
    loadComponent: () => import('./employees/employees-list.component').then(m => m.EmployeesListComponent)
  },
  { 
    path: 'employees/add', 
    loadComponent: () => import('./employees/employee-add.component').then(m => m.EmployeeAddComponent)
  }
];
