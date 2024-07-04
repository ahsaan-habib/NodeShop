import axios from "axios";
import {
  PAYMENT_CREATE_COINBASE_CHARGE_REQUEST,
  PAYMENT_CREATE_COINBASE_CHARGE_SUCCESS,
  PAYMENT_CREATE_COINBASE_CHARGE_FAIL,
} from "../constants/paymentConstant";

export const createCoinbaseCharge = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_CREATE_COINBASE_CHARGE_REQUEST });

    const { data } = await axios.post("/api/payments/create-charge", {
      orderId,
    });

    dispatch({
      type: PAYMENT_CREATE_COINBASE_CHARGE_SUCCESS,
      payload: data.data,
    });

    window.location.href = data.data.hosted_url;
  } catch (error) {
    dispatch({
      type: PAYMENT_CREATE_COINBASE_CHARGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
