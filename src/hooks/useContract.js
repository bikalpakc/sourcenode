import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { contractABI } from "@/constants/contractABI";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const useContract = () => {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [ideaData, setIdeaData] = useState(null);

  // Helper: create a contract instance
  const getContract = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error("Ethereum object not found. Install MetaMask.");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return new ethers.Contract(contractAddress, contractABI, signer);
    } catch (err) {
      console.error("Error creating contract instance:", err);
      throw new Error("Failed to connect to wallet");
    }
  }, []);

  // Fetch all ideas
  const fetchAllIdeas = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = await getContract();
      const [
        ids,
        uniqueIds,
        ideaOwners,
        ideaTitles,
        ideaDescription,
        timestamps,
        currentStages,
        submittors,
      ] = await contract.getAllIdeasSummary();

      const formattedIdeas = ids.map((id, index) => ({
        id: Number(id), // ethers v6 returns bigint, need to convert to number
        uniqueId: uniqueIds[index],
        ideaOwner: ideaOwners[index],
        ideaTitle: ideaTitles[index],
        ideaDescription: ideaDescription[index],
        timestamp: new Date(Number(timestamps[index]) * 1000).toLocaleString(),
        currentStage: currentStages[index],
        submittor: submittors[index],
      }));

      setIdeas(formattedIdeas);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching ideas:", err);
    } finally {
      setIsLoading(false);
    }
  }, [getContract]);

  // Fetch a single idea by unique ID
  const fetchIdeaByUniqueId = useCallback(
    async (uniqueId) => {
      try {
        setError(null);
        setIsLoading(true);

        const contract = await getContract();
        const [metadata, details, submissionInfo] =
          await contract.getIdeaByUniqueId(uniqueId);

        const ideaDetails = {
          // Metadata
          ideaOwner: metadata.ideaOwner,
          contactEmail: metadata.contactEmail,
          ideaTitle: metadata.ideaTitle,
          ideaDescription: metadata.ideaDescription,
          ideaCategory: metadata.ideaCategory,

          // Details
          proofOfConcept: details.proofOfConcept,
          supportingDocuments: details.supportingDocuments,
          expectedOutcome: details.expectedOutcome,
          currentStage: details.currentStage,
          contributors: details.contributors,

          // Submission Info
          timestamp: new Date(
            Number(submissionInfo.timestamp) * 1000
          ).toLocaleString(),
          submittor: submissionInfo.submittor,
          uniqueId: submissionInfo.uniqueId,
        };

        setIdeaData(ideaDetails);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching idea:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [getContract]
  );

  // Submit a new idea
  const submitIdea = useCallback(
    async (formData) => {
      try {
        setIsSubmitting(true);
        setError(null);

        const contract = await getContract();

        // Convert supporting documents to array of URLs
        const supportingDocsUrls = formData.supportingDocuments.map(
          (doc) => doc.url
        );

        const tx = await contract.submitIdea(
          formData.ideaOwner,
          formData.contactEmail,
          formData.ideaTitle,
          formData.ideaDescription,
          formData.ideaCategory,
          formData.proofOfConcept,
          supportingDocsUrls,
          formData.currentStage,
          formData.contributors || []
        );
        // Wait for transaction confirmation and get the events
        const receipt = await tx.wait();

        // Find the IdeaSubmissionInitiated event
        const initiatedEvent = receipt.logs?.find((log) => {
          try {
            const parsedLog = contract.interface.parseLog(log);
            return parsedLog.name === "IdeaSubmissionInitiated";
          } catch (err) {
            return false;
          }
        });

        // Get the uniqueId from the event
        let uniqueId;
        if (initiatedEvent) {
          const parsedLog = contract.interface.parseLog(initiatedEvent);
          uniqueId = parsedLog.args.uniqueId;
        }

        return uniqueId;
      } catch (err) {
        console.error("Error submitting idea:", err);
        setError(err.message);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [getContract]
  );

  // Listen for new idea submissions
  const setupIdeaEventListeners = useCallback(async () => {
    try {
      const contract = await getContract();

      contract.on(
        "IdeaSubmissionInitiated",
        (id, uniqueId, submittor, timestamp, event) => {
          console.log("New idea submitted:", {
            id: Number(id),
            uniqueId,
            submittor,
            timestamp: Number(timestamp),
          });
          fetchAllIdeas();
        }
      );

      return () => {
        contract.removeAllListeners("IdeaSubmissionInitiated");
      };
    } catch (err) {
      console.error("Error setting up event listeners:", err);
      setError(err.message);
    }
  }, [getContract, fetchAllIdeas]);

  return {
    ideas,
    ideaData,
    isLoading,
    isSubmitting,
    error,
    fetchAllIdeas,
    fetchIdeaByUniqueId,
    submitIdea,
    setupIdeaEventListeners,
  };
};
