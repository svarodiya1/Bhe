import React from 'react'
import Products from "../component/products";
import img1 from '../Washing Machine/Full_7_and_9kg.png'
import img2 from '../Washing Machine/IFB_7_and_9kg.png'
import img3 from '../Washing Machine/kumkum_non_woven_7_and_9kg.png'
import img4 from '../Washing Machine/kumkum_non_woven_IFB_7_and_9kg.png'
import img5 from '../Washing Machine/kumkum_non_woven_LG_7_and_9kg.png'
import img6 from '../Washing Machine/kumkum_non_woven_LG_Fully_7_and_9kg.png'
import img7 from '../Washing Machine/LG_7_and_9kg.png'





export default function WashingMachineCover() {

    return (
        <>
            <div className='flex flex-wrap'>

                <Products categoryName='Washing Machine' productImages={img1} productName='Full Washing Machine' discountPrice={399} actualPrice={499} discountPercentage={20} />
                <Products categoryName='Washing Machine' productImages={img2} productName='IFB Washing Machine' discountPrice={399} actualPrice={499} discountPercentage={20} />
                <Products categoryName='Washing Machine' productImages={img3} productName='Kumkum Non Woven' discountPrice={399} actualPrice={499} discountPercentage={20} />
                <Products categoryName='Washing Machine' productImages={img4} productName='Kumkum Non Woven IFB' discountPrice={399} actualPrice={499} discountPercentage={20} />
                <Products categoryName='Washing Machine' productImages={img5} productName='Kumkum Non Woven LG' discountPrice={399} actualPrice={499} discountPercentage={20} />
                <Products categoryName='Washing Machine' productImages={img6} productName='Kumkum Non Woven LG Fully' discountPrice={399} actualPrice={499} discountPercentage={20} />
                <Products categoryName='Washing Machine' productImages={img7} productName='LG Washig Machine' discountPrice={399} actualPrice={499} discountPercentage={20} />
                <Products categoryName='Washing Machine' productImages={img7} productName='LG Washig Machine' discountPrice={399} actualPrice={499} discountPercentage={20} />
            </div>


        </>

    );


}