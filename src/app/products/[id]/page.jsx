"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No response");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        setError(err.message);
      });
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, [id]);

  const isFavorited = (product) => favorites.some((f) => f.id === product?.id);
  const toggleFavorite = (product) => {
    let updated;
    if (isFavorited(product)) {
      updated = favorites.filter((f) => f.id !== product.id);
    } else {
      updated = [...favorites, product];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="bg-blue-50 min-h-screen py-8 flex flex-col items-center">
      {error && <div className="text-red-500 p-8">Error: {error}</div>}
      {!error && product && (
        <div className="border border-blue-200 p-8 rounded-2xl bg-white text-blue-900 w-full max-w-lg relative shadow-md">
          <button
            className="absolute top-4 right-4 text-blue-400 hover:text-blue-700 text-2xl bg-transparent border-none cursor-pointer"
            onClick={() => router.back()}
            aria-label="Close">
            &times;
          </button>
          <img
            src={product.image}
            alt={product.title}
            className="w-32 h-32 object-contain mx-auto mb-4 bg-blue-100 rounded-xl"
          />
          <button
            className={`mb-4 py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 focus:outline-none border flex items-center mx-auto ${
              isFavorited(product)
                ? "bg-blue-200 text-blue-900 hover:bg-blue-300 active:bg-blue-400 border-blue-300"
                : "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 border-blue-600"
            }`}
            onClick={() => toggleFavorite(product)}
            aria-label={
              isFavorited(product)
                ? "Remove from favorites"
                : "Add to favorites"
            }>
            {isFavorited(product) ? "★ Favorited" : "☆ Favorite"}
          </button>
          <h1 className="text-2xl font-bold mb-2 text-blue-900">
            {product.title}
          </h1>
          <p className="mb-2 text-blue-700">
            <strong>ID:</strong> {product.id}
          </p>
          <p className="mb-2 text-blue-700">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="mb-2 text-blue-700">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="mb-2 text-blue-700">
            <strong>Description:</strong> {product.description}
          </p>
        </div>
      )}
    </div>
  );
}
