import React from "react";
import ProductCard from "../../components/productCard";
import Filter from "../../components/filter/index";

async function getData(category, page, min, max) {
  let url = new URL("http://127.0.0.1/api/products");
  let params = new URLSearchParams(url.search);
  category && params.set("category", category);
  page && params.set("page", page);
  min && params.set("min", min);
  max && params.set("max", max);
  const res = await fetch(
    "http://127.0.0.1/api/products?" + params.toString(),
    {
      cache: "no-store",
    }
  );
  return res.json();
}

const Products = async ({ params, searchParams }) => {
  const { category, page, min, max } = searchParams;
  const data = await getData(category, page, min, max);
  return (
    <div className="p-5 max-width">
      {" "}
      <h1 className="uppercase font-semibold" style={{ fontSize: "1.6rem" }}>
        Products
      </h1>
      <div className="flex gap-5 mt-4">
        <Filter />
        <div className="grid grid-cols-3 gap-10" style={{ width: "75%" }}>
          {data && data?.products?.map((item) => <ProductCard {...item} />)}
        </div>
      </div>
    </div>
  );
};

export default Products;
