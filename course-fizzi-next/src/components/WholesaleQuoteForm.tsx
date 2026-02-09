"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { calculateWholesaleQuote, formatCurrency } from "@/utils/wholesale";

type WholesaleQuoteFormProps = {
  product: Product;
  quantity: number;
};

export default function WholesaleQuoteForm({
  product,
  quantity,
}: WholesaleQuoteFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    company: "",
    deliveryAddress: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quote = calculateWholesaleQuote(product, quantity);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - in production, this would send to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Quote request submitted:", {
        product: product.id,
        quantity,
        ...formData,
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          customerName: "",
          email: "",
          phone: "",
          company: "",
          deliveryAddress: "",
          notes: "",
        });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
        <h4 className="text-xl font-bold text-green-800 mb-2">
          Thank you for your request!
        </h4>
        <p className="text-green-700">
          Our sales team will contact you within 24 hours with a custom quote and delivery options.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-sky-950 mb-4">
        Request Custom Quote
      </h3>

      {/* Quote Summary */}
      <div className="bg-orange-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Product</p>
            <p className="font-semibold text-sky-900">{product.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Quantity</p>
            <p className="font-semibold text-sky-900">{quantity} units</p>
          </div>
          <div>
            <p className="text-gray-600">Unit Price</p>
            <p className="font-semibold text-sky-900">
              {formatCurrency(quote.unitPrice)}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Subtotal</p>
            <p className="font-semibold text-orange-600">
              {formatCurrency(quote.subtotal)}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-1">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Your Company"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-sky-900 mb-1">
            Delivery Address *
          </label>
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-orange-500"
            placeholder="123 Business Ave, City, State 12345"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-sky-900 mb-1">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-orange-500"
            placeholder="Any special requests or questions..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Quote Request"}
        </button>
      </form>
    </div>
  );
}
