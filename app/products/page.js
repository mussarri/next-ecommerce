import React from "react";
import ProductCard from "../components/productCard";
import Filter from "../components/filter/index";
import Pagination from "../components/pagination";
import RefreshButton from "../components/refreshButton";

async function getData(category, page, min, max, q) {
  let url = new URL(process.env.API_URL + "/api/products");
  let params = new URLSearchParams(url.search);
  category && params.set("category", category);
  page && params.set("page", page);
  min && params.set("min", min);
  max && params.set("max", max);
  q && params.set("q", q);
  const res = await fetch(
    process.env.API_URL + "/api/products?" + params.toString(),
    {
      cache: "no-store",
    }
  );
  return res.json();
}

async function getCategories() {
  const res = await fetch(process.env.API_URL + "/api/category", {
    cache: "no-store",
  });
  return res.json();
}

const Products = async ({ params, searchParams }) => {
  const { category, page, min, max, q } = searchParams;
  const data = await getData(category, page, min, max, q);
  const categories = await getCategories();
  return (
    <div className="p-5 pb-20 max-width">
      {" "}
      <h1 className="uppercase font-semibold" style={{ fontSize: "1.6rem" }}>
        Products
      </h1>
      <div className="flex gap-5 mt-4 flex-col lg:flex-row">
        <Filter categories={categories?.category} />
        {data?.products.length > 0 ? (
          <div className="lg:w-[75%]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-10">
              {data && data?.products?.map((item) => <ProductCard {...item} />)}
            </div>
            <Pagination
              resPerPage={data?.resPerPage}
              productsCount={data?.productsCount}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold">
              No products found with these criteria.
            </h2>
            <RefreshButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
