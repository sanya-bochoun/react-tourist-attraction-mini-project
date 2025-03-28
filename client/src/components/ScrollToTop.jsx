import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // ตรวจสอบตำแหน่งการเลื่อนและแสดง/ซ่อนปุ่ม
  useEffect(() => {
    const toggleVisibility = () => {
      // แสดงปุ่มเมื่อเลื่อนลงมามากกว่า 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // เพิ่ม event listener
    window.addEventListener('scroll', toggleVisibility);

    // เก็บกวาด event listener เมื่อ component unmount
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // ฟังก์ชันกลับสู่ด้านบน
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // ทำให้การเลื่อนเป็นแบบนุ่มนวล
    });
  };

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none transform hover:scale-110 transition duration-300 z-50 flex items-center justify-center"
          aria-label="ปุ่มกลับสู่ด้านบน"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop; 