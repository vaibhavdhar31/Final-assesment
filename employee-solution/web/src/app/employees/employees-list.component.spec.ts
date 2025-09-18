import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { EmployeesListComponent } from './employees-list.component';
import { EmployeesService } from './employees.service';
import { Employee } from '../shared/models/employee.model';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;
  let mockEmployeesService: jasmine.SpyObj<EmployeesService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('EmployeesService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [EmployeesListComponent],
      providers: [
        { provide: EmployeesService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    mockEmployeesService = TestBed.inject(EmployeesService) as jasmine.SpyObj<EmployeesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees on init', () => {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'John Doe', address: '123 St', salary: 50000 }
    ];
    mockEmployeesService.getAll.and.returnValue(of(mockEmployees));

    component.ngOnInit();

    expect(component.employees).toEqual(mockEmployees);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading employees', () => {
    mockEmployeesService.getAll.and.returnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();

    expect(component.error).toBe('Failed to load employees');
    expect(component.loading).toBeFalse();
  });
});
