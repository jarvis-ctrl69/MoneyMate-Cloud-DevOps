import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Ledger from "./Ledger";
import Reports from "./Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;