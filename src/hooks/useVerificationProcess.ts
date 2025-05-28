
import { useState } from "react";

export const useVerificationProcess = () => {
  const [step, setStep] = useState(1);
  const [uploadStatus, setUploadStatus] = useState<"pending" | "uploading" | "uploaded">("pending");

  const handleFileUpload = () => {
    setUploadStatus("uploading");
    setTimeout(() => {
      setUploadStatus("uploaded");
      setStep(2);
    }, 2000);
  };

  const nextStep = () => setStep(prev => prev + 1);

  return {
    step,
    uploadStatus,
    handleFileUpload,
    nextStep
  };
};
