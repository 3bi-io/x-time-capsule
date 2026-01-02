import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Edit, Trash2, Eye, Lock, Unlock } from "lucide-react";
import { VAULT_CATEGORIES } from "@/data/constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface VaultItemProps {
  id: string;
  name: string;
  type: string;
  date: string;
  status: string;
  description?: string;
  unlockDate?: string | null;
  onView?: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const VaultItem = ({ 
  id, 
  name, 
  type, 
  date, 
  status, 
  description,
  unlockDate,
  onView,
  onEdit, 
  onDelete 
}: VaultItemProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const category = VAULT_CATEGORIES.find(c => c.id === type);
  const CategoryIcon = category?.icon || FileText;
  const isLocked = unlockDate && new Date(unlockDate) > new Date();

  return (
    <>
      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className={`p-2 rounded ${category?.color || 'bg-muted'}`}>
            <CategoryIcon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-medium truncate">{name}</h4>
              {isLocked && (
                <Lock className="h-3 w-3 text-amber-600" />
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {category?.name || type} • Added {date}
              {description && ` • ${description.slice(0, 50)}${description.length > 50 ? '...' : ''}`}
            </p>
            {unlockDate && (
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                {isLocked ? (
                  <>
                    <Lock className="h-3 w-3" />
                    Unlocks {new Date(unlockDate).toLocaleDateString()}
                  </>
                ) : (
                  <>
                    <Unlock className="h-3 w-3 text-green-600" />
                    Unlocked
                  </>
                )}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <Badge 
            variant="outline" 
            className={`text-xs sm:text-sm hidden sm:inline-flex ${
              isLocked 
                ? 'text-amber-700 border-amber-200 bg-amber-50' 
                : 'text-emerald-700 border-emerald-200 bg-emerald-50'
            }`}
          >
            {isLocked ? 'Locked' : status}
          </Badge>
          {onView && (
            <Button variant="ghost" size="sm" onClick={() => onView(id)}>
              <Eye className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => onEdit(id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Vault Item?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(id);
                setShowDeleteDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default VaultItem;
