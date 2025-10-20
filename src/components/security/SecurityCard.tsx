
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
      <CardHeader className="pb-3 sm:pb-4">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full ${color} flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </div>
        <CardTitle className="text-sm sm:text-base lg:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 lg:px-6">
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default SecurityCard;
