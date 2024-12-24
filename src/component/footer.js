function Footer() {
    return (
        <>
            <div className="bg-[#CE9BFE] border-2  border-black ">
                <footer className="bg-[#CE9BFE]  font-sans tracking-wide pt-5 max-w-8xl mx-auto">
                    <div className="py-14 px-6 sm:px-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

                            {/* First Column - Logo and Description */}
                            <div className="lg:col-span-2">
                                <span className="text-xl font-bold">
                                    <img
                                        src="https://bhatiaemporium.com/wp-content/uploads/2024/02/cropped-Bhagtia-Emporium-LOGO-1.png"
                                        width="100px" alt="Bhatia Emporium Logo" />
                                </span>
                                <p className="text-gray-900 text-sm w-3/4 mt-3">
                                    We, <strong>Bhatia Emporium</strong>, are a trustworthy Manufacturer, Trader, and Supplier of various home and kitchen products.
                                </p>
                            </div>

                            {/* Second Column - Categories */}
                            <div>
                                <h4 className="text-lg font-semibold mb-8 text-black">Top Category</h4>
                                <ul className="space-y-4">
                                    <li><a href="./washing_cover.html" className="text-gray-900 hover:text-black text-sm">Washing Machine Cover</a></li>
                                    <li><a href="./table_cover.html" className="text-gray-900 hover:text-black text-sm">Table Cover</a></li>
                                    <li><a href="./mattres_cover.html" className="text-gray-900 hover:text-black text-sm">Mattress Cover</a></li>
                                    <li><a href="./kitchen_apron.html" className="text-gray-900 hover:text-black text-sm">Kitchen Apron</a></li>
                                </ul>
                            </div>

                            {/* Third Column - Social Media Links */}
                            <div>
                                <h4 className="text-lg font-semibold mb-8 text-black">Follow Us</h4>
                                <ul className="flex gap-4 text-black">
                                    <li><a href="#" className="text-gray-900 hover:text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-900 inline hover:fill-black w-6 h-6" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" clipRule="evenodd" />
                                        </svg>
                                    </a></li>
                                    <li><a href="#" className="text-gray-900 hover:text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-900 inline hover:fill-black w-6 h-6" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z" clipRule="evenodd" />
                                        </svg>
                                    </a></li>
                                    <li><a href="#" className="text-gray-900 hover:text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-900 inline hover:fill-black w-6 h-6" viewBox="0 0 24 24">
                                            <path d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.227 0-2.59.006-3.626.052-.706.034-1.18.128-1.618.299a2.59 2.59 0 0 0-.972.633 2.601 2.601 0 0 0-.634.972c-.17.44-.265.913-.298 1.618C4.805 9.367 4.8 9.714 4.8 12c0 2.227.006 2.59.052 3.626.034.705.128 1.18.298 1.617.153.392.333.674.632.972.303.303.585.484.972.633.445.172.918.267 1.62.3.993.047 1.34.052 3.626.052 2.227 0 2.59-.006 3.626-.052.704-.034 1.178-.128 1.617-.298.39-.152.674-.333.972-.632.304-.303.485-.585.634-.972.171-.444.266-.918.299-1.62.047-.993.052-1.34.052-3.626 0-2.227-.006-2.59-.052-3.626-.034-.704-.128-1.18-.299-1.618a2.619 2.619 0 0 0-.633-.972 2.595 2.595 0 0 0-.972-.634c-.44-.17-.914-.265-1.618-.298-.993-.047-1.34-.052-3.626-.052ZM12 3c2.445 0 2.75.009 3.71.054.958.045 1.61.195 2.185.419A4.388 4.388 0 0 1 19.49 4.51c.457.45.812.994 1.038 1.595.222.573.373 1.227.418 2.185.042.96.054 1.265.054 3.71 0 2.445-.009 2.75-.054 3.71-.045.958-.196 1.61-.419 2.185a4.395 4.395 0 0 1-1.037 1.595 4.44 4.44 0 0 1-1.595 1.038c-.573.222-1.227.373-2.185.418-.96.042-1.265.054-3.71.054-2.445 0-2.75-.009-3.71-.054-.958-.045-1.61-.196-2.185-.419A4.402 4.402 0 0 1 4.51 19.49a4.414 4.414 0 0 1-1.595-1.038A4.395 4.395 0 0 1 2.49 16.41c-.222-.573-.373-1.227-.419-2.185-.042-.96-.054-1.265-.054-3.71 0-2.445.009-2.75.054-3.71.045-.958.196-1.61.419-2.185A4.387 4.387 0 0 1 4.51 2.51a4.443 4.443 0 0 1 2.185-.419c.96-.045 1.265-.054 3.71-.054z" />
                                        </svg>
                                    </a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Section - Contact Information */}
                        <div className="pt-12">
                            <p className="text-sm font-bold mb-4 text-gray-900">
                                Contact Us: bhatiabazzar21@gmail.com
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                                Phone: +91 956 056 2391
                            </p>
                        </div>
                    </div>
                     {/* Gray Layer with Company Name */}
                     <div className="bg-500 text-center py-6 w-full">
                        <p className="text-black text-xl font-bold">
                            Powered by @ Algo2Bots Infotech
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Footer;