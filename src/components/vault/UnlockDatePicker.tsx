import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Lock, Unlock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UnlockDatePickerProps {
  unlockDate?: string | null;
  onChange: (date: string | null) => void;
}

const UnlockDatePicker = ({ unlockDate, onChange }: UnlockDatePickerProps) => {
  const [enabled, setEnabled] = useState(!!unlockDate);
  const [dateValue, setDateValue] = useState(
    unlockDate ? new Date(unlockDate).toISOString().split('T')[0] : ""
  );

  const handleToggle = () => {
    if (enabled) {
      setEnabled(false);
      setDateValue("");
      onChange(null);
    } else {
      setEnabled(true);
    }
  };

  const handleDateChange = (value: string) => {
    setDateValue(value);
    onChange(value ? new Date(value).toISOString() : null);
  };

  const isUnlocked = unlockDate ? new Date(unlockDate) <= new Date() : true;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          {isUnlocked ? (
            <Unlock className="h-4 w-4 text-emerald-600" />
          ) : (
            <Lock className="h-4 w-4 text-amber-600" />
          )}
          Time-Based Access
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleToggle}
        >
          {enabled ? "Disable" : "Enable"}
        </Button>
      </div>

      {enabled && (
        <>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={dateValue}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              placeholder="Select unlock date"
            />
          </div>
          <Alert>
            <AlertDescription className="text-xs">
              This item will be locked until the specified date. Access will be automatically
              granted when the date is reached.
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
};

export default UnlockDatePicker;
