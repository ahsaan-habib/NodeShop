import {
  PAYMENT_CREATE_COINBASE_CHARGE_REQUEST,
  PAYMENT_CREATE_COINBASE_CHARGE_SUCCESS,
  PAYMENT_CREATE_COINBASE_CHARGE_FAIL,
} from "../constants/paymentConstant";

export const orderCreateCoinbaseChargeReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_CREATE_COINBASE_CHARGE_REQUEST:
      return { loading: true };
    case PAYMENT_CREATE_COINBASE_CHARGE_SUCCESS:
      return { loading: false, success: true, chargeData: action.payload };
    case PAYMENT_CREATE_COINBASE_CHARGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
