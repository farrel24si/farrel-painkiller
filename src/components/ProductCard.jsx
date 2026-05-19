import Card from "./Card";
import Button from "./Button";

export default function ProductCard({ image, title, category, price, description }) {
  return (
    <Card>
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-[10px] mb-4 shadow-sm" />
      <div>
        <span className="inline-block bg-[#3BCBBE] bg-opacity-20 text-[#3BCBBE] text-xs px-3 py-1 rounded-full mb-3 font-bold">
          {category}
        </span>
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-400 text-sm font-bold mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
          <h3 className="text-xl font-bold text-gray-800">{price}</h3>
          <Button type="primary">Book Now</Button>
        </div>
      </div>
    </Card>
  );
}