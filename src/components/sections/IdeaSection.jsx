"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";
import { useContract } from "@/hooks/useContract";

const IdeaSection = () => {
  const { ideas, isLoading, fetchAllIdeas } = useContract();

  useEffect(() => {
    const fetchIdeas = async () => {
      await fetchAllIdeas();
    };

    fetchIdeas();
  }, [fetchAllIdeas]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-600">Loading ideas...</p>
      </div>
    );
  }

  if (!ideas?.length) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-600">No ideas found.</p>
      </div>
    );
  }

  return (
    <div className="">
      {ideas.map((idea) => (
        <Card
          key={idea.id}
          className="h-auto bg-background border-transparent  transition-all hover:shadow-lg"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-200">
                  {idea.ideaTitle}
                </CardTitle>
                <div className="flex items-center mt-2 space-x-2 text-gray-400">
                  <User size={16} />
                  <span className="text-sm">{idea.ideaOwner}</span>
                  <CalendarDays size={16} className="ml-2" />
                  <span className="text-sm">{idea.timestamp}</span>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {idea.currentStage}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">{idea.ideaDescription}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IdeaSection;
