import React from 'react';
import Logo from '../images/bhatia-emporium.jpg';

const Receipt = () => {
  const items = [
    { name: 'Kitchen Apron', quantity: 2, price: 120.0 },
    { name: 'Kitchen Check Apron', quantity: 1, price: 95.0 },
    { name: 'Fridge Top Cover', quantity: 5, price: 75.0 },
  ];

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 my-10  border-t">
      <h1 className="w-28 mx-auto border"><img src={Logo} alt="My Image" /></h1>
      <p className="text-center text-gray-600">Thank you for your purchase!</p>
      
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Transaction Details</h2>
        <div className="border-t border-gray-300 pt-2 mb-2">
          <p className="flex justify-between"><span>Date:</span><span>{new Date().toLocaleDateString()}</span></p>
          <p className="flex justify-between"><span>Order ID:</span><span>#6543</span></p>
        </div>
        <div className=' border-gray-300 pt-2'>
          <p className="flex justify-between text-sm mb-2"><span className='font-semibold'>Order Status : </span> Created Successfully</p>
          <p className="flex justify-between text-sm mb-2"><span className='font-semibold'>Customer Name : </span> Manish Singh Negi</p>
          <p className="flex justify-between text-sm mb-2"><span className='font-semibold'>Customer Mobile Number : </span> 8448789766</p>
          <p className="flex justify-between text-sm mb-2"><span className='font-semibold'>Customer Address : </span> 139, Sathnagar, Palam Gao</p>
          <p className="flex justify-between text-sm"><span className='font-semibold'>Payment Type : </span> Cash On Delivery</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Items</h2>
        <div className="border-t border-gray-300 pt-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>&#x20b9;{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-gray-300 mb-2">
        <div className="flex justify-between ">
          <span>Subtotal:</span>
          <span>&#x20b9;{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%):</span>
          <span>&#x20b9;{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <span>&#x20b9;{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 text-center ">
        <p className="text-gray-600">We hope to see you again!</p>
        <p className="text-sm text-gray-500">For any inquiries, contact us at care@bhatiaemporium.com

</p>
      </div>
    </div>
  );
};

export default Receipt;
