import React from "react";
import Image from "next/image";

const OrderItem = ({ order }) => {
  
  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-100 shadow rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Order ID: {order?._id} </span>
            {order?.orderStatus == "Processing" ? (
              <span className="text-error">
                • {order?.orderStatus.toUpperCase()}
              </span>
            ) : (
              <span className="text-green">
                • {order?.orderStatus.toUpperCase()}
              </span>
            )}
          </p>
          <p className="text-[#333]">{order?.createAt?.substring(0, 10)} </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-[#000] mb-1">Person</p>
          <ul className="text-[#555]">
            <li>{order?.user?.name}</li>
            <li>Phone: {order?.shippingInfo?.phoneNo}</li>
            <li>Email: {order?.user?.email}</li>
          </ul>
        </div>
        <div>
          <p className="text-[#000] mb-1">Delivery address</p>
          <ul className="text-[#555]">
            <li>{order?.shippingInfo?.street}</li>
            <li>
              {order?.shippingInfo?.city}, {order?.shippingInfo?.state},{" "}
              {order?.shippingInfo?.zipCode}
            </li>
            <li>{order?.shippingInfo?.country}</li>
          </ul>
        </div>
        <div>
          <p className="text-[#111] mb-1">Payment</p>
          <ul className="text-[#222]">
            <li className="text-[green]">
              {order?.paymentInfo?.status?.toUpperCase()}
            </li>
            <li>Tax paid: ${order?.paymentInfo?.taxPaid}</li>
            <li>Total paid: ${order?.paymentInfo?.amountPaid}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order?.orderItems?.map((item) => (
          <figure className="flex flex-row mb-4">
            <div>
              <div className="block w-20 h-20 rounded border border-lightgray overflow-hidden p-3">
                <Image
                  src={item?.image}
                  height="60"
                  width="60"
                  alt={item.name}
                />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{item.name.substring(0, 35)}</p>
              <p className="mt-1 font-semibold">
                {item.quantity}x = ${item.price * item.quantity}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
};

export default OrderItem;
