"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";
import { useContract } from "@/hooks/useContract";
import { useRouter } from "next/navigation";
const IdeaSection = () => {
  const { ideas, isLoading, fetchAllIdeas } = useContract();
  const router = useRouter();
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {ideas.map((idea) => (
        <Card
          key={idea.id}
          onClick={() => router.push(`/idea-info/${idea.uniqueId}`)}
          className="bg-gray-900 hover:bg-gray-800 border-transparent transition-all hover:shadow-lg min-h-[200px] flex flex-col"
        >
          <CardHeader className="flex-none pb-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold text-gray-200 line-clamp-1">
                  {idea.ideaTitle}
                </CardTitle>
                <div className="flex items-center gap-2 text-gray-400">
                  <User size={14} />
                  <span className="text-xs line-clamp-1">{idea.ideaOwner}</span>
                  <CalendarDays size={14} />
                  <span className="text-xs">{idea.timestamp}</span>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs px-2 py-1 whitespace-nowrap"
              >
                {idea.currentStage}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-gray-400 text-sm line-clamp-4">
              {idea.ideaDescription}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IdeaSection;
