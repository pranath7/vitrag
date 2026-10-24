"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  Package,
  Layers,
  Sparkles,
  RefreshCw,
  ExternalLink,
  UploadCloud,
  Loader2,
  ImageIcon,
} from "lucide-react";
import { Product, Collection } from "@/lib/types";
import { collections } from "@/lib/products";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

interface AdminProductsTabProps {
  products: Product[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateStock: (id: string, newStock: number, availability?: Product["availability"]) => void;
  onResetProducts: () => void;
  openAddModal: boolean;
  setOpenAddModal: (open: boolean) => void;
}

export function AdminProductsTab({
  products,
  onSaveProduct,
  onDeleteProduct,
  onUpdateStock,
  onResetProducts,
  openAddModal,
  setOpenAddModal,
}: AdminProductsTabProps) {
  const [search, setSearch] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "stock_asc" | "stock_desc" | "price_desc">("name");

  // Modal State for editing
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State (used for both Add and Edit)
  const emptyForm: Product = {
    id: "",
    slug: "",
    name: "",
    shortDescription: "",
    description: "",
    category: "Dinner Sets",
    collectionIds: ["dinner-sets"],
    sku: `VIT-${Math.floor(100 + Math.random() * 900)}`,
    price: 349900, // ₹3,499
    currency: "INR",
    images: [{ src: "/images/categories/dinner-sets.jpg", alt: "Tableware product" }],
    variants: [],
    material: "Fine Porcelain Ceramic",
    dimensions: "Standard dinner plate & bowl sizing",
    pieceCount: 1,
    careInstructions: "Microwave and dishwasher safe. Hand wash with soft sponge recommended.",
    stockQuantity: 15,
    availability: "in-stock",
    featured: false,
    tags: ["Handcrafted", "Luxury", "Chennai"],
    seoTitle: "Fine Tableware | VITRAG",
    seoDescription: "Handcrafted tableware piece from VITRAG Chennai.",
  };

  const [formData, setFormData] = useState<Product>(emptyForm);
  const [tagsInput, setTagsInput] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isCloudinaryConfigured()) {
      setUploadStatus(
        "Cloudinary credentials are not set in .env.local. You can still paste an image URL or local path directly."
      );
      return;
    }

