import { Link } from "react-router-dom";

interface Tool {
  id: number;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  location: string;
  category: string;
  condition: string;
  status_product: string;
  owner: string;
  rating: number;
  reviews: number;
  lastSeen: string;
  image: string;
  isFavorite: boolean;
}

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (toolId: number) => void;
  viewMode?: "grid" | "list";
}

export default function ToolCard({
  tool,
  isFavorite,
  onToggleFavorite,
  viewMode = "grid",
}: ToolCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 ${
        viewMode === "list" ? "flex" : "min-h-[500px] flex flex-col"
      }`}
    >
      {/* Tool Image */}
      <div
        className={`relative bg-gray-50 p-4 ${viewMode === "list" ? "w-48 h-32" : "h-56"}`}
      >
        <button
          onClick={() => onToggleFavorite(tool.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-teal hover:bg-teal/10 transition-colors z-10"
        >
          <svg
            className={`w-4 h-4 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-teal"}`}
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <img
          src={tool.image}
          alt={tool.name}
          className={`object-contain mx-auto ${viewMode === "list" ? "w-full h-full" : "w-36 h-36"}`}
        />
      </div>

      {/* Tool Info */}
      <div
        className={`p-4 text-right space-y-3 ${viewMode === "list" ? "flex-1" : "flex-1 flex flex-col justify-between"}`}
      >
        {/* Tags */}
        <div className="flex justify-start gap-2 flex-wrap">
          <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full border border-green-200">
            {tool.status_product}
          </span>
          <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full">
            {tool.condition}
          </span>
          <span className="bg-orange/10 text-orange text-xs px-2 py-1 rounded-full">
            {tool.category}
          </span>
        </div>

        {/* Location & Share */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>{tool.location}</span>
          </div>
          <svg
            className="w-5 h-5 text-gray-400 hover:text-orange cursor-pointer transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
        </div>

        {/* Tool Name */}
        <h3 className="text-dark-blue font-bold text-lg">{tool.name}</h3>

        {/* Description */}
        <p className="text-gray-500 text-sm">{tool.description}</p>

        {/* Price */}
        <div className="text-orange font-bold">
          <span className="text-xl">{tool.price} درهم</span>
          <span className="text-sm"> / {tool.priceUnit}</span>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
            <span>{tool.owner}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>{tool.lastSeen}</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
              </svg>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-1">
              <span>{tool.reviews}</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/tool/${tool.id}`}
            className="flex-1 bg-dark-blue text-white py-3 rounded-lg font-medium hover:bg-dark-blue/90 transition-colors text-center block"
          >
            عرض التفاصيل
          </Link>
          <button className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
