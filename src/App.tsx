import React from "react";
import Index from "./Pages/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notfoundpage from "./Pages/Notfoundpage";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Notfoundpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
