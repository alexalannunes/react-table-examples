import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../404";
import { Layout } from "../layout";
import { routes } from "./route-setup";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
