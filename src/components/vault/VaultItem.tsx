
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface VaultItemProps {
  name: string;
  type: string;
  date: string;
  status: string;
}

const VaultItem = ({ name, type, date, status }: VaultItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="bg-slate-100 p-2 rounded">
          <FileText className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <h4 className="font-medium text-slate-900">{name}</h4>
          <p className="text-sm text-slate-500">
            {type} • Added {date}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Badge 
          variant="outline" 
          className="text-emerald-700 border-emerald-200 bg-emerald-50"
        >
          {status}
        </Badge>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </div>
    </div>
  );
};

export default VaultItem;
