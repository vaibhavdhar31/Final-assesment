import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeesService } from './employees.service';
import { Employee, EmployeeCreate } from '../shared/models/employee.model';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmployeesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all employees', () => {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'John Doe', address: '123 St', salary: 50000 }
    ];

    service.getAll().subscribe(employees => {
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('http://localhost:5001/api/employee');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should create employee', () => {
    const newEmployee: EmployeeCreate = { name: 'Jane Doe', address: '456 Ave', salary: 60000 };
    const createdEmployee: Employee = { id: 2, ...newEmployee };

    service.create(newEmployee).subscribe(employee => {
      expect(employee).toEqual(createdEmployee);
    });

    const req = httpMock.expectOne('http://localhost:5001/api/employee');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmployee);
    req.flush(createdEmployee);
  });
});
