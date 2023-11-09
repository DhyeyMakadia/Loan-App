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
};

type LoanAmountResponse = any; // TODO

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
