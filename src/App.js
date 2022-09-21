import "../src/css/style.css";
import Register from "../src/pages/register";
import Landing from "../src/pages/landing";
import Login from "../src/pages/login";
import Profile from "./pages/profile";
import MyFav from "./pages/myFav";
import Market from "./pages/market";
import Upload from "./pages/upload";
import Navbar from "./components/nav";
import Footer from "./components/footer";
import Item from "./pages/item";
import About from "./pages/about";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  // window.onload = function(){
  //   var ab =document.getElementById('a')
  //   var bod = document.getElementsByTagName('body')[0]
  //   console.log(bod)
  //   if(ab == null){
  //       bod.style.backgroundImage="url(../src/image/background/login.png)"
  //   }else{
  //       bod.style.background='blue'
  //   }}

  return (
    <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/myFav" element={<MyFav />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/market" element={<Market />} />
            <Route path="/user/upload" element={<Upload />} />
            <Route path="/user/item" element={<Item />} />
            <Route path="/user/about" element={<About />} />
          </Routes>
        <Footer />
    </Router>
  );
}

export default App;
