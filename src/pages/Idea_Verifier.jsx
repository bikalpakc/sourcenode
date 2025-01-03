"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { checkPatent } from "@/utils/actions";
import { Loader2 } from "lucide-react";

export default function Idea_Verifier() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await checkPatent(formData);
      if (response.success) {
        setResult(response.result ?? null);
      } else {
        setError(response.error ?? null);
      }
    } catch (e) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Patent Idea Checker
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Describe your idea and we&apos;ll check if similar patents exist
          </p>
        </div>

        <Card className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleSubmit(formData);
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="idea"
                className="block text-sm font-medium text-gray-700"
              >
                Describe your idea
              </label>
              <Textarea
                id="idea"
                name="idea"
                required
                placeholder="Enter your idea in detail..."
                className="mt-1 h-32"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Patents...
                </>
              ) : (
                "Check Patents"
              )}
            </Button>
          </form>
        </Card>

        {error && (
          <Card className="p-6 border-red-200 bg-red-50">
            <p className="text-red-600">{error}</p>
          </Card>
        )}

        {result && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <div className="prose max-w-none">
              {result.split("\n").map((line, i) => (
                <p key={i} className="mb-4">
                  {line}
                </p>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
