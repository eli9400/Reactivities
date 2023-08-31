import React from "react";
import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles.css";
import { router } from "./app/router/Routes";
import { RouterProvider } from "react-router-dom";
import { StoreContext, store } from "./app/stores/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
