import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, CheckCircle2, DollarSign, Package, ShoppingCart, 
  Layers, RefreshCw, X, AlertCircle, Sparkles, ExternalLink, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard = ({ onNavigate }) => {
  const { user, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('products');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  });

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State for Adding / Editing Product
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Rings',
    price: '',
    originalPrice: '',
    karat: '18K',
    metal: 'Yellow Gold',
    grossWeight: '5.20 g',
    diamondWeight: '0.85 ct VVS-EF',
    hallmark: 'BIS 916 & IGI Certified',
    stockCount: 10,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    description: '',
    images: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Stats
      const statsRes = await fetch('/api/orders/stats');
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);

      // 2. Fetch Products
      const prodRes = await fetch('/api/products');
      const prodData = await prodRes.json();
      if (prodData.success) setProducts(prodData.data);

      // 3. Fetch Orders
      const orderRes = await fetch('/api/orders');
      const orderData = await orderRes.json();
      if (orderData.success) setOrders(orderData.data);
    } catch (err) {
      console.error('Error fetching dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Rings',
      price: '',
      originalPrice: '',
      karat: '18K',
      metal: 'Yellow Gold',
      grossWeight: '5.20 g',
      diamondWeight: '0.85 ct VVS-EF',
      hallmark: 'BIS 916 & IGI Certified',
      stockCount: 10,
      isFeatured: true,
      isBestSeller: false,
      isNewArrival: true,
      description: '',
      images: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || '',
      karat: prod.karat || '18K',
      metal: prod.metal || 'Yellow Gold',
      grossWeight: prod.grossWeight || '',
      diamondWeight: prod.diamondWeight || '',
      hallmark: prod.hallmark || 'BIS 916',
      stockCount: prod.stockCount || 10,
      isFeatured: prod.isFeatured || false,
      isBestSeller: prod.isBestSeller || false,
      isNewArrival: prod.isNewArrival || false,
      description: prod.description || '',
      images: prod.images?.join(', ') || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const imagesArray = productForm.images
      .split(',')
      .map(url => url.trim())
      .filter(Boolean);

    const payload = {
      ...productForm,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
      stockCount: Number(productForm.stockCount),
      images: imagesArray.length > 0 ? imagesArray : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop']
    };

    try {
      if (editingProduct) {
        // Update Product
        const res = await fetch(`/api/products/${editingProduct.id || editingProduct.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setIsModalOpen(false);
          fetchDashboardData();
        }
      } else {
        // Create Product
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setIsModalOpen(false);
          fetchDashboardData();
        }
      }
    } catch (err) {
      console.error('Error saving product', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to retire this jewelry creation from the public catalog?')) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        fetchDashboardData();
      } catch (err) {
        console.error('Error deleting product', err);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus })
      });
      fetchDashboardData();
    } catch (err) {
      console.error('Error updating order status', err);
    }
  };

  return (
    <div className="luxury-container py-12 space-y-10">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5">
              <Sparkles size={13} /> PERN Haute Joaillerie Control Center (PostgreSQL)
            </span>
            <span className="bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded-xs">
              LIVE
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-white mt-1">
            JaiShree Jwellers Vault Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="btn-outline-gold text-xs py-2 px-3 flex items-center gap-1.5"
            title="Refresh Store Data"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn-gold text-xs py-2 px-4 flex items-center gap-1.5"
          >
            <Plus size={15} /> Add Jewelry Piece
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 bg-[#121218] border border-white/10 rounded-xs space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-white/50 block">Cumulative Sales</span>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#d4af37]">
            $ {stats.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
          </p>
          <p className="text-[10px] text-emerald-400">Verified prepaid & cash orders</p>
        </div>

        <div className="p-6 bg-[#121218] border border-white/10 rounded-xs space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-white/50 block">Customer Commissions</span>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-white">
            {stats.totalOrders}
          </p>
          <p className="text-[10px] text-white/40">{stats.pendingOrders || 0} Pending Fulfillment</p>
        </div>

        <div className="p-6 bg-[#121218] border border-white/10 rounded-xs space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-white/50 block">Active Masterpieces</span>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-white">
            {products.length}
          </p>
          <p className="text-[10px] text-white/40">Across 4 Fine Categories</p>
        </div>

        <div className="p-6 bg-[#121218] border border-white/10 rounded-xs space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-white/50 block">Delivery Pipeline</span>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400">
            {stats.deliveredOrders || 1} Delivered
          </p>
          <p className="text-[10px] text-white/40">100% Insured Armored Transit</p>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="flex border-b border-white/10 text-xs uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('products')}
          className={`py-3 px-6 border-b-2 font-medium transition-colors ${
            activeTab === 'products'
              ? 'border-[#d4af37] text-[#d4af37]'
              : 'border-transparent text-white/60 hover:text-white'
          }`}
        >
          Jewelry Pieces ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-6 border-b-2 font-medium transition-colors ${
            activeTab === 'orders'
              ? 'border-[#d4af37] text-[#d4af37]'
              : 'border-transparent text-white/60 hover:text-white'
          }`}
        >
          Orders & Fulfillment ({orders.length})
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGER */}
      {activeTab === 'products' && (
        <div className="bg-[#121218] border border-white/10 rounded-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/70">
              <thead className="bg-[#0e0e14] border-b border-white/10 text-[10px] uppercase tracking-widest text-[#d4af37]">
                <tr>
                  <th className="py-4 px-6">Piece</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Gold & Metal</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-6 flex items-center gap-3">
                      <img
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200&auto=format&fit=crop'}
                        alt=""
                        className="w-12 h-14 object-cover rounded-xs border border-white/10"
                      />
                      <div>
                        <h4 className="font-serif text-sm text-white font-medium line-clamp-1">{p.name}</h4>
                        <span className="text-[10px] text-white/40">{p.diamondWeight || p.grossWeight}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6">{p.category}</td>
                    <td className="py-3 px-6">
                      <span className="bg-white/5 px-2 py-0.5 rounded-xs text-[11px]">
                        {p.karat} • {p.metal}
                      </span>
                    </td>
                    <td className="py-3 px-6 font-serif text-sm text-white font-medium">
                      $ {p.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                    </td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-semibold ${
                        (p.stockCount || 10) > 3 ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                      }`}>
                        {p.stockCount || 10} Units
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 text-white/60 hover:text-[#d4af37] transition-colors"
                        title="Edit Piece"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-white/60 hover:text-red-400 transition-colors"
                        title="Delete Piece"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGER */}
      {activeTab === 'orders' && (
        <div className="bg-[#121218] border border-white/10 rounded-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/70">
              <thead className="bg-[#0e0e14] border-b border-white/10 text-[10px] uppercase tracking-widest text-[#d4af37]">
                <tr>
                  <th className="py-4 px-6">Dossier / Date</th>
                  <th className="py-4 px-6">Client Destination</th>
                  <th className="py-4 px-6">Items Reserved</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <strong className="font-serif text-sm text-[#d4af37] block">{o.orderNumber}</strong>
                      <span className="text-[10px] text-white/40">
                        {new Date(o.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-white font-medium">{o.customer?.name}</p>
                      <p className="text-[11px] text-white/50">{o.customer?.city}, {o.customer?.state}</p>
                      <p className="text-[11px] text-white/40">{o.customer?.phone}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-white font-medium">{o.items?.length || 1} Piece(s)</span>
                      <p className="text-[10px] text-white/40 line-clamp-1">{o.items?.[0]?.name}</p>
                    </td>
                    <td className="py-4 px-6 font-serif text-sm text-white font-medium">
                      $ {o.totalAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                    </td>
                    <td className="py-4 px-6">
                      <span className="block text-[11px] text-white/80">{o.paymentMethod}</span>
                      <span className={`text-[10px] font-semibold ${
                        o.paymentStatus === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="bg-[#181824] border border-white/15 text-xs text-white p-1.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing in Vault</option>
                        <option value="Shipped">Dispatched (Armored)</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121218] border border-[#d4af37]/40 max-w-2xl w-full rounded-xs shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0e0e13]">
              <h3 className="font-serif text-xl text-white">
                {editingProduct ? 'Edit Jewelry Masterpiece' : 'Commission New Jewelry Piece'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 block mb-1">Creation Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Mughal Jadau Choker"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Rings">Rings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bracelets">Bracelets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-white/70 block mb-1">Price ($ USD) *</label>
                  <input
                    type="number"
                    required
                    placeholder="2500"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1">Original Price (Strikethrough)</label>
                  <input
                    type="number"
                    placeholder="95000"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1">Vault Inventory Units *</label>
                  <input
                    type="number"
                    required
                    placeholder="10"
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 block mb-1">Gold Karat</label>
                  <select
                    value={productForm.karat}
                    onChange={(e) => setProductForm({ ...productForm, karat: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="14K">14K Gold</option>
                    <option value="18K">18K Gold</option>
                    <option value="22K">22K Gold (Royal Pure)</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/70 block mb-1">Primary Metal Finish</label>
                  <select
                    value={productForm.metal}
                    onChange={(e) => setProductForm({ ...productForm, metal: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Yellow Gold">Yellow Gold</option>
                    <option value="Rose Gold">Rose Gold</option>
                    <option value="White Gold">White Gold / Platinum</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 block mb-1">Gross Gold Weight (g)</label>
                  <input
                    type="text"
                    placeholder="e.g. 6.45 g"
                    value={productForm.grossWeight}
                    onChange={(e) => setProductForm({ ...productForm, grossWeight: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1">Diamond Carat / Details</label>
                  <input
                    type="text"
                    placeholder="e.g. 1.20 ct VVS-EF"
                    value={productForm.diamondWeight}
                    onChange={(e) => setProductForm({ ...productForm, diamondWeight: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/70 block mb-1">High-Res Image URLs (Comma separated)</label>
                <textarea
                  rows={2}
                  placeholder="https://images.unsplash.com/..., https://images.unsplash.com/..."
                  value={productForm.images}
                  onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                  className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Artisan Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the craftsmanship, hallmarking, and beauty..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="accent-[#d4af37]"
                  />
                  <span>Featured on Homepage</span>
                </label>
                <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                    className="accent-[#d4af37]"
                  />
                  <span>Bestseller Badge</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline-gold text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold text-xs py-2 px-6">
                  {editingProduct ? 'Save Updates' : 'Publish Creation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
