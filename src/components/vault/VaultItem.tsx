import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Edit, Trash2 } from "lucide-react";
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
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const VaultItem = ({ id, name, type, date, status, onEdit, onDelete }: VaultItemProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
        <div className="flex items-center space-x-4">
          <div className="bg-muted p-2 rounded">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-muted-foreground">
              {type} • Added {date}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50">
            {status}
          </Badge>
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
