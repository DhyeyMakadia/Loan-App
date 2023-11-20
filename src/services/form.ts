import { AxiosResponse } from "axios";
import httpClient from "services/httpClient";

type AddFormRequest = {
  user_id: number;
  amount: number;
  month: number;
  disbursal: number;
  interest: number;
  repayment: number;
  service_charge: number;
  received_amount: number;
  gst: number;
  aadhaar_number: number;
  pan_number: string;
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
