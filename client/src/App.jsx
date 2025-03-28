import "./App.css";
import "./index.css";
import { useState, useCallback } from "react";
import Header from "./components/Header";
import TravelList from "./components/TravelList";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  
  // ฟังก์ชั่นสำหรับการค้นหาทั่วไป ส่งค่าไปยัง Header
  const handleSearchInput = (text) => {
    setSearchText(text);
    
    // ล้าง timeout เก่า
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    
    // ตั้ง timeout ใหม่ (รอ 800ms ก่อนค้นหา)
    window.searchTimeout = setTimeout(() => {
      setDebouncedSearchText(text);
    }, 800);
  };
  
  // ฟังก์ชั่นสำหรับเพิ่มคำค้นหาเมื่อคลิกที่แท็ก
  const handleTagClick = (tag) => {
    const newSearchText = searchText.trim() ? `${searchText.trim()} ${tag}` : tag;
    setSearchText(newSearchText);
    
    // ค้นหาทันทีเมื่อคลิกที่แท็ก
    setDebouncedSearchText(newSearchText);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearchInput} searchText={searchText} />
      <TravelList searchText={debouncedSearchText} onTagClick={handleTagClick} />
      <ScrollToTop />
    </div>
  );
}

export default App;
