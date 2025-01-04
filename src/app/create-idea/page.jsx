"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Layout from "@/pages/IdeaSubmissionForm/Layout";
import IdeaSubmissionForm from "@/pages/IdeaSubmissionForm/IdeaSubmissionForm";
import { Button } from "@/components/ui/button";
import { PlusCircle, Home, Settings, HelpCircle, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CreateIdea() {
  return (
    <SidebarProvider>
      <div className="flex overflow-hidden">
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6"></div>
        </main>
        <Sidebar
          className="w-64 border-l"
          side="left"
          varient="inset"
          collapsible="icon"
        >
          <SidebarContent>
            <div className="px-4 py-6">
              <Link
                href="/"
                className="mb-5 flex flex-row items-center center gap-2"
              >
                <Image
                  src="/icons/A-logo.png"
                  alt="Logo"
                  width={30}
                  height={30}
                  priority
                />
                <span className="text-lg font-medium">SourceNode</span>
              </Link>

              <nav className="space-y-2">
                <Link href="/home">
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
                <Link href="/create-idea">
                  <Button variant="ghost" className="w-full justify-start">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Idea
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </nav>
            </div>
          </SidebarContent>
        </Sidebar>
      </div>
      <div className="flex-1 overflow-auto">
        <Layout>
          <IdeaSubmissionForm />
        </Layout>
      </div>
    </SidebarProvider>
  );
}
