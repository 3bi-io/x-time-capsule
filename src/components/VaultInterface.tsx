
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CategoryButton from "@/components/vault/CategoryButton";
import VaultItem from "@/components/vault/VaultItem";
import { VAULT_CATEGORIES, MOCK_VAULT_ITEMS } from "@/data/constants";

const VaultInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState("documents");

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
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {VAULT_CATEGORIES.map((category) => (
                  <CategoryButton
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    icon={category.icon}
                    count={category.count}
                    color={category.color}
                    isSelected={selectedCategory === category.id}
                    onClick={setSelectedCategory}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {VAULT_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Add New Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_VAULT_ITEMS.map((item, index) => (
                    <VaultItem
                      key={index}
                      name={item.name}
                      type={item.type}
                      date={item.date}
                      status={item.status}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VaultInterface;
