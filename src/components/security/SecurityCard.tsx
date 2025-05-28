
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SecurityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const SecurityCard = ({ icon: Icon, title, description, color }: SecurityCardProps) => {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mx-auto mb-4`}>
          <Icon className="h-8 w-8" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default SecurityCard;
