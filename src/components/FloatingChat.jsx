import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";

const AI_LOGO_URL = "https://i.ibb.co.com/TxSKgNWK/Logo-SAHAJA-AI.png";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Halo! Saya SAHAJA AI, asisten virtual untuk Capella Hotel ✨. Ada yang bisa saya bantu terkait informasi kamar, fasilitas, atau reservasi Anda hari ini?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-sahaja-ai", handleOpenChat);
    return () => window.removeEventListener("open-sahaja-ai", handleOpenChat);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      setTimeout(() => window.addEventListener("mousedown", handleClickOutside), 10);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const generateLocalResponse = (text) => {
    const t = text.toLowerCase();
    if (t.includes("kamar") || t.includes("harga") || t.includes("pesan") || t.includes("booking") || t.includes("suite") || t.includes("room")) {
      return "Untuk pilihan akomodasi, kami memiliki Deluxe Suite ($450), Standard Room ($150), dan Presidential Suite ($1,200). Anda dapat melakukan reservasi dengan menekan menu 'Rooms' atau langsung dari Member Dashboard.";
    } else if (t.includes("fasilitas") || t.includes("kolam") || t.includes("spa") || t.includes("gym") || t.includes("wifi")) {
      return "Fasilitas kelas dunia kami meliputi Infinity Pool, Holistic Spa, Fitness Center, Fine Dining, dan layanan Wi-Fi berkecepatan tinggi gratis di seluruh area hotel.";
    } else if (t.includes("lokasi") || t.includes("alamat") || t.includes("dimana") || t.includes("letak")) {
      return "Capella Hotel berlokasi di Jl. Sudirman No. 45, Jakarta Pusat 10220. Letaknya sangat strategis di pusat kawasan bisnis dan hiburan.";
    } else if (t.includes("halo") || t.includes("hai") || t.includes("pagi") || t.includes("siang") || t.includes("malam")) {
      return "Halo! Selamat datang di Capella Hotel. Ada yang bisa saya bantu terkait reservasi atau informasi fasilitas kami?";
    } else if (t.includes("terima kasih") || t.includes("thanks") || t.includes("makasih")) {
      return "Dengan senang hati! Jangan ragu untuk bertanya lagi jika Anda membutuhkan bantuan lainnya.";
    } else {
      return "Maaf, saya belum sepenuhnya mengerti. Sebagai asisten SAHAJA AI, saya dapat membantu Anda dengan informasi mengenai ketersediaan kamar, fasilitas hotel, atau lokasi kami.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const responseText = generateLocalResponse(userMessage.content);
      const aiMessage = { role: "assistant", content: responseText };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="relative z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div ref={chatRef} className="absolute bottom-20 right-0 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-3xl w-[350px] h-[500px] flex flex-col overflow-hidden mb-4 transition-all duration-300 transform origin-bottom-right">
          
          {/* Header */}
          <div className="bg-[#0a0f1e] p-5 flex justify-between items-center text-white rounded-t-3xl border-b border-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3BCBBE]/20 to-[#F5A623]/10 opacity-70" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 p-1 shadow-[0_0_15px_rgba(59,203,190,0.3)]">
                <img 
                  src={AI_LOGO_URL} 
                  alt="Capella AI" 
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm font-serif tracking-wider text-white">SAHAJA AI</h3>
                <p className="text-[10px] text-[#3BCBBE] flex items-center gap-1.5 font-bold uppercase tracking-widest mt-0.5">
                  <span className="w-1.5 h-1.5 bg-[#3BCBBE] rounded-full animate-pulse shadow-[0_0_5px_#3BCBBE]"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors relative z-10 bg-white/5 p-2 rounded-full hover:bg-white/20">
              <FaTimes className="text-sm" />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#F8F9FA]">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-end gap-3 max-w-[85%]">
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 p-1 flex-shrink-0">
                      <img src={AI_LOGO_URL} alt="AI" className="w-full h-full object-contain"/>
                    </div>
                  )}
                  <div className={`p-4 text-[13px] leading-relaxed shadow-sm ${
                    msg.role === "user" 
                      ? "bg-[#0a0f1e] text-white rounded-2xl rounded-br-sm shadow-md" 
                      : "bg-white border border-gray-100 text-gray-700 rounded-2xl rounded-bl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 p-0.5 flex-shrink-0">
                    <img src={AI_LOGO_URL} alt="AI" className="w-full h-full object-contain"/>
                  </div>
                  <div className="bg-white border border-slate-100 text-slate-400 p-3 rounded-2xl rounded-tl-sm text-xs flex gap-1 items-center">
                      <span className="w-2 h-2 bg-[#3BCBBE] rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-[#3BCBBE] rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-[#3BCBBE] rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-3 rounded-b-3xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu..."
              className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-5 py-3 text-sm outline-none focus:border-[#3BCBBE] focus:ring-2 focus:ring-[#3BCBBE]/20 focus:bg-white transition-all shadow-inner text-gray-700"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 bg-[#0a0f1e] hover:bg-[#1a243d] text-white rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_10px_rgba(0,0,0,0.15)] group flex-shrink-0"
            >
              <FaPaperPlane className="text-sm text-[#3BCBBE] group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "scale-0 opacity-0 hidden" : "scale-100 opacity-100"} w-14 h-14 bg-[#0a0f1e] hover:bg-[#1a243d] rounded-full flex items-center justify-center text-[#3BCBBE] hover:text-white shadow-[0_8px_20px_rgba(10,15,30,0.4)] hover:shadow-[0_10px_25px_rgba(59,203,190,0.4)] hover:scale-110 transition-all duration-300 z-50 border border-gray-800`}
      >
        <FaCommentDots className="text-2xl" />
      </button>
    </div>
  );
}