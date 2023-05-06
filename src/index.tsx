import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BasicTable } from "./tables/basic";
import { ColumnOrderingTable } from "./tables/column-ordering";
import { NotFound } from "./404";
import "./global-styles.css";
import { ColumnOrderingDnDTable } from "./tables/column-ordering-dnd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<BasicTable />} />
            <Route path="/column-ordering" element={<ColumnOrderingTable />} />
            <Route
              path="/column-ordering-dnd"
              element={<ColumnOrderingDnDTable />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
