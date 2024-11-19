"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddDamage() {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16)); // Default to current date and time
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch("/Products/Create/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setAvailableProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(error.message);
      }
    };

    fetchProducts();
  }, []);

  // Handle product selection
  const handleProductChange = (e) => {
    const productId = parseInt(e.target.value, 10);
    const product = availableProducts.find((p) => p.id === productId);
    setSelectedProduct(product);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!selectedProduct) {
      toast.error("Please select a product.");
      return;
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }
    if (!reason.trim()) {
      toast.error("Please provide a reason for the damage.");
      return;
    }

    // Prepare damage data
    const damageData = {
      product_id: selectedProduct.id,
      product_name: selectedProduct.product_name,
      purchase_cost: selectedProduct.purchase_cost, // Include purchase cost
      date, // Use the current or selected date/time
      quantity,
      reason,
    };

    try {
      // Send damage data to the backend
      const response = await fetch("/Damages/damage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(damageData),
      });

      if (response.ok) {
        toast.success("Damage record added successfully!");
        // Reset form fields
        setSelectedProduct(null);
        setQuantity("");
        setDate(new Date().toISOString().slice(0, 16)); // Reset to current date and time
        setReason("");
      } else {
        toast.error("Failed to add damage record. Please try again.");
      }
    } catch (error) {
      console.error("Error adding damage record:", error);
      toast.error("An error occurred while adding the damage record.");
    }
  };

  return (
    <div className="h-screen font-nunito text-sm">
      <div className="container mx-auto p-4 md:mt-[5%] mt-[20%] overflow-y-auto">
        <h1 className="text-lg dark:text-white mb-4">Add Damage</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="product"
            >
              Product
            </label>
            <select
              id="product"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedProduct ? selectedProduct.id : ""}
              onChange={handleProductChange}
            >
              <option value="">Select Product</option>
              {availableProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <div className="mb-4">
              <p className="text-gray-700 text-sm">
                <strong>Purchase Cost:</strong> ৳
                {selectedProduct.purchase_cost}
              </p>
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="date">
              Date & Time
            </label>
            <input
              id="date"
              type="datetime-local" // Allows both date and time input
              className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="reason"
            >
              Reason
            </label>
            <textarea
              id="reason"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for damage"
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Damage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
