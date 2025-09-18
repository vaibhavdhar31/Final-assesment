export interface Employee {
  id: number;
  name: string;
  address: string;
  salary: number;
}

export interface EmployeeCreate {
  name: string;
  address: string;
  salary: number;
}
