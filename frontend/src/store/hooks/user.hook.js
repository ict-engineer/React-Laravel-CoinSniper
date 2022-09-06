import { useSelector } from "react-redux";
// import { UserService } from "../../services";
// import { USER } from "../types";

export const useUser = () => {
  // const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => user);

  return {
    user,
  };
};
