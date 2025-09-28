"use client";

import React, { useEffect, useState } from "react";

const truncate = (str, n) =>
  str?.length > n ? str.slice(0, n - 1) + "…" : str;

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  }, []);

  const handleUnfavorite = (id) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <main className="bg-blue-50 min-h-screen py-10">
      <section className="w-full max-w-6xl mx-auto px-4">
        {favorites.length === 0 ? (
          <div className="text-blue-900 text-center text-lg mt-20">
            You have no favorites yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <article
                key={product.id}
                className="border border-blue-200 rounded-2xl bg-white flex flex-col text-blue-900 shadow-md items-stretch max-w-xs mx-auto">
                {/* Product Image */}
                <div className="w-full flex items-center justify-center h-40 overflow-hidden rounded-t-2xl border-b border-blue-200 bg-blue-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-5/6 w-5/6 object-contain rounded-xl"
                  />
                </div>

                {/* Product Content */}
                <div className="flex flex-col flex-grow p-4">
                  <h2 className="text-base font-bold mb-1 text-blue-900 break-words">
                    {truncate(product.title, 40)}
                  </h2>
                  <p className="text-xs text-blue-700 flex-grow mb-2 line-clamp-2">
                    {truncate(product.description, 70)}
                  </p>
                  <span className="font-bold text-blue-600 text-base mb-3">
                    ${product.price}
                  </span>
                  <button
                    className="py-2 px-3 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-400 active:bg-red-600 transition-colors duration-200 focus:outline-none border border-red-500"
                    onClick={() => handleUnfavorite(product.id)}>
                    Remove from Favorites
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
