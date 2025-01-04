"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import BasicDetails from "@/components/SubmissionComponents/BasicDetails";
import GoalsAndStage from "@/components/SubmissionComponents/GoalsAndStage";
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
  
    const nextStep = () =>
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  
    const renderStep = () => {
      switch (currentStep) {
        case 0:
          return <UserDetails nextStep={nextStep} />;
        case 1:
          return <BasicDetails nextStep={nextStep} prevStep={prevStep} />;
        case 2:
          return <VerificationDetails nextStep={nextStep} prevStep={prevStep} />;
        case 3:
          return <GoalsAndStage nextStep={nextStep} prevStep={prevStep} />;
        case 4:
          return <Summary prevStep={prevStep} />;
        default:
          return null;
      }
    };
  
    const handleStepClick = (index) => {
      // Only allow moving to previous steps or next step if current step is complete
      if (
        index < currentStep ||
        (index === currentStep + 1 && isStepComplete(currentStep))
      ) {
        setCurrentStep(index);
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
              onClick={() => handleStepClick(index)}
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