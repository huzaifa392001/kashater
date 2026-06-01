import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// util
import fetch from "../util/http/http";

// store
import { authActions } from "../store/state-slices/auth";
import { snackbarActions } from "../store/state-slices/snackbar";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: logout, isLoading: isLogoutLoading } = useMutation({
    mutationFn: () => fetch({ url: "/auth/logout" }),
    onSuccess: (data) => {
      dispatch(snackbarActions.setSnackbar(data));
      dispatch(authActions.logout());
      navigate("/");
    },
    onError: (data) => dispatch(snackbarActions.setSnackbar(data)),
  });

  return { logout, isLogoutLoading };
};

export default useLogout;
