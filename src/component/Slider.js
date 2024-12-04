import React, { useState, useEffect } from 'react';
import FridgeMat from '../sliderImg/fridge_mat.webp';
import MattressCover from '../sliderImg/mattress_cover.webp';
import TableCover from '../sliderImg/table-cover.webp';
import WashingMachineCover from '../sliderImg/washing_machine_cover.webp';

const images = [
    { src: FridgeMat, alt: 'Fridge Mat' },
    { src: MattressCover, alt: 'Mattress Cover' },
    { src: TableCover, alt: 'Table Cover' },
    { src: WashingMachineCover, alt: 'Washing Machine Cover' },
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);


    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 5000); // Change slide every 3 seconds
        return () => clearInterval(intervalId); // Clean up the interval on unmount
    }, []);

    return (
        <div className="relative w-full max-w-8xl mx-auto overflow-hidden">
            <div className="relative h-48 md:h-96">
                <div className="relative h-48 md:h-96 flex transition-transform duration-700" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <div key={index} className="flex-shrink-0 w-full">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute z-30 flex justify-between top-1/2 w-full transform -translate-y-1/2 md:px-7 px-3">
                <button
                    onClick={prevSlide}
                    className="bg-white p-2 rounded-full shadow-md focus:outline-none"
                >
                    <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-white p-2 rounded-full shadow-md focus:outline-none"
                >
                    <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div className="absolute flex space-x-2 bottom-5 left-1/2 transform -translate-x-1/2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Slider;
