export interface UserLogInResponse {
  success: boolean;
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: string;
  createdAt: string;
  __v?: number;
}

export interface UserProfileResponse {
  success: boolean;
  data: UserProfile;
}
