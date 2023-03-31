// create employee record
function createEmployeeRecord(array) {
    const [firstName, familyName, title, payPerHour] = array;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
//createTimeInEvent
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date,
    });
    return employeeRecord;
  }
//createTimeOutEvent
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date,
    });
    return employeeRecord;
  }
  //hoursWorkedOnDate
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find((event) => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  //wagesEarnedOnDate
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payOwed = hoursWorked * employeeRecord.payPerHour;
    return payOwed;
  }
  //allWagesFor
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((acc, date) => {
      const wagesForDate = wagesEarnedOnDate(employeeRecord, date);
      return acc + wagesForDate;
    }, 0);
    return totalWages;
  }
// calculate payroll
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((acc, employee) => {
      const employeePay = allWagesFor(employee);
      return acc + employeePay;
    }, 0);
    return totalPayroll;
  }
  
  