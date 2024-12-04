import React, { useState } from 'react';
import '../App.css';


function ProdcutSidebar() {
    const [priceRange, setPriceRange] = useState([200, 1200]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
  
    const handlePriceChange = (e, index) => {
      const newPrice = [...priceRange];
      newPrice[index] = e.target.value;
      setPriceRange(newPrice);
    };
  
    const handleCategoryChange = (e) => {
      const value = e.target.value;
      if (e.target.checked) {
        setSelectedCategories([...selectedCategories, value]);
      } else {
        setSelectedCategories(selectedCategories.filter(c => c !== value));
      }
    };
  
    const handleColorChange = (e) => {
      const value = e.target.value;
      if (e.target.checked) {
        setSelectedColors([...selectedColors, value]);
      } else {
        setSelectedColors(selectedColors.filter(color => color !== value));
      }
    };
  
    const handleSizeChange = (e) => {
      const value = e.target.value;
      if (e.target.checked) {
        setSelectedSizes([...selectedSizes, value]);
      } else {
        setSelectedSizes(selectedSizes.filter(size => size !== value));
      }
    };
  
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <label className="block mb-2">
            <input type="checkbox" value="Dslr Camera" onChange={handleCategoryChange} className="mr-2" /> Table Cover
          </label>
          <label className="block mb-2">
            <input type="checkbox" value="Laptop" onChange={handleCategoryChange} className="mr-2" /> Washing Machine
          </label>
          <label className="block">
            <input type="checkbox" value="Gaming Console" onChange={handleCategoryChange} className="mr-2" /> Mattress Cover
          </label>
        </div>
  
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Shop By Price</h3>
          <div className="flex items-center space-x-4">
            <input type="number" value={priceRange[0]} onChange={(e) => handlePriceChange(e, 0)} className="w-16 p-1 border rounded" min="0" />
            <input type="range" min="200" max="1200" value={priceRange[0]} onChange={(e) => handlePriceChange(e, 0)} className="flex-1" />
            {/* <input type="range" min="200" max="1200" value={priceRange[1]} onChange={(e) => handlePriceChange(e, 1)} className="flex-1" /> */}
            {/* <input type="number" value={priceRange[1]} onChange={(e) => handlePriceChange(e, 1)} className="w-16 p-1 border rounded" max="1200" /> */}
          </div>
        </div>
  
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Choose Color</h3>
          <label className="block mb-2">
            <input type="checkbox" value="White" onChange={handleColorChange} className="mr-2" /> White
          </label>
          <label className="block mb-2">
            <input type="checkbox" value="Blue" onChange={handleColorChange} className="mr-2" /> Blue
          </label>
          <label className="block mb-2">
            <input type="checkbox" value="Brown" onChange={handleColorChange} className="mr-2" /> Brown
          </label>
          <label className="block mb-2">
            <input type="checkbox" value="Green" onChange={handleColorChange} className="mr-2" /> Green
          </label>
          <label className="block">
            <input type="checkbox" value="Purple" onChange={handleColorChange} className="mr-2" /> Purple
          </label>
        </div>
  
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Size</h3>
          <label className="block mb-2">
            <input type="checkbox" value="M" onChange={handleSizeChange} className="mr-2" /> M
          </label>
          <label className="block mb-2">
            <input type="checkbox" value="L" onChange={handleSizeChange} className="mr-2" /> L
          </label>
          <label className="block mb-2">
            <input type="checkbox" value="XL" onChange={handleSizeChange} className="mr-2" /> XL
          </label>
          <label className="block">
            <input type="checkbox" value="XXL" onChange={handleSizeChange} className="mr-2" /> XXL
          </label>
        </div>
      </div>
    );
  }

  
  export default ProdcutSidebar;