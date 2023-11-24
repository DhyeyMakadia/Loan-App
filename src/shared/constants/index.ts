export const StatusCode = {
  Success: 200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  InternalServer: 500,
};

export const LoanAmountMarks = [
  {
    value: 50000,
    label: "50000",
  },
  {
    value: 100000,
    label: "100000",
  },
  {
    value: 150000,
    label: "150000",
  },
  {
    value: 200000,
    label: "200000",
  },
];

export enum Steps {
  PersonalDetails = 1,
  BankDetails = 2,
  LoanDetails = 3,
  LoanSuccess = 4,
}