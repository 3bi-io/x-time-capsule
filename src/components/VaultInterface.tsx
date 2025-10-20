import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Folder } from "lucide-react";
import CategoryButton from "./vault/CategoryButton";
import VaultItem from "./vault/VaultItem";
import { VAULT_CATEGORIES } from "@/data/constants";
import { AddVaultItemModal } from "./vault/AddVaultItemModal";
import EditVaultItemModal from "./vault/EditVaultItemModal";
import { useVaultData, type TimeCapsule } from "@/hooks/useVaultData";
import { Skeleton } from "@/components/ui/skeleton";
import type { VaultItemInput } from "@/lib/validationSchemas";
import EmptyState from "./EmptyState";
import { FileText } from "lucide-react";

const VaultInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimeCapsule | null>(null);
  const { timeCapsules, loading, addTimeCapsule, updateTimeCapsule, deleteTimeCapsule } = useVaultData();

  const handleAddItem = async (item: VaultItemInput) => {
    await addTimeCapsule({
      title: item.title,
      description: item.description || "",
      category: item.category,
      content: item.content || {},
    });
  };

  const handleEditItem = (id: string) => {
    const item = timeCapsules.find(item => item.id === id);
    if (item) setEditingItem(item);
  };

  const handleSaveEdit = async (id: string, updates: Partial<TimeCapsule>) => {
    await updateTimeCapsule(id, updates);
    setEditingItem(null);
  };

  const handleDeleteItem = async (id: string) => {
    await deleteTimeCapsule(id);
  };

  // Calculate counts for each category
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return timeCapsules.length;
    return timeCapsules.filter(item => item.category === categoryId).length;
  };

  const filteredItems = selectedCategory === "all"
    ? timeCapsules
    : timeCapsules.filter(item => item.category === selectedCategory);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Secure Digital Vault</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Organize and protect your most important information in categories that make sense for your family.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-2">
              <CategoryButton
                id="all"
                name="All Items"
                icon={Folder}
                count={getCategoryCount("all")}
                color="bg-slate-100 text-slate-700"
                isSelected={selectedCategory === "all"}
                onClick={setSelectedCategory}
              />
              {VAULT_CATEGORIES.map((category) => (
                <CategoryButton
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                  count={getCategoryCount(category.id)}
                  color={category.color}
                  isSelected={selectedCategory === category.id}
                  onClick={setSelectedCategory}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4">
              {loading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </>
              ) : filteredItems.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title={selectedCategory === "all" ? "No vault items yet" : "No items in this category"}
                  description={
                    selectedCategory === "all"
                      ? "Protect your important information by adding your first vault item"
                      : `No items have been added to the ${VAULT_CATEGORIES.find(c => c.id === selectedCategory)?.name || 'this'} category yet`
                  }
                  actionLabel="Add First Item"
                  onAction={() => setModalOpen(true)}
                />
              ) : (
                filteredItems.map((item) => (
                  <VaultItem
                    key={item.id}
                    id={item.id}
                    name={item.title}
                    type={item.category}
                    date={new Date(item.created_at).toLocaleDateString()}
                    status="Active"
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                  />
                ))
              )}
              
              <Button 
                variant="outline" 
                className="w-full py-8 border-dashed hover:border-solid hover:bg-slate-50"
                onClick={() => setModalOpen(true)}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Item
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddVaultItemModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAdd={handleAddItem}
      />
      {editingItem && (
        <EditVaultItemModal
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
          item={editingItem}
        />
      )}
    </section>
  );
};

export default VaultInterface;
