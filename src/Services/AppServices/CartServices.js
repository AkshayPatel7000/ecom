import {store} from '../../Store/MainStore';
import {setCartItems} from '../../Store/Slices/CartSlice';
import {setIsLoading} from '../../Store/Slices/LoaderSlice';
import {showError} from '../../utils/helperFunction';
import client from '../Client/Client';
import Endpoints from '../Client/Endpoints';

export const getCart = async () => {
  try {
    const {data} = await client.get(Endpoints.GET_CART);

    store.dispatch(setCartItems(data));
  } catch (error) {
    showError(error.message);
  }
};

export const addToCart = async id => {
  try {
    const {data} = await client.put(Endpoints.ADD_TO_CART, {productId: id});

    await getCart();
  } catch (error) {
    store.dispatch(setIsLoading(false));
  }
};

export const RemoveFromCart = async id => {
  try {
    const {data} = await client.delete(Endpoints.REMOVE_FROM_CART(id));
    await getCart();
  } catch (error) {
    showError(error.message);
  }
};
export const VerifyOrder = async (
  payment_id,
  order_id,
  signature,
  orderData,
) => {
  try {
    const {data} = await client.post(
      Endpoints.VERIFY_ORDER(payment_id, order_id, signature),
      {
        orderData: {
          paymentDetails: {
            paymentId: payment_id,
          },
          ...orderData,
        },
      },
    );
    getCart();
  } catch (error) {
    showError(error.message);
  }
};
export const UpdateCart = async (id, qty) => {
  try {
    const {data} = await client.put(Endpoints.UPDATE_CART_ITEM(id), {
      quantity: qty,
    });
    getCart();
  } catch (error) {
    showError(error.message);
  }
};
