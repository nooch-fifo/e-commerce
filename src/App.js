import Home from "./routes/Home";
import Navbar from "./routes/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./routes/Authentication";
import Shop from "./routes/Shop";
import Checkout from "./routes/Checkout";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};


export default App;