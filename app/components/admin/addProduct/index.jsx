"use client";

import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../../../../context/ProductContext";

const NewProduct = ({ categories }) => {
  const { newProduct, error, updated, setUpdated, clearErrors } =
    useContext(ProductContext);

  const [product, setProduct] = useState({
    title: "",
    description: "",

    price: "",
    stock: "",
    category: "",
  });

  const { title, description, price, stock, category } = product;

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
    if (updated) {
      toast.success("Added successfully");
      setUpdated(false);
    }
  }, [updated, error]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    newProduct(product);
  };

  return (
    <section className="container max-w-3xl p-6 mr-auto">
      <h1 className="mb-3 text-xl md:text-2xl font-semibold text-black mb-8">
        Create New Product
      </h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1"> Title </label>
          <input
            type="text"
            className="appearance-none border border-[#ccc] bg-[#fff] rounded-md py-2 px-3 hover:border-[#666] focus:outline-none focus:border-[#666] w-full"
            placeholder="Product title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4 mt-5">
          <label className="block mb-1"> Description </label>
          <textarea
            rows="4"
            className="appearance-none border border-[#ccc] bg-[#fff] rounded-md py-2 px-3 hover:border-[#666] focus:outline-none focus:border-[#666] w-full"
            placeholder="Product description"
            name="description"
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <div className="mb-4">
            <label className="block mb-1"> Price </label>
            <div className="relative">
              <div className="col-span-2">
                <input
                  type="text"
                  className="appearance-none border border-[#ccc] bg-[#fff] rounded-md py-2 px-3 hover:border-[#666] focus:outline-none focus:border-[#666] w-full"
                  placeholder="0.00"
                  name="price"
                  value={price}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1"> Category </label>
            <div className="relative">
              <select
                className="block appearance-none border border-[#ccc] bg-[#fff] rounded-md py-2 px-3 hover:border-[#666] focus:outline-none focus:border-[#666] w-full capitalize"
                name="category"
                value={category}
                onChange={onChange}
                required
              >
                {categories.map((category) => (
                  <option
                    className="capitalize"
                    key={category.name}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              <i className="absolute inset-y-0 right-0 p-2 text-[#666]">
                <svg
                  width="22"
                  height="22"
                  className="fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z"></path>
                </svg>
              </i>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <div className="mb-4">
            <label className="block mb-1"> Stock </label>
            <div className="relative">
              <div className="col-span-2">
                <input
                  type="text"
                  className="appearance-none border border-[#ccc] bg-[#fff] rounded-md py-2 px-3 hover:border-[#666] focus:outline-none focus:border-[#666] w-full"
                  placeholder="0"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-500 border border-transparent rounded-md hover:opacity-80 w-full"
        >
          Create Product
        </button>
      </form>
    </section>
  );
};

export default NewProduct;
