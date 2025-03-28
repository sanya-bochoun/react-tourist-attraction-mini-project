import "./App.css";
import "./index.css";
import { useState } from "react";
import Header from "./components/Header";
import TravelList from "./components/TravelList";

function App() {
  const [searchText, setSearchText] = useState("");
  
  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <TravelList searchText={searchText} />
      {/* เนื้อหาอื่นๆ จะเพิ่มทีหลัง */}
    </div>
  );
}

export default App;
