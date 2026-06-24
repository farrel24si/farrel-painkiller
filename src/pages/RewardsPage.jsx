import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, Crown, CheckCircle2, XCircle, ArrowRight, Star } from "lucide-react";
import axios from "axios";

// Copy constants from MemberDashboard for tier logic
const TIERS = [
  { name: "Silver", min: 0, max: 1999, color: "#A8A8A8" },
  { name: "Gold", min: 2000, max: 4999, color: "#F5A623" },
  { name: "Platinum", min: 5000, max: 99999, color: "#3BCBBE" },
];

function getTier(points) {
  return TIERS.find(t => points >= t.min && points <= t.max) || TIERS[0];
}

export default function RewardsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [pointsBalance, setPointsBalance] = useState(0);
  const [cumulativePoints, setCumulativePoints] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [alert, setAlert] = useState(null);
  
  // Modal State
  const [selectedReward, setSelectedReward] = useState(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucGR6bHB4bGF0aGZuZnpnZG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzg3MTAsImV4cCI6MjA5NjkxNDcxMH0.wQ6qy7pi1oPUcp0t-oCNyfUPirlZHew-gnfXdt7yc90";
  const BASE_URL = "https://pnpdzlpxlathfnfzgdol.supabase.co/rest/v1";
  const headers = { apikey: API_KEY, Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" };

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3500);
  };

  const fetchData = async (userId) => {
    try {
      setIsFetching(true);
      
      const [pointsRes, rewardsRes, redemptionsRes] = await Promise.all([
        axios.get(`${BASE_URL}/points_ledger?user_id=eq.${userId}`, { headers }),
        axios.get(`${BASE_URL}/rewards?is_active=eq.true`, { headers }),
        axios.get(`${BASE_URL}/redemptions?user_id=eq.${userId}&select=*,rewards(name)&order=created_at.desc`, { headers })
      ]);
      
      const pts = pointsRes.data;
      const balance = pts.reduce((sum, r) => sum + r.amount, 0);
      const cumulative = pts.filter(r => r.type === 'earn_booking').reduce((sum, r) => sum + r.amount, 0);
      
      setPointsBalance(balance);
      setCumulativePoints(cumulative);
      setRewards(rewardsRes.data);
      setRedemptions(redemptionsRes.data);
      
    } catch (error) {
      console.error("Gagal mengambil data rewards:", error);
      showAlert("error", "Gagal memuat data rewards.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (!session) { navigate("/login"); return; }
    
    const parsedUser = JSON.parse(session);
    setUser(parsedUser);
    fetchData(parsedUser.id);
  }, [navigate]);

  const handleRedeem = async () => {
    if (!selectedReward) return;
    
    setIsRedeeming(true);
    try {
      // 1. Insert ke redemptions
      const redemptionPayload = {
        user_id: user.id,
        reward_id: selectedReward.id,
        points_spent: selectedReward.points_required,
        status: "approved"
      };

      const redemptionRes = await axios.post(`${BASE_URL}/redemptions`, redemptionPayload, {
        headers: { ...headers, Prefer: "return=representation" }
      });
      
      const newRedemption = redemptionRes.data[0];

      // 2. Insert ke points_ledger
      const ledgerPayload = {
        user_id: user.id,
        amount: -selectedReward.points_required,
        type: "redeem",
        reference_id: newRedemption.id,
        description: `Tukar poin untuk ${selectedReward.name}`
      };

      await axios.post(`${BASE_URL}/points_ledger`, ledgerPayload, { headers });

      showAlert("success", `Berhasil menukarkan ${selectedReward.points_required} poin untuk ${selectedReward.name}!`);
      setSelectedReward(null);
      fetchData(user.id);

    } catch (error) {
      console.error(error);
      showAlert("error", "Gagal melakukan penukaran poin. Silakan coba lagi.");
    } finally {
      setIsRedeeming(false);
    }
  };

  if (!user) return null;

  const currentTier = getTier(cumulativePoints);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="min-h-screen bg-[#F8F9FA] pb-20 font-sans"
    >
      {/* Alert */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring" }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-full shadow-lg font-bold text-sm flex items-center gap-3 backdrop-blur-xl border border-white/20 ${
              alert.type === "success" ? "bg-[#48BB78]/90 text-white" : "bg-[#E53E3E]/90 text-white"
            }`}
          >
            {alert.type === "success" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            {alert.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        
        {/* HEADER */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-[#3BCBBE] text-3xl font-serif font-bold shadow-inner">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Capella Rewards</p>
              <h1 className="text-3xl md:text-4xl font-serif text-gray-900 font-bold mb-2">{user.name}</h1>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-sm font-bold shadow-sm" style={{ color: currentTier.color }}>
                <Crown size={16} /> {currentTier.name} Member
              </div>
            </div>
          </div>
          <div className="text-center md:text-right bg-[#0F1729] text-white px-10 py-6 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#3BCBBE]/20 rounded-full blur-2xl"></div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1 relative z-10">Saldo Poin</p>
            <p className="text-5xl font-black relative z-10">
              {pointsBalance.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* KATALOG REWARDS */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 font-serif mb-8 flex items-center gap-3">
            <Gem className="text-[#3BCBBE]" /> Katalog Hadiah
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full">
                <div className="h-48 relative overflow-hidden">
                  <img src={reward.image_url} alt={reward.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-[#0F1729] text-sm shadow-lg flex items-center gap-1.5">
                    <Star size={14} className="text-[#F5A623]" /> {reward.points_required.toLocaleString("id-ID")} Poin
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[#3BCBBE] text-[10px] font-bold uppercase tracking-widest mb-2">{reward.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 font-serif mb-3">{reward.name}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-8 flex-grow">{reward.description}</p>
                  
                  <button
                    onClick={() => setSelectedReward(reward)}
                    disabled={pointsBalance < reward.points_required}
                    className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      pointsBalance >= reward.points_required 
                        ? "bg-[#0F1729] hover:bg-[#1a2332] text-white shadow-[0_10px_30px_rgba(15,23,41,0.2)] hover:-translate-y-1"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {pointsBalance >= reward.points_required ? (
                      <>Tukar Poin <ArrowRight size={16} /></>
                    ) : (
                      "Poin Tidak Cukup"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIWAYAT PENUKARAN */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-serif mb-8 flex items-center gap-3">
            <CheckCircle2 className="text-[#3BCBBE]" /> Riwayat Penukaran
          </h2>
          
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
            {redemptions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Tanggal</th>
                      <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Hadiah</th>
                      <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Poin</th>
                      <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {redemptions.map((redemption) => (
                      <tr key={redemption.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5 text-sm text-gray-600 font-medium">
                          {new Date(redemption.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-gray-900">
                          {redemption.rewards?.name || "Hadiah"}
                        </td>
                        <td className="px-8 py-5 text-sm text-gray-600 font-medium">
                          <span className="text-[#E53E3E]">- {redemption.points_spent.toLocaleString("id-ID")}</span>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            redemption.status === 'approved' ? 'bg-[#48BB78]/10 text-[#48BB78]' : 'bg-[#F5A623]/10 text-[#F5A623]'
                          }`}>
                            {redemption.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500 font-medium">
                Belum ada riwayat penukaran poin.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MODAL KONFIRMASI REDEEM */}
      <AnimatePresence>
        {selectedReward && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !isRedeeming && setSelectedReward(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl p-8 z-10 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-[#3BCBBE]/10 rounded-full flex items-center justify-center text-[#3BCBBE] text-3xl mb-6">
                <Gem />
              </div>
              <h3 className="text-2xl font-bold font-serif text-gray-900 mb-2">Konfirmasi Penukaran</h3>
              <p className="text-gray-500 mb-6 font-light">
                Anda akan menukarkan <strong className="text-[#3BCBBE]">{selectedReward.points_required.toLocaleString("id-ID")} Poin</strong> untuk mendapatkan <strong>{selectedReward.name}</strong>.
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedReward(null)}
                  disabled={isRedeeming}
                  className="flex-1 py-4 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleRedeem}
                  disabled={isRedeeming}
                  className="flex-1 py-4 rounded-xl font-bold text-white bg-[#0F1729] hover:bg-[#1a2332] shadow-lg transition-colors flex justify-center items-center gap-2"
                >
                  {isRedeeming ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    "Konfirmasi"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
