
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryButtonProps {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  color: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const CategoryButton = ({ 
  id, 
  name, 
  icon: Icon, 
  count, 
  color, 
  isSelected, 
  onClick 
}: CategoryButtonProps) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
        isSelected
          ? "bg-blue-50 border-blue-200 border"
          : "hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="font-medium text-sm">{name}</span>
      </div>
      <Badge variant="secondary" className="text-xs">
        {count}
      </Badge>
    </button>
  );
};

export default CategoryButton;
