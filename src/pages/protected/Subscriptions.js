import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Subscriptions from "../../features/subscriptions";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Subscriptions" }));
  }, []);

  return <Subscriptions />;
}

export default InternalPage;
