export class GetEmployeeById {
    constructor(
      public employeeFirstName: string,
      public employeeLastName: string,
      public employeeSalaryPerHour: number,
      public employeeOverTime: number,
      public employeeSalary: number,
      public employeeOvertimeRate: number,
      public employeeRegularHoursPerDay: number,
      public employeeWorkingDaysPerWeek: number,
      public employeeProfileUrl: string,
      public employeePhone: string,
      public employeeEmail: string,
      public employeePosition: string,
      public employeeHiringDate: string,
      public employeeStatus: string,
      public departmentId?: number
    ) {}
  }