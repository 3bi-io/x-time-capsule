import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { VAULT_CATEGORIES } from "@/data/constants";
import { TimeCapsule } from "@/hooks/useVaultData";
import { Calendar, Edit, Lock, Unlock, FileText } from "lucide-react";
import { format } from "date-fns";

interface VaultItemViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  item: TimeCapsule;
}

const VaultItemViewModal = ({ isOpen, onClose, onEdit, item }: VaultItemViewModalProps) => {
  const category = VAULT_CATEGORIES.find(c => c.id === item.category);
  const isLocked = item.unlock_date && new Date(item.unlock_date) > new Date();
  const CategoryIcon = category?.icon || FileText;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${category?.color || 'bg-muted'}`}>
                <CategoryIcon className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-xl">{item.title}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {category?.name || item.category}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50">
              Active
            </Badge>
            {isLocked ? (
              <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50">
                <Lock className="h-3 w-3 mr-1" />
                Locked until {format(new Date(item.unlock_date!), 'MMM d, yyyy')}
              </Badge>
            ) : item.unlock_date ? (
              <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                <Unlock className="h-3 w-3 mr-1" />
                Unlocked
              </Badge>
            ) : null}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">
              {item.description || "No description provided"}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Created</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(item.created_at), 'MMM d, yyyy')}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Last Updated</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(item.updated_at), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          {item.unlock_date && (
            <div>
              <h4 className="text-sm font-medium mb-1">Unlock Date</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(item.unlock_date), 'MMMM d, yyyy')}
              </p>
            </div>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Item
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VaultItemViewModal;
