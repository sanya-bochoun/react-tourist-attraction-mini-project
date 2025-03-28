import React, { useState, useEffect } from 'react';
import TravelCard from './TravelCard';
import axios from 'axios';

const TravelList = ({ searchText, onTagClick }) => {
  const [travels, setTravels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // ถ้าไม่มีคำค้นหา ส่ง keyword เป็น "ที่" เพื่อให้ได้ข้อมูลทั้งหมด
        // ถ้ามีคำค้นหา ส่งคำค้นหาไปค้นที่ API
        const keyword = searchText.trim() || "ที่";
        const response = await axios.get(`http://localhost:4001/trips?keywords=${keyword}`);
        
        if (response.data && response.data.data) {
          // แปลงข้อมูลจาก API ให้เข้ากับรูปแบบที่ TravelCard ต้องการ
          // และตัด description ให้ไม่เกิน 100 ตัวอักษร
          const formattedData = response.data.data.map(trip => ({
            id: trip.eid,
            title: trip.title,
            description: trip.description.substring(0, 100) + (trip.description.length > 100 ? '...' : ''),
            mainImage: trip.photos[0],
            subImages: trip.photos.slice(1, 4),
            tags: trip.tags,
            url: trip.url
          }));
          
          setTravels(formattedData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchText]); // เพิ่ม dependency เป็น searchText เพื่อให้ดึงข้อมูลใหม่เมื่อคำค้นหาเปลี่ยน
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-8 text-center">
        <p className="text-xl">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-8 text-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 md:px-6 max-w-7xl py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">แนะนำที่เที่ยว</h1>
      {travels.length === 0 ? (
        <p className="text-center text-gray-500">ไม่พบข้อมูลสถานที่ท่องเที่ยว</p>
      ) : (
        <div className="space-y-8">
          {travels.map((travel) => (
            <TravelCard
              key={travel.id}
              id={travel.id}
              title={travel.title}
              description={travel.description}
              mainImage={travel.mainImage}
              subImages={travel.subImages}
              tags={travel.tags}
              url={travel.url}
              onTagClick={onTagClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelList; 