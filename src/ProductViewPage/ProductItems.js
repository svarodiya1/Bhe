import React from "react";
import Products from "../component/products";
import SilverSheet from '../Table Cover/60 round Clear Sheet Silver.png'
import DiamondSheet from '../Table Cover/60 round DIAMOND SOGO 30mm SHEET.png'
import Diamond from '../Table Cover/60 round Diamond.png'
import Frosted from '../Table Cover/60 round Frosted.png'
import GripperCover from '../Table Cover/60 round Gripper 2.png'
import Gripper from '../Table Cover/60 round Gripper.png'
import Jaal from '../Table Cover/60 round Jaal.png'
import LeatherEmboss from '../Table Cover/60 round LEATHER EMBOSS GOLD.png'
import LeatherEmbossGold from '../Table Cover/60 round Leather Emboss Gold 2.png'
import Luxury from '../Table Cover/60 round Luxury.png'
import Meiwa from '../Table Cover/60 round Meiwa.png'
import Rose from '../Table Cover/60 round Rose.png'
import SmokeSheet from '../Table Cover/60 round SMOKE CLEAR SHEET.png'
import LaceSheet from '../Table Cover/60 round WITHOUT LACE CLEAR SHEET.png'
import Woven from '../Table Cover/60 round non woven 2.png'
import NonWoven from '../Table Cover/60 round non woven.png'
import Ruby from '../Table Cover/60 round ruby.png'
import Sparkle from '../Table Cover/60 round sparkle.png'
import Wooden from '../Table Cover/60 round wooden.png'
import SilverLace from '../Table Cover/60 round CLEAR SHEET SILVER LACE.png'
import EuropeCover from '../Table Cover/Europe Table cover.png'
import Print3D from '../Table Cover/Table cover 3D Print.png'
import BMW from '../Table Cover/Table cover 60 round BMW.png'
import CherryLace from '../Table Cover/Table cover 60 round Cherry Lace.png'
import Golden from '../Table Cover/Table cover 60  round Clear Sheet Golden.png'
import Round3DPrint from '../Table Cover/Table cover 60-round 3D Print.png'
import CherryCover from '../Table Cover/cherry_cover_40_60.png'
import KumkumPanel from '../Table Cover/kumkum_panel_40_60.jpg'
import Leather from '../Table Cover/leather_emboss_40_60.jpg'
import { Link } from "react-router-dom";
import imgLocation from "../controllers/imagePath";





function ProductItems({products}) {


console.log("products"+products);


    return (

        <>

            <div className="flex flex-wrap">
                <h1> </h1>

                {
                            products.map((product,index) =>{
                                        console.log(product);
                                return(
                                <Link to={`/ProductOverview/${product.product_id}`}>
                                <Products key={index} product_id={product.product_id}  categoryName={product.category_name} productImages={`${imgLocation}/${product.img_path}`} productName={product.name} discountPrice={product.price}  />
                                </Link>
                                )
                            })
                    
                }
          
            </div>


        </>


    );
}

export default ProductItems;