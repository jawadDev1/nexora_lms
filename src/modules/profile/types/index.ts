export interface IProfileBody {
  name: string;
  avatar: string;
}

export interface IChangePassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
