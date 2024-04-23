import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ROUTES from "./routes/routeConfig";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense, lazy } from "react";
import Loader from "./components/pageLoader";
import Page404 from "./pages/notFound";
import StoreProvider from "./store/store";
import ErrorBoundary from "./components/errorBoundary";
const Login = lazy(() => import("./pages/login"));


const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<Login />} />
              {ROUTES.map((data: any) => {
                let mainRoute: any[] = [];
                let childRoutes: any[] = [];

                if (data.children && data.children.length === 0) {
                  mainRoute = [
                    <Route
                      key={data.id}
                      path={data.path}
                      element={
                        <PrivateRoute>
                          {data.component}
                        </PrivateRoute>
                      }
                    />,
                  ];
                } else {
                  childRoutes = data.children.map((data: any) => (
                    <Route
                      key={data.id}
                      path={data.path}
                      element={
                        <PrivateRoute>
                          {data.component}
                        </PrivateRoute>
                      }
                    />
                  ));
                }
                return [...mainRoute, ...childRoutes];
              })}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
