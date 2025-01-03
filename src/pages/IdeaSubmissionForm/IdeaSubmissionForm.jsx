"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import BasicDetails from "@/components/SubmissionComponents/BasicDetails";
import GoalsAndStage from "@/components/SubmissionComponents/GoalsAndStage";
import ConnectWallet from "@/components/SubmissionComponents/ConnectWallet";
import VerificationDetails from "@/components/SubmissionComponents/VerificationDetails";
import UserDetails from "@/components/SubmissionComponents/UserDetails";
import Summary from "@/components/SubmissionComponents/Summary";
const steps = [
  "User Details",
  "Basic Details",
  "Verification",
  "Goals & Stage",
  "Summary",
];

export default function IdeaSubmissionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const formData = useSelector((state) => state.form);

 

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <UserDetails  />;
      case 1:
        return <BasicDetails />;
      case 2:
        return <VerificationDetails  />;
      case 3:
        return <GoalsAndStage  />;
      case 4:
        return <Summary  />;
      default:
        return null;
    }
  };



  const isStepComplete = (step) => {
    switch (step) {
      case 0:
        return formData.ideaOwner && formData.contactEmail;
      case 1: // Basic Details
        return (
          formData.ideaName && formData.ideaDescription && formData.category
        );
      case 2: // Verification
        return formData.proofOfConcept;
      case 3: // Goals & Stage
        return formData.expectedOutcome && formData.currentStage;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Idea Submission Form</h1>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm">
        {steps.map((step, index) => (
          <span
           
            key={step}
            className={`${
              index <= currentStep ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {step}
          </span>
        ))}
      </div>
      {renderStep()}
    </div>
  );
}
