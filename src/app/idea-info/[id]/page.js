"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Calendar,
  Tag,
  FileText,
  Target,
  Users,
  Link,
  Download,
} from "lucide-react";


const IdeaDetailsPage = () => {
  if (!ideaData) return <p>Loading...</p>;

  const ideaData = {
    id: "1234",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    timestamp: "12/28/2024, 5:09:47 PM",
    ideaOwner: "John Doe",
    contactEmail: "john@example.com",
    ideaName: "Decentralized Learning Platform",
    ideaDescription:
      "A blockchain-based platform that revolutionizes online education through decentralized content distribution and verification.",
    category: "Education",
    proofOfConcept: "https://github.com/example/poc",
    supportingDocuments: [
      {
        id: 1,
        name: "Technical Whitepaper",
        type: "pdf",
        url: "/docs/whitepaper.pdf",
      },
      {
        id: 2,
        name: "Market Analysis",
        type: "pdf",
        url: "/docs/analysis.pdf",
      },
    ],
    expectedOutcome:
      "Create a self-sustaining educational ecosystem that rewards content creators and learners while ensuring content quality and authenticity.",
    currentStage: "Under Review",
    contributors: ["Alice Smith", "Bob Johnson", "Carol Williams"],
    createdAt: "12/28/2024, 5:09:47 PM",
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-3 py-3">
      <Icon className="w-5 h-5 text-blue-400 mt-1" />
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-gray-100">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-100">
              {ideaData.ideaTitle}
            </h1>
            <Badge
              variant="secondary"
              className="bg-blue-900 text-blue-100 hover:bg-blue-800"
            >
              {ideaData.currentStage}
            </Badge>
          </div>
          <p className="mt-4 text-gray-400 text-lg">
            {ideaData.ideaDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Idea Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <InfoRow
                icon={User}
                label="Idea Owner"
                value={ideaData.userName}
              />
              <InfoRow
                icon={Mail}
                label="Contact Email"
                value={ideaData.userEmail}
              />
              <InfoRow
                icon={Tag}
                label="Category"
                value={ideaData.ideaCategory}
              />
              <InfoRow
                icon={Calendar}
                label="Created At"
                value={ideaData.timestamp}
              />
              <InfoRow
                icon={Target}
                label="Expected Outcome"
                value={ideaData.expectedOutcome}
              />
              <InfoRow
                icon={Link}
                label="Proof of Concept"
                value={ideaData.proofOfConcept}
              />
            </CardContent>
          </Card>

          {/* Side Cards */}
          <div className="space-y-6">
            {/* Contributors Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100 flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Contributors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ideaData.contributors.map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center">
                        <span className="text-blue-100">{contributor[0]}</span>
                      </div>
                      <span className="text-gray-100">{contributor}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Supporting Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ideaData.supportingDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-gray-100">{doc.name}</span>
                      <a
                        href={doc.url}
                        className="text-blue-400 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Info Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">
                  Blockchain Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Contract Address</p>
                    <p className="text-gray-100 break-all">
                      0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Submission Time</p>
                    <p className="text-gray-100">{ideaData.timestamp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsPage;
