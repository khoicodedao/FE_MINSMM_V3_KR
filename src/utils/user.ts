import { LOCAL_STORAGE_KEY } from "constants/enums";
import { USER_ROLE } from "constants/user";

const ConvertUserRole = (role: number | null) => {
  switch (role) {
    case USER_ROLE.admin_value:
      return USER_ROLE.admin_label;
    case USER_ROLE.user_value:
      return USER_ROLE.user_label;
    default:
      return "";
  }
};

const GetApiKey = () => {
  const key = localStorage.getItem(LOCAL_STORAGE_KEY.API_KEY);
  return key ?? null;
};

const GetUserName = () => {
  const userName = localStorage.getItem(LOCAL_STORAGE_KEY.USERNAME);
  return userName ?? null;
};

const GetRoleUser = () => {
  const roleUser = localStorage.getItem(LOCAL_STORAGE_KEY.ROLE_USER);
  if (roleUser) return parseInt(roleUser);
  return null;
};

const GetIdUser = () => {
  const idUser = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID);
  if (idUser) return parseInt(idUser);
  return null;
};

const GetEmailUser = () => {
  const idUser = localStorage.getItem(LOCAL_STORAGE_KEY.EMAIL_USER);
  return idUser ?? null;
};

const GetRefCode = ()=>{
  const refCode = localStorage.getItem(LOCAL_STORAGE_KEY.REF_CODE);
  return refCode ?? null;
}

const GetBalance = () => {
  const balance = localStorage.getItem(LOCAL_STORAGE_KEY.BALANCE_USER);
  return balance ?? null
}

const CheckToken = () => {
  const token = GetApiKey()
  return token ? true : false;
}

const GetTotalBalanceSpent = () => {
  const totalBalanceSpent = localStorage.getItem(LOCAL_STORAGE_KEY.TOTAL_BALANCE_SPENT);
  return totalBalanceSpent ?? null
}

export {
  ConvertUserRole,
  GetApiKey,
  GetIdUser,
  GetRoleUser,
  GetUserName,
  GetEmailUser,
  GetRefCode,
  GetBalance,
  CheckToken,
  GetTotalBalanceSpent,
};
