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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const systemPrompt = {
        role: "system",
        content: "Kamu adalah asisten virtual SAHAJA AI untuk website hotel 'Capella Hotel'. Jawablah dengan ramah, elegan, profesional, dan gunakan bahasa Indonesia yang sopan. Informasi hotel: Kamar yang tersedia adalah Deluxe Suite ($450), Standard Room ($150), dan Presidential Suite ($1,200). Fasilitas mencakup Kolam Renang, Spa & Sauna, Fitness Center, Restoran, Parkir Gratis, dan Wi-Fi Cepat. Arahkan pengguna untuk melakukan 'Cek Ketersediaan' di form atas jika ingin memesan kamar."
      };

      const apiUrl = import.meta.env.VITE_CEREBRAS_API_URL;
      const apiKey = import.meta.env.VITE_CEREBRAS_API_KEY;

      const response = await axios.post(
        apiUrl,
        {
          model: "zai-glm-4.7", 
          messages: [systemPrompt, ...messages, userMessage],
          temperature: 0.7,
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiMessage = { role: "assistant", content: response.data.choices[0].message.content };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      if (error.response) {
        console.error("Detail API Error:", error.response.data);
      } else {
        console.error("Network/CORS Error:", error.message);
      }
      setMessages((prev) => [...prev, { role: "assistant", content: "Maaf, sistem sedang sibuk. Silakan hubungi kami via WhatsApp atau coba beberapa saat lagi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div ref={chatRef} className="absolute bottom-20 right-0 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-3xl w-[350px] h-[500px] flex flex-col overflow-hidden mb-4 transition-all duration-300 transform origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#313860] to-[#3BCBBE] p-4 flex justify-between items-center text-white rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 p-1">
                <img 
                  src={AI_LOGO_URL} 
                  alt="Capella AI" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm">Capella Hotel X SAHAJA AI</h3>
                <p className="text-[10px] text-teal-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-end gap-2">
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 p-0.5 flex-shrink-0">
                      <img src={AI_LOGO_URL} alt="AI" className="w-full h-full object-contain"/>
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 text-sm shadow-sm ${
                    msg.role === "user" 
                      ? "bg-[#3BCBBE] text-white rounded-2xl rounded-tr-sm" 
                      : "bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm"
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
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2 rounded-b-3xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya seputar fasilitas..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm outline-none focus:border-[#3BCBBE] focus:bg-white transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-gradient-to-r from-[#313860] to-[#3BCBBE] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <FaPaperPlane className="text-xs" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "scale-0 opacity-0 hidden" : "scale-100 opacity-100"} w-14 h-14 bg-gradient-to-r from-[#313860] to-[#3BCBBE] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#3BCBBE]/30 hover:scale-110 transition-all duration-300 z-50`}
      >
        <FaCommentDots className="text-2xl" />
      </button>
    </div>
  );
}