    try {
      setUploadingImage(true);
      setUploadStatus(null);
      const res = await uploadToCloudinary(file, "vitrag/products");
      if (res?.url) {
        setFormData((prev) => ({
          ...prev,
          images: [{ src: res.url, alt: prev.name || "VITRAG tableware" }],
        }));
        setUploadStatus("Photo uploaded successfully to Cloudinary!");
      }
    } catch (err: any) {
      setUploadStatus(
        err?.message || "Failed to upload photo. Check Cloudinary settings."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleOpenAdd = () => {
    const freshId = `prod-${Date.now()}`;
    const freshSku = `VIT-${Math.floor(100 + Math.random() * 900)}`;
    setFormData({
      ...emptyForm,
      id: freshId,
      sku: freshSku,
      slug: `tableware-${Date.now()}`,
    });
    setTagsInput("Handcrafted, Dinnerware, Tableware");
    setEditingProduct(null);
    setOpenAddModal(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({ ...p });
    setTagsInput((p.tags || []).join(", "));
    setOpenAddModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
    setEditingProduct(null);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const slug =
      formData.slug ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const productToSave: Product = {
      ...formData,
      slug,
      tags: parsedTags.length > 0 ? parsedTags : formData.tags,
      seoTitle: formData.seoTitle || `${formData.name} | VITRAG Tableware`,
      seoDescription:
        formData.seoDescription ||
        formData.shortDescription ||
        `Handcrafted ${formData.name} from VITRAG Chennai.`,
    };

    onSaveProduct(productToSave);
    handleCloseModal();
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search filter
        if (search) {
          const q = search.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchSku && !matchCategory && !matchTags) return false;
        }

        // Collection filter
        if (collectionFilter !== "all") {
          if (!p.collectionIds.includes(collectionFilter)) return false;
        }

        // Stock status filter
        if (stockFilter === "in-stock" && p.availability !== "in-stock") return false;
        if (stockFilter === "out-of-stock" && p.availability !== "out-of-stock" && p.stockQuantity > 0) return false;
        if (stockFilter === "low-stock" && (p.stockQuantity > 3 || p.availability === "out-of-stock")) return false;
        if (stockFilter === "made-to-order" && p.availability !== "made-to-order") return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "stock_asc") return a.stockQuantity - b.stockQuantity;
        if (sortBy === "stock_desc") return b.stockQuantity - a.stockQuantity;
        if (sortBy === "price_desc") return b.price - a.price;
        return 0;
      });
  }, [products, search, collectionFilter, stockFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-[#6E2023] font-semibold">
            Product Catalog &amp; Inventory
          </h1>
          <p className="text-xs sm:text-sm text-[#84766A]">
            Manage all {products.length} tableware items, stock availability, and specs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onResetProducts}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[#D9D0C1] hover:border-[#6E2023] text-[#84766A] hover:text-[#252522] rounded-lg text-xs font-semibold shadow-xs transition-colors"
            title="Reset catalog to default preset products"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#6E2023] hover:bg-[#55181A] text-[#FFF5E6] rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-[#CBAE9B]" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#EADBC8] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#84766A]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, SKU, tag..."
              className="w-full pl-9 pr-3 py-2 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs text-[#252522] placeholder-[#84766A] focus:outline-none focus:ring-1 focus:ring-[#6E2023]"
            />
          </div>

          {/* Collection Filter */}
          <div>
            <select
              value={collectionFilter}
              onChange={(e) => setCollectionFilter(e.target.value)}
              className="w-full py-2 px-3 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs text-[#252522] focus:outline-none focus:ring-1 focus:ring-[#6E2023]"
            >
              <option value="all">All Collections ({collections.length})</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Status Filter */}
          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full py-2 px-3 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs text-[#252522] focus:outline-none focus:ring-1 focus:ring-[#6E2023]"
            >
              <option value="all">All Stock Statuses</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock (≤ 3 units)</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="made-to-order">Made to Order</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs text-[#252522] focus:outline-none focus:ring-1 focus:ring-[#6E2023]"
            >
              <option value="name">Sort: Name (A-Z)</option>
              <option value="stock_asc">Sort: Stock (Low to High)</option>
              <option value="stock_desc">Sort: Stock (High to Low)</option>
              <option value="price_desc">Sort: Internal Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Results summary & active filter pills */}
        <div className="flex items-center justify-between text-xs text-[#84766A] pt-2 border-t border-[#EADBC8]/50">
          <span>
            Showing <strong className="text-[#252522]">{filteredProducts.length}</strong> of{" "}
            {products.length} products
          </span>

          {(search || collectionFilter !== "all" || stockFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCollectionFilter("all");
                setStockFilter("all");
              }}
              className="text-xs text-[#6E2023] hover:underline font-semibold"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-[#EADBC8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF5E6] border-b border-[#EADBC8] text-[#6E2023] font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-4">Category &amp; SKU</th>
                <th className="py-3 px-4">Internal Price</th>
                <th className="py-3 px-4">Stock Units</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADBC8]/60">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#84766A]">
                    <Package className="w-8 h-8 text-[#CBAE9B] mx-auto mb-2" />
                    <p className="font-medium text-[#252522]">No products matched your filter</p>
                    <p className="text-[11px] mt-0.5">Try adjusting your search or collection filter.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const availabilityStyles: Record<Product["availability"], string> = {
                    "in-stock": "bg-emerald-50 text-emerald-800 border-emerald-200",
                    "out-of-stock": "bg-rose-50 text-rose-800 border-rose-200",
                    "made-to-order": "bg-blue-50 text-blue-800 border-blue-200",
                    "enquiry-only": "bg-purple-50 text-purple-800 border-purple-200",
                  };

                  return (
                    <tr key={p.id} className="hover:bg-[#FFF5E6]/30 transition-colors">
                      {/* Product Thumbnail & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-lg bg-[#FFF5E6] border border-[#EADBC8] overflow-hidden shrink-0 relative flex items-center justify-center">
                            {p.images?.[0]?.src ? (
                              <Image
                                src={p.images[0].src}
                                alt={p.name}
                                fill
                                className="object-cover"
                                sizes="44px"
                              />
                            ) : (
                              <span className="font-heading font-bold text-[#6E2023] text-sm">
                                {p.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <span className="font-semibold text-[#252522] line-clamp-1 block">
                              {p.name}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-[#84766A]">
                              {p.pieceCount && <span>{p.pieceCount} Pcs</span>}
                              {p.material && <span>• {p.material}</span>}
                              {p.featured && (
                                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-semibold">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category & SKU */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <span className="font-medium text-[#252522] block">{p.category}</span>
                          <span className="font-mono text-[11px] text-[#84766A] block">
                            SKU: {p.sku}
                          </span>
                        </div>
                      </td>

                      {/* Internal Price */}
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-bold text-[#252522]">
                            ₹{(p.price / 100).toLocaleString("en-IN")}
                          </span>
                          <span className="block text-[10px] text-[#84766A]">
                            (Customer sees "Price on Request")
                          </span>
                        </div>
                      </td>

                      {/* Stock Stepper */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center border border-[#D9D0C1] rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => onUpdateStock(p.id, Math.max(0, p.stockQuantity - 1))}
                            className="px-2 py-1 text-[#84766A] hover:bg-[#FFF5E6] hover:text-[#252522] transition-colors"
                            title="Decrease stock"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={p.stockQuantity}
                            onChange={(e) =>
                              onUpdateStock(p.id, Math.max(0, parseInt(e.target.value) || 0))
                            }
                            className="w-12 text-center text-xs font-semibold py-1 focus:outline-none"
                            min="0"
                          />
                          <button
                            type="button"
                            onClick={() => onUpdateStock(p.id, p.stockQuantity + 1)}
                            className="px-2 py-1 text-[#84766A] hover:bg-[#FFF5E6] hover:text-[#252522] transition-colors"
                            title="Increase stock"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Availability status */}
                      <td className="py-3.5 px-4">
                        <select
                          value={p.availability}
                          onChange={(e) =>
                            onUpdateStock(
                              p.id,
                              p.stockQuantity,
                              e.target.value as Product["availability"]
                            )
                          }
                          className={`text-[11px] font-semibold py-1 px-2 rounded-full border focus:outline-none ${
                            availabilityStyles[p.availability]
                          }`}
                        >
                          <option value="in-stock">In Stock</option>
                          <option value="out-of-stock">Out of Stock</option>
                          <option value="made-to-order">Made to Order</option>
                          <option value="enquiry-only">Enquiry Only</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            href={`/product/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-[#84766A] hover:text-[#6E2023] hover:bg-[#FFF5E6] rounded-md transition-colors"
                            title="Preview product page on live site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-[#84766A] hover:text-[#6E2023] hover:bg-[#FFF5E6] rounded-md transition-colors"
                            title="Edit product details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-[#84766A] hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {openAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#252522]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#EADBC8] shadow-2xl overflow-hidden my-8">
            <div className="p-5 bg-[#6E2023] text-[#FFF5E6] flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-semibold">
                  {editingProduct ? "Edit Product Details" : "Add New Tableware Product"}
                </h3>
                <p className="text-xs text-[#CBAE9B]">
                  {editingProduct
                    ? `Updating ${editingProduct.name}`
                    : "Create a new product item in the Sowcarpet store catalog."}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-[#FFF5E6]/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Product Name & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-[#252522]">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Imperial Jade Dinner Set"
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              {/* Category & Primary Collection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  >
                    <option value="Signature Editions">Signature Editions</option>
                    <option value="Dinner Sets">Dinner Sets</option>
                    <option value="Platter & Serving">Platter &amp; Serving</option>
                    <option value="Dry Fruit Boxes">Dry Fruit Boxes</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">Primary Collection</label>
                  <select
                    value={formData.collectionIds[0] || "dinner-sets"}
                    onChange={(e) =>
                      setFormData({ ...formData, collectionIds: [e.target.value] })
                    }
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  >
                    {collections.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Internal Price, Stock & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">
                    Internal Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price / 100}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Math.max(0, Math.round(parseFloat(e.target.value || "0") * 100)),
                      })
                    }
                    placeholder="e.g. 4500"
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stockQuantity: Math.max(0, parseInt(e.target.value || "0")),
                      })
                    }
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">Availability</label>
                  <select
                    value={formData.availability}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availability: e.target.value as Product["availability"],
                      })
                    }
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                    <option value="made-to-order">Made to Order</option>
                    <option value="enquiry-only">Enquiry Only</option>
                  </select>
                </div>
              </div>

              {/* Piece count & Material */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">Piece Count</label>
                  <input
                    type="number"
                    value={formData.pieceCount || 1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pieceCount: parseInt(e.target.value || "1"),
                      })
                    }
                    placeholder="e.g. 24"
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">Material &amp; Craft</label>
                  <input
                    type="text"
                    value={formData.material || ""}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g. High-Fired Ceramic, 24K Gold Rim"
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Product Photograph with Cloudinary Upload */}
              <div className="space-y-2 p-3.5 bg-stone-50/70 border border-[#D9D0C1] rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-[#252522] flex items-center gap-1.5 text-xs">
                    <ImageIcon className="w-4 h-4 text-[#6E2023]" />
                    Product Photograph
                  </label>
                  <span className="text-[10px] text-[#8B8176]">Cloudinary CDN / URL</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  {/* Image Preview Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-[#D9D0C1] flex-shrink-0 flex items-center justify-center">
                    {formData.images?.[0]?.src ? (
                      <Image
                        src={formData.images[0].src}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-stone-300" />
                    )}
                  </div>

                  {/* Upload Controls & URL input */}
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6E2023] hover:bg-[#581a1c] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm transition-colors">
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Uploading to Cloudinary...
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-3.5 h-3.5" />
                            Upload Photo to Cloudinary
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-[#8B8176]">or paste image URL below</span>
                    </div>

                    <input
                      type="text"
                      value={formData.images?.[0]?.src || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          images: [{ src: e.target.value, alt: formData.name }],
                        })
                      }
                      placeholder="https://res.cloudinary.com/... or /images/hero/hero-stock.jpg"
                      className="w-full p-2 bg-white border border-[#D9D0C1] rounded-lg text-xs font-mono text-[#252522]"
                    />
                  </div>
                </div>

                {uploadStatus && (
                  <p
                    className={`text-[11px] leading-relaxed ${
                      uploadStatus.includes("successfully")
                        ? "text-emerald-700 font-medium"
                        : "text-amber-800"
                    }`}
                  >
                    {uploadStatus}
                  </p>
                )}
              </div>

              {/* Short & Long Description */}
              <div className="space-y-1">
                <label className="font-semibold text-[#252522]">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDescription: e.target.value })
                  }
                  placeholder="Catchy single-line description for store listings"
                  className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522]">Detailed Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Artisanal story, glazing technique, and styling notes..."
                  className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                />
              </div>

              {/* Tags & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Handcrafted, Dinner Set, Gold Rim"
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 text-[#6E2023] rounded focus:ring-[#6E2023]"
                    />
                    <span className="font-semibold text-[#252522]">
                      Feature on Storefront Homepage
                    </span>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-[#EADBC8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-[#D9D0C1] rounded-lg text-xs font-semibold text-[#84766A] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6E2023] hover:bg-[#55181A] text-[#FFF5E6] rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
