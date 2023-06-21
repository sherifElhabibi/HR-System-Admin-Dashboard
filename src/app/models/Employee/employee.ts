export class Employee {
  constructor(
    public emplyeeId:  number,//*   remove 
    public employeeFirstName: string,
    public employeeLastName: string,
    public employeeSalaryPerHour: number,
    public employeeOvertimeRate: number,
    public employeeRegularHoursPerDay: number,
    public employeeWorkingDaysPerWeek: number,
    public employeeProfileUrl: string,
    public employeePhone: string,
    public employeeEmail: string,
    public employeePosition: string,
    public employeeHiringDate: string,
    public employeeStatus: number,
    public departmentId?: number,
    public employeeId?: number,//*  edit new
    public totalHoursSpent?: number,
    public totalCost?: number,
  ) {}
  }
  