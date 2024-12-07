import React, { useEffect, useState } from "react";
import Category from "./category";
import $ from "jquery";
import img1 from "../CategoryImg/table_cover.png";
import img2 from "../CategoryImg/washing_machine.webp";
import img3 from "../CategoryImg/mattress_cover.webp";
import img4 from "../CategoryImg/apron_cover.png";
import img5 from "../CategoryImg/curtain_cover.webp";
import img6 from "../CategoryImg/bet_Sheet.webp";
import img7 from "../CategoryImg/ac_cover.webp";
import img8 from "../CategoryImg/tv_cover.webp";
import Slider from "./Slider";
import { Link } from "react-router-dom";
import Layout from "../pages/Layout";
import ApiURl from "../controllers/Api";
import imgLocation from "../controllers/imagePath";

function Home() {
  const [catData, setCatData] = useState([]);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(`${ApiURl}/getMainCategory.php`);
        setCatData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Trigger animation on component mount
    const timeout = setTimeout(() => {
      setAnimationClass("animate-fade-up");
    }, 100); // Delay for smoother entry

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-200 via-purple-500 to-purple-300">
      <Slider />

      <div className="mt-10">
        <h1 className="md:text-3xl text-xl text-center font-bold mx-10 border-y-2 border-gray-600 py-2 md:py-3">
          Products Category
        </h1>
      </div>

      <div className="  flex flex-wrap justify-center gap-x-8 mx-10">
        {catData.map((row) => {
          return (
            <Link to={`/Products/${row.id}`} key={row.id} className="w-80">
              <Category
                img={`${imgLocation}/${row.sample_image}`}
                productsName={row.category_name}
              />
            </Link>
          );
        })}
      </div>

      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 row-gap-8 md:grid-cols-4">
          <div
            className={`text-center md:border-r mb-4 transition duration-1000 ${animationClass}`}
          >
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">10+</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Year Experience
            </p>
          </div>
          <div
            className={`text-center md:border-r mb-4 transition duration-1000 delay-100 ${animationClass}`}
          >
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">100+</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Products
            </p>
          </div>
          <div
            className={`text-center md:border-r mb-4 transition duration-1000 delay-200 ${animationClass}`}
          >
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">1K+</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Happy Customer
            </p>
          </div>
          <div
            className={`text-center transition duration-1000 delay-300 ${animationClass}`}
          >
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">10+</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Category
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
