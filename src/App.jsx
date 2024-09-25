import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Slider from "./pages/Slider";
import Sign from "./pages/Sign";

import FirstSection from "./components/Sign/FirstSection";
import SecondSection from "./components/Sign/SecondSection";
import ThirsSection from "./components/Sign/ThirsSection";
import FourthSection from "./components/Sign/FourthSection";
import FifthSection from "./components/Sign/FifthSection";
import ErrorSign from "./components/Sign/ErrorSign";
import Error404 from "./pages/Error404";
function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="w-screen  bg-primary !overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/slider" element={<Slider />} />
          <Route path="/sign" element={<Sign />}>
            <Route path="1" element={<FirstSection />} />
            <Route path="2" element={<SecondSection />} />
            <Route path="3" element={<ThirsSection />} />
            <Route path="4" element={<FourthSection />} />
            <Route path="5" element={<FifthSection />} />
            <Route path="*" element={<ErrorSign />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
