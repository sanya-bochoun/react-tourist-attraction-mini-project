import React from 'react';

const TravelCard = ({ 
  title, 
  description, 
  mainImage, 
  subImages = [],
  tags, 
  url 
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-8 p-4">
      {/* รูปภาพหลัก */}
      <div className="md:w-1/3 h-64 md:h-auto overflow-hidden rounded-lg">
        <img 
          src={mainImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* ข้อมูลสถานที่ */}
      <div className="md:w-2/3 p-4 flex flex-col">
        {/* หัวข้อ */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        
        {/* คำอธิบาย */}
        <p className="text-gray-600 mb-3">{description}</p>
        
        {/* อ่านต่อ */}
        <a 
          href={url} 
          className="text-blue-500 hover:text-blue-700 mb-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          อ่านต่อ
        </a>
        
        {/* แท็กในรูปแบบ "หมวด: tag1, tag2, ..." */}
        <div>
          <span className="text-gray-500 text-sm">หมวด: </span>
          {tags.map((tag, index) => (
            <span key={index} className="text-blue-400 text-sm">
              {tag}{index < tags.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
        
        {/* รูปภาพย่อย */}
        {subImages && subImages.length > 0 && (
          <div className="flex mt-4 space-x-2">
            {subImages.map((image, index) => (
              <div key={index} className="w-20 h-20 rounded-md overflow-hidden">
                <img 
                  src={image} 
                  alt={`${title} - รูปที่ ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* ปุ่มลิงก์ (วงกลมด้านขวา) */}
      <div className="flex items-center">
        <a 
          href={url} 
          className="flex items-center justify-center w-12 h-12 rounded-full border border-blue-200 hover:bg-blue-50"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TravelCard; 