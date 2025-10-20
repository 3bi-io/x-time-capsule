import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Folder } from "lucide-react";
import CategoryButton from "./vault/CategoryButton";
import VaultItem from "./vault/VaultItem";
import { VAULT_CATEGORIES } from "@/data/constants";
import { AddVaultItemModal } from "./vault/AddVaultItemModal";
import { useVaultData } from "@/hooks/useVaultData";
import { Skeleton } from "@/components/ui/skeleton";
import type { VaultItemInput } from "@/lib/validationSchemas";

const VaultInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const { timeCapsules, loading, addTimeCapsule } = useVaultData();

  const handleAddItem = async (item: VaultItemInput) => {
    await addTimeCapsule({
      title: item.title,
      description: item.description || "",
      category: item.category,
      content: item.content || {},
    });
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
                count={timeCapsules.length}
                color="bg-slate-100"
                isSelected={selectedCategory === "all"}
                onClick={setSelectedCategory}
              />
              {VAULT_CATEGORIES.map((category) => (
                <CategoryButton
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                  count={timeCapsules.filter(t => t.category === category.id).length}
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
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                  <p>No items in this category yet</p>
                  <p className="text-sm mt-2">Click "Add New Item" to get started</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <VaultItem
                    key={item.id}
                    name={item.title}
                    type={item.category}
                    date={new Date(item.created_at).toLocaleDateString()}
                    status="Active"
                  />
                ))
              )}
              
              <Button 
                variant="outline" 
                className="w-full py-8 border-dashed"
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
    </section>
  );
};

export default VaultInterface;
