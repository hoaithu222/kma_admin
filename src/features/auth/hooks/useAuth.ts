import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingLogin,
  selectIsLoadingRegister,
  selectIsLogin,
  selectUser,
} from "../slice/auth.selector";

import { loginUser, register } from "../slice/auth.slice";
import { IRegister, IRequestLogin } from "@/core/api/auth/types";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector(selectIsLogin);
  const isLoadingLogin = useSelector(selectIsLoadingLogin);
  const isLoadingRegister = useSelector(selectIsLoadingRegister);
  const user = useSelector(selectUser);

  const onSubmitLogin = (data: IRequestLogin) => {
    dispatch(loginUser(data));
  };
  const onSubmitRegister = (data: IRegister) => {
    dispatch(register(data));
  };

  useEffect(() => {
    if (user?.id && user?.role === "ADMIN") {
      navigate("/");
    }
  }, [isLogin, user, onSubmitLogin]);

  return {
    isLogin,
    onSubmitLogin,
    isLoadingLogin,
    user,
    onSubmitRegister,
    isLoadingRegister,
  };
};

export default useAuth;
