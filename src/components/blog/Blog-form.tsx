"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

interface BlogFormProps {
  blog?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function BlogForm({ blog, onSave, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    published: false,
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        image: blog.image || "",
        published: blog.published || false,
      });
    }
  }, [blog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-primary-blue font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter blog title..."
              required
              className="border-primary-light/50 focus:border-primary-light-blue"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-primary-blue font-medium">
              Image URL (Optional)
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="border-primary-light/50 focus:border-primary-light-blue"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-primary-blue font-medium">
              Content
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Write your blog content here..."
              rows={8}
              required
              className="border-primary-light/50 focus:border-primary-light-blue resize-none"
            />
          </div>

          <div className="flex items-center space-x-2">
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
              Publish immediately
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="bg-primary-red hover:bg-primary-red/90 text-white flex-1"
            >
              {blog ? "Update Blog" : "Create Blog"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-primary-light text-primary-blue hover:bg-primary-light/20 flex-1 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
