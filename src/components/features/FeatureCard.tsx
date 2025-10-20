
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

const FeatureCard = ({ icon: Icon, title, description, iconColor }: FeatureCardProps) => {
  return (
    <div className="text-center">
      <div className={`${iconColor} p-2 sm:p-3 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
      </div>
      <h3 className="font-semibold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2 px-2">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-600 px-2">{description}</p>
    </div>
  );
};

export default FeatureCard;
