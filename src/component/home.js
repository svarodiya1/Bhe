import React from "react";
import Category from "./category";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(
          `${ApiURl}/getMainCategory.php`
        );
        setCatData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const firstData = catData[0];
  //   console.log(firstData.category_name);

  return (
    <div className="bg-gray-50">
      <Slider />

      <div className="mt-10">
        <h1 className="md:text-3xl text-xl text-center font-bold mx-10 border-y-2 border-gray-600 py-2 md:py-3">
          Prodcuts Category
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 mx-10">
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

      {/* 
      <div className="flex flex-wrap justify-center gap-x-8 mx-10">
        <Link to="/table-top" className="w-80">
          <Category img={img1} productsName="Table Cover" />
        </Link>
        <Category img={img2} productsName="Washing Machine Cover" />
        <Category img={img3} productsName="Mattress Cover" />
        <Link to="/kitchen-apron" className="w-80">
          <Category img={img4} productsName="Kitchen Apron" />
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 mx-10">
        <Category img={img5} productsName="Transparent Curtain" />
        <Category img={img6} productsName="Bed Sheet" />
        <Category img={img7} productsName="AC Cover" />
        <Category img={img8} productsName="TV Cover" />
      </div> */}

      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 row-gap-8 md:grid-cols-4">
          <div className="text-center md:border-r mb-4">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">10+</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Year Experiance
            </p>
          </div>
          <div className="text-center md:border-r mb-4">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">100+</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Products
            </p>
          </div>
          <div className="text-center md:border-r mb-4">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">1K+</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Happy Customer
            </p>
          </div>
          <div className="text-center">
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
