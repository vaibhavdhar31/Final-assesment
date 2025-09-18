import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EmployeeAddComponent } from './employee-add.component';
import { EmployeesService } from './employees.service';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAddComponent;
  let fixture: ComponentFixture<EmployeeAddComponent>;
  let mockEmployeesService: jasmine.SpyObj<EmployeesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const employeesServiceSpy = jasmine.createSpyObj('EmployeesService', ['create']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EmployeeAddComponent],
      providers: [
        { provide: EmployeesService, useValue: employeesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAddComponent);
    component = fixture.componentInstance;
    mockEmployeesService = TestBed.inject(EmployeesService) as jasmine.SpyObj<EmployeesService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create employee on valid form submission', () => {
    const mockEmployee = { id: 1, name: 'John Doe', address: '123 St', salary: 50000 };
    mockEmployeesService.create.and.returnValue(of(mockEmployee));

    component.employeeForm.patchValue({
      name: 'John Doe',
      address: '123 St',
      salary: 50000
    });

    component.onSubmit();

    expect(mockEmployeesService.create).toHaveBeenCalled();
    expect(component.success).toBeTrue();
  });

  it('should handle error on form submission', () => {
    mockEmployeesService.create.and.returnValue(throwError(() => new Error('API Error')));

    component.employeeForm.patchValue({
      name: 'John Doe',
      address: '123 St',
      salary: 50000
    });

    component.onSubmit();

    expect(component.error).toBe('Failed to create employee');
    expect(component.submitting).toBeFalse();
  });
});
