import "./App.scss";
import { memo, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute/ProtectedRoute";
import PageLoader from "./utils/Loader/Loader";
import Login from "./Login/Login";
import View from "./View/View";
import CreateEdit from "./CreateEdit/CreateEdit";

const Loader = () => (
  <div className="component-loader-wrapper card">
    <PageLoader />
  </div>
);

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route
            path="/view/:id"
            exact
            component={() => (
              <Suspense fallback={<Loader />}>
                <ProtectedRoute>
                  <View />
                </ProtectedRoute>
              </Suspense>
            )}
          />
          <Route
            path="/view"
            exact
            component={() => (
              <Suspense fallback={<Loader />}>
                <ProtectedRoute>
                  <View />
                </ProtectedRoute>
              </Suspense>
            )}
          />

          <Route
            path="/create"
            exact
            component={() => (
              <Suspense fallback={<Loader />}>
                <ProtectedRoute>
                  <CreateEdit />
                </ProtectedRoute>
              </Suspense>
            )}
          />
          <Route
            path="/edit/:id"
            exact
            component={() => (
              <Suspense fallback={<Loader />}>
                <ProtectedRoute>
                  <CreateEdit />
                </ProtectedRoute>
              </Suspense>
            )}
          />
          <Route path="/login" exact component={() => <Login />} />
          <Redirect from="/*" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default memo(App);
