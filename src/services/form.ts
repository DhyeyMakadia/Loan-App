import { AxiosResponse } from "axios";
import httpClient from "services/httpClient";

type AddFormRequest = {
  user_id: number;
  amount: number;
  disbursal: number;
  interest: number;
  repayment: number;
  service_charge: number;
  received_amount: number;
  gst: number;
  month: number;
  aadhaar_number: number;
  pan_number: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  birth_date: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  monthly_income: string;
  profession: string;
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  ifsc_code: string;
};

type LoanDetails = {
  id: number;
  user_id: number;
  amount: string;
  month: any;
};

type LoanAmountResponse = {
  success: boolean;
  message: string;
  data: LoanDetails;
};

type AddFormResponse = any; // TODO

class FormService {
  AddForm = async (
    payload: AddFormRequest
  ): Promise<AxiosResponse<AddFormResponse>> =>
    httpClient.post(`/addForm`, payload);

  // TODO
  GetLoanAmount = async (
    id: number
  ): Promise<AxiosResponse<LoanAmountResponse>> =>
    httpClient.get(`/loanAmount/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new FormService();
