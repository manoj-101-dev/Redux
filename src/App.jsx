/* eslint-disable react/prop-types */

import { Provider, connect } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Reducer
const initialState = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549.0,
  quantity: 1,
  images: "https://i.dummyjson.com/data/products/1/4.jpg",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});

// Action Creators
const { setQuantity } = productSlice.actions;

// React Components
const QuantitySelect = ({ quantity, setQuantity }) => {
  const quantityOptions = Array.from({ length: 10 }, (_, index) => index + 1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };

  return (
    <div id="quantity">
      <select value={quantity} onChange={handleQuantityChange}>
        {quantityOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const PriceDetails = ({ product }) => {
  const subtotal = (product.price * product.quantity).toFixed(2);
  const total = subtotal;

  return (
    <div className="values">
      <h3>Subtotal:</h3>
      <h3>Shipping:</h3>
      <h4>Total:</h4>
      <div className="elements">
        <h3>${subtotal}</h3>
        <h3>FREE</h3>
        <h4>${total}</h4>
      </div>
    </div>
  );
};

const mapStateToPropsQuantity = (state) => ({
  quantity: state.product.quantity,
});

const mapDispatchToPropsQuantity = {
  setQuantity,
};

const ConnectedQuantitySelect = connect(
  mapStateToPropsQuantity,
  mapDispatchToPropsQuantity
)(QuantitySelect);

const mapStateToPropsPriceDetails = (state) => ({
  product: state.product,
});

const ConnectedPriceDetails = connect(mapStateToPropsPriceDetails)(
  PriceDetails
);

const App = () => {
  const product = store.getState().product; // Fetching product details from Redux store

  return (
    <Provider store={store}>
      <div className="card-container">
        <div className="card-content">
          <div className="product-image">
            <img src={product.images} alt="Product" />{" "}
            {/* Rendering product image */}
          </div>
          <div className="details">
            <h2>{product.title}</h2> {/* Rendering product title */}
            <p>{product.description}</p> {/* Rendering product description */}
            <h3 className="price">${product.price}</h3>{" "}
          </div>
          <div className="price-quantity">
            <ConnectedQuantitySelect />
          </div>
        </div>
        <ConnectedPriceDetails />
      </div>
    </Provider>
  );
};

export default App;

/* CSS (styles unchanged) */
