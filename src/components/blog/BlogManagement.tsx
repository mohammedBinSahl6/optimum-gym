"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlogForm } from "@/components/blog/Blog-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - replace with actual data fetching
const mockBlogs = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    content: "Learn how to build modern web applications with Next.js...",
    image: "/placeholder.svg?height=100&width=150",
    published: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-16"),
    authorId: "user1",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    content: "Explore advanced patterns and techniques in React development...",
    image: "/placeholder.svg?height=100&width=150",
    published: false,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
    authorId: "user1",
  },
  {
    id: "3",
    title: "Database Design Best Practices",
    content: "Learn the fundamentals of good database design...",
    image: null,
    published: true,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-08"),
    authorId: "user1",
  },
];

export function BlogManagement() {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleSave = (blogData: any) => {
    if (editingBlog) {
      setBlogs(
        blogs.map((blog) =>
          blog.id === editingBlog.id
            ? { ...blog, ...blogData, updatedAt: new Date() }
            : blog
        )
      );
    } else {
      const newBlog = {
        id: Date.now().toString(),
        ...blogData,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: "user1",
      };
      setBlogs([newBlog, ...blogs]);
    }
    setIsDialogOpen(false);
    setEditingBlog(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary-light/30">
        <CardHeader className="bg-gradient-to-r from-primary-red/10 to-primary-light-blue/10">
          <CardTitle className="text-primary-blue">Blog Management</CardTitle>
          <CardDescription>
            Create, edit, and manage your blog posts
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-primary-red hover:bg-primary-red/90 text-white"
                  onClick={() => setEditingBlog(null)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Blog
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-primary-blue">
                    {editingBlog ? "Edit Blog" : "Create New Blog"}
                  </DialogTitle>
                </DialogHeader>
                <BlogForm
                  blog={editingBlog}
                  onSave={handleSave}
                  onCancel={() => {
                    setIsDialogOpen(false);
                    setEditingBlog(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border border-primary-light/30">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary-light/20">
                  <TableHead className="text-primary-blue font-semibold">
                    Title
                  </TableHead>
                  <TableHead className="text-primary-blue font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-primary-blue font-semibold">
                    Created
                  </TableHead>
                  <TableHead className="text-primary-blue font-semibold">
                    Updated
                  </TableHead>
                  <TableHead className="text-primary-blue font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog.id} className="hover:bg-primary-light/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {blog.image && (
                          <img
                            src={blog.image || "/placeholder.svg"}
                            alt={blog.title}
                            className="h-10 w-15 rounded object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium text-primary-blue">
                            {blog.title}
                          </div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {blog.content.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={blog.published ? "default" : "secondary"}
                        className={
                          blog.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {blog.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {blog.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {blog.updatedAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-primary-light-blue/20"
                        >
                          <Eye className="h-4 w-4 text-primary-light-blue" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-primary-light-blue/20"
                          onClick={() => handleEdit(blog)}
                        >
                          <Edit className="h-4 w-4 text-primary-light-blue" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-red-100"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No blogs found.{" "}
              {searchTerm
                ? "Try adjusting your search."
                : "Create your first blog post!"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
