"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";

const truncate = (str, n) =>
  str?.length > n ? str.slice(0, n - 1) + "…" : str;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const isFavorited = (product) => favorites.some((f) => f.id === product.id);

  const toggleFavorite = (product) => {
    const updated = isFavorited(product)
      ? favorites.filter((f) => f.id !== product.id)
      : [...favorites, product];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <main className="w-full flex flex-col items-center bg-blue-50 min-h-screen py-10">
      <section className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="border border-blue-200 rounded-2xl bg-white flex flex-col text-blue-900 shadow-md items-stretch max-w-xs mx-auto">
              <div className="w-full flex items-center justify-center h-40 overflow-hidden rounded-t-2xl border-b border-blue-200 bg-blue-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-5/6 w-5/6 object-contain rounded-xl"
                  style={{ textDecoration: "none" }}
                />
              </div>

              <div className="flex flex-col flex-grow p-4">
                <h2
                  className="text-base font-bold mb-1 text-blue-900 break-words"
                  style={{ textDecoration: "none" }}
                >
                  {truncate(product.title, 40)}
                </h2>
                <p
                  className="text-xs text-blue-700 flex-grow mb-2 line-clamp-2"
                  style={{ textDecoration: "none" }}
                >
                  {truncate(product.description, 70)}
                </p>
                <span
                  className="font-bold text-blue-600 text-base mb-3"
                  style={{ textDecoration: "none" }}
                >
                  ${product.price}
                </span>

                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <a
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors duration-200 focus:outline-none flex items-center justify-center flex-1 border ${
                      isFavorited(product)
                        ? "bg-blue-200 text-blue-900 hover:bg-blue-300 active:bg-blue-400 border-blue-300"
                        : "bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600 border-blue-500"
                    }`}
                    onClick={() => toggleFavorite(product)}
                    aria-label={
                      isFavorited(product)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    style={{ textDecoration: "none" }}
                  >
                    {isFavorited(product) ? "Favorited" : "Favorite"}
                  </a>

                  <Link
                    href={`/products/${product.id}`}
                    className="py-2 px-3 rounded-lg text-sm font-semibold transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600 focus:outline-none flex items-center justify-center flex-1 border border-blue-500 no-underline"
                    aria-label={`View details for ${product.title}`}
                    style={{ textDecoration: "none" }}
                  >
                    <FaInfoCircle className="mr-1" />
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
