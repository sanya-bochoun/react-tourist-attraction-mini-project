import React, { useState, useEffect } from 'react';

const TravelCard = ({ 
  title, 
  description, 
  mainImage, 
  subImages = [],
  tags, 
  url,
  onTagClick
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  // รวมรูปภาพทั้งหมดเข้าด้วยกัน
  useEffect(() => {
    const images = [mainImage, ...subImages];
    setAllImages(images);
  }, [mainImage, subImages]);

  // ฟังก์ชั่นสำหรับ copy ลิงค์ไปยัง clipboard
  const handleCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("คัดลอกลิงค์สำเร็จ!");
      })
      .catch(err => {
        console.error('ไม่สามารถคัดลอกลิงค์ได้: ', err);
      });
  };

  // ฟังก์ชันสำหรับจัดการคลิกลิงค์
  const handleLinkClick = (e) => {
    setIsLoading(true);
    // ข้อความกำลังโหลดจะแสดงเป็นเวลา 1.5 วินาที
    setTimeout(() => {
      setIsLoading(false);
      window.open(url, '_blank');
    }, 1500);
    e.preventDefault();
  };

  // ฟังก์ชันสำหรับแสดงรูปภาพขนาดใหญ่
  const handleImageClick = (image) => {
    const index = allImages.indexOf(image);
    setCurrentImageIndex(index >= 0 ? index : 0);
    setSelectedImage(image);
    setShowImageModal(true);
  };

  // ฟังก์ชันเลื่อนไปรูปถัดไป
  const nextImage = (e) => {
    e.stopPropagation();
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(allImages[nextIndex]);
  };

  // ฟังก์ชันเลื่อนไปรูปก่อนหน้า
  const prevImage = (e) => {
    e.stopPropagation();
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(allImages[prevIndex]);
  };

  // เลือกรูปจากธัมบ์เนล
  const selectImage = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
    setSelectedImage(allImages[index]);
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 mb-8 p-4 relative border border-transparent hover:border-blue-100">
      {/* Modal สำหรับแสดงรูปภาพขนาดใหญ่ */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50" onClick={() => setShowImageModal(false)}>
          <div className="relative w-full max-w-5xl max-h-screen p-2 flex flex-col items-center">
            {/* ปุ่มปิด */}
            <button 
              className="absolute top-4 right-4 bg-white bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition-colors duration-200 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setShowImageModal(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* ปุ่มเลื่อนซ้าย */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 rounded-full p-3 hover:bg-opacity-50 transition-colors duration-200 z-10"
              onClick={prevImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* ปุ่มเลื่อนขวา */}
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 rounded-full p-3 hover:bg-opacity-50 transition-colors duration-200 z-10"
              onClick={nextImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* รูปภาพหลัก */}
            <div className="flex-grow flex items-center justify-center mb-4">
              <img 
                src={selectedImage} 
                alt="รูปขยาย" 
                className="max-h-[75vh] max-w-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            {/* รูปภาพย่อยทั้งหมด */}
            <div className="flex space-x-2 overflow-x-auto py-2 px-4 bg-black bg-opacity-50 rounded-lg">
              {allImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${index === currentImageIndex ? 'border-2 border-blue-500 scale-110' : 'opacity-70 hover:opacity-100'}`}
                  onClick={(e) => selectImage(index, e)}
                >
                  <img 
                    src={image} 
                    alt={`ภาพที่ ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overlay สำหรับแสดง Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="flex flex-col items-center">
            {/* Loading Spinner - ไอคอนหมุน */}
            <svg className="animate-spin h-10 w-10 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-medium text-blue-500">กำลังโหลด...</p>
          </div>
        </div>
      )}
      
      {/* รูปภาพหลัก */}
      <div className="md:w-1/3 h-64 md:h-auto overflow-hidden rounded-lg cursor-pointer" onClick={() => handleImageClick(mainImage)}>
        <img 
          src={mainImage} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      {/* ข้อมูลสถานที่ */}
      <div className="md:w-2/3 p-4 flex flex-col">
        {/* หัวข้อ - เปลี่ยนเป็นลิงค์ */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          <a 
            href={url} 
            className="hover:text-blue-500"
            onClick={handleLinkClick}
          >
            {title}
          </a>
        </h2>
        
        {/* คำอธิบาย */}
        <p className="text-gray-600 mb-3">{description}</p>
        
        {/* อ่านต่อ */}
        <a 
          href={url} 
          className="text-blue-500 hover:text-blue-700 mb-4"
          onClick={handleLinkClick}
        >
          อ่านต่อ
        </a>
        
        {/* แท็กในรูปแบบ "หมวด: tag1, tag2, ..." */}
        <div>
          <span className="text-gray-500 text-sm">หมวด: </span>
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-blue-400 text-sm cursor-pointer hover:underline"
              onClick={() => onTagClick(tag)}
            >
              {tag}{index < tags.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
        
        {/* รูปภาพย่อย */}
        {subImages && subImages.length > 0 && (
          <div className="flex mt-4 space-x-2">
            {subImages.map((image, index) => (
              <div 
                key={index} 
                className="w-20 h-20 rounded-md overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <img 
                  src={image} 
                  alt={`${title} - รูปที่ ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* ปุ่มลิงก์ (วงกลมด้านขวา) - เพิ่มฟังก์ชันคัดลอกลิงก์ */}
      <div className="flex items-center">
        <button 
          onClick={handleCopyLink}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-blue-200 hover:bg-blue-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TravelCard; 