"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import RichTextArea from "../richtextarea/RichTextArea";

export interface SessionFormType {
  title: string;
  content: string;
  image: string;
  file?: File;
  published: boolean;
}

interface SessionFormProps {
  session?: SessionFormType;
  onSave: (data: SessionFormType) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function SessionForm({
  session,
  onSave,
  onCancel,
  isSubmitting,
}: SessionFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    file: null,
    published: false,
  });

  useEffect(() => {
    if (session) {
      setFormData({
        title: session.title || "",
        content: session.content || "",
        image: session.image || "",
        file: session.file || null,
        published: session.published || false,
      });
    }
  }, [session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (
    field: string,
    value: SessionFormType[keyof SessionFormType]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
          file,
        }));
      };
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-primary-blue font-medium">
              Session Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter session title..."
              required
              className="border-primary-light/50 focus:border-primary-light-blue"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="image"
              className="flex items-center gap-2 text-primary-blue font-medium"
            >
              Upload Image (Optional) <Upload />
            </Label>
            <Input
              id="image"
              type="file"
              onChange={handleFileChange}
              className="border-primary-light/50 focus:border-primary-light-blue"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-primary-blue font-medium">
              Session Description
            </Label>
            <RichTextArea
              value={formData.content}
              onChange={(e) => handleChange("content", e)}
            />
          </div>

          <div className="flex items-center space-x-2 pt-10">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => handleChange("published", checked)}
              className="data-[state=checked]:bg-primary-light-blue"
            />
            <Label
              htmlFor="published"
              className="text-primary-blue font-medium"
            >
              Make session active
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="bg-primary-light-blue hover:bg-primary-light-blue/90 text-white flex-1"
              disabled={isSubmitting}
            >
              {session ? "Update Session" : "Create Session"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-primary-light text-primary-blue hover:bg-primary-light/20 flex-1 bg-transparent"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
