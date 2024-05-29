import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  deleteSubscription,
  getSubscriptionContent,
} from "./subscriptionSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewSubscriptionModal = () => {
    dispatch(
      openModal({
        title: "Add New Subscription",
        bodyType: MODAL_BODY_TYPES.SUBSCRIPTION_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewSubscriptionModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Subscriptions() {
  const { subscriptions } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptionContent());
  }, []);

  const getDummyStatus = (index) => {
    if (index % 5 === 0)
      return <div className="badge badge-primary bg-violet-400">Quarterly</div>;
    else if (index % 5 === 1)
      return <div className="badge badge-primary bg-rose-400">Monthly</div>;
    else if (index % 5 === 2)
      return <div className="badge badge-primary bg-green-400">Yearly</div>;
    else if (index % 5 === 3)
      return <div className="badge badge-primary bg-rose-400">Monthly</div>;
    else return <div className="badge badge-ghost">Expired</div>;
  };
  const getDummyArea = (index) => {
    if (index % 5 === 0) return <div>Alimosho</div>;
    else if (index % 5 === 1) return <div>Yaba</div>;
    else if (index % 5 === 2) return <div>Surulere</div>;
    else if (index % 5 === 3) return <div>Island</div>;
    else return <div className="">Lekki</div>;
  };

  const deleteCurrentSubscription = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this subscription?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.SUBSCRIPTION_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Subscriptions"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* subscriptions List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Created At</th>
                <th>Plan</th>
                <th>Area</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{l.first_name}</div>
                          <div className="text-sm opacity-50">
                            {l.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{l.email}</td>
                    <td>
                      {moment(new Date())
                        .add(-5 * (k + 2), "days")
                        .format("DD MMM YY")}
                    </td>
                    <td>{getDummyStatus(k)}</td>
                    <td>{getDummyArea(k)}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentSubscription(k)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Subscriptions;
