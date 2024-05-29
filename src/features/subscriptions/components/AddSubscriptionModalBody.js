import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewSubscription } from "../subscriptionSlice";

const INITIAL_SUBSCRIPTION_OBJ = {
  first_name: "",
  last_name: "",
  email: "",
};

function AddSubscriptionModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subscriptionObj, setSubscriptionObj] = useState(
    INITIAL_SUBSCRIPTION_OBJ
  );

  const saveNewSubscription = () => {
    if (subscriptionObj.first_name.trim() === "")
      return setErrorMessage("First Name is required!");
    else if (subscriptionObj.email.trim() === "")
      return setErrorMessage("Email id is required!");
    else {
      let newSubscriptionObj = {
        id: 7,
        email: subscriptionObj.email,
        first_name: subscriptionObj.first_name,
        last_name: subscriptionObj.last_name,
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      };
      dispatch(addNewSubscription({ newSubscriptionObj }));
      dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setSubscriptionObj({ ...subscriptionObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={subscriptionObj.first_name}
        updateType="first_name"
        containerStyle="mt-4"
        labelTitle="First Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={subscriptionObj.last_name}
        updateType="last_name"
        containerStyle="mt-4"
        labelTitle="Last Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="email"
        defaultValue={subscriptionObj.email}
        updateType="email"
        containerStyle="mt-4"
        labelTitle="Email Id"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewSubscription()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddSubscriptionModalBody;
