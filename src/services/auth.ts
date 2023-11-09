import { AxiosResponse } from "axios";
import httpClient from "services/httpClient";

type SignUpRequest = {
  name: string;
  mobile_number: string;
  password: string;
};

type Request = {
  mobile_number: string;
  password: string;
};

type SignUpResponse = {
  success: boolean;
  message: string;
  data: {
    mobile_number: string;
  };
};

type LoginResponse = {
  success: boolean;
  authToken: string;
  id: number;
};

class AuthService {
  signIn = async (
    signInRequest: Request
  ): Promise<AxiosResponse<LoginResponse>> =>
    httpClient.post(`/login`, signInRequest);

  signUp = async (
    signUpRequest: SignUpRequest
  ): Promise<AxiosResponse<SignUpResponse>> =>
    httpClient.post(`/createUser`, signUpRequest);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
