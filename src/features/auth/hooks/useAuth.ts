import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingLogin,
  selectIsLogin,
  selectUser,
} from "../slice/auth.selector";

import { loginUser } from "../slice/auth.slice";
import { IRequestLogin } from "@/core/api/auth/types";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector(selectIsLogin);
  const isLoadingLogin = useSelector(selectIsLoadingLogin);
  const user = useSelector(selectUser);

  const onSubmitLogin = (data: IRequestLogin) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (user?.id && user?.role === "ADMIN") {
      navigate("/");
    }
  }, [isLogin, user, onSubmitLogin]);

  return { isLogin, onSubmitLogin, isLoadingLogin, user };
};

export default useAuth;
