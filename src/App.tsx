import { useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import PassengerHome from "@/pages/PassengerHome";
import DriverHome from "@/pages/DriverHome";
import DriverVerification from "@/pages/DriverVerification";
import SplashScreen from "@/components/SplashScreen";

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashDone = useCallback(() => setSplashDone(true), []);

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}
      <Switch>
        <Route path="/passenger" component={PassengerHome} />
        <Route path="/driver" component={DriverHome} />
        <Route path="/become-driver" component={DriverVerification} />
        <Route>
          <Redirect to="/passenger" />
        </Route>
      </Switch>
    </WouterRouter>
  );
}

export default App;
