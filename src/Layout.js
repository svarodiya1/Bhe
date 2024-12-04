import React from "react";
import {Outlet, outlet} from 'react-router-dom';
import Navbar from "./component/navbar";
import Footer from "./component/footer";






function Layout() {

    

    return(

        <>

                <Navbar />
                <Outlet />
                <Footer />


        
        
        </>




    )



}


export default Layout ;