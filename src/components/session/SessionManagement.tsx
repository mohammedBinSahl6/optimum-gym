"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Search, Calendar } from "lucide-react";
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
import { SessionForm } from "@/components/session-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - replace with actual data fetching
const mockSessions = [
  {
    id: "1",
    title: "Introduction to Web Development",
    content:
      "A comprehensive session covering the basics of web development including HTML, CSS, and JavaScript fundamentals...",
    image: "/placeholder.svg?height=100&width=150",
    published: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-21"),
    authorId: "user1",
  },
  {
    id: "2",
    title: "Advanced JavaScript Concepts",
    content:
      "Deep dive into advanced JavaScript topics including closures, prototypes, and async programming...",
    image: "/placeholder.svg?height=100&width=150",
    published: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-19"),
    authorId: "user1",
  },
  {
    id: "3",
    title: "React Hooks Workshop",
    content:
      "Hands-on workshop exploring React Hooks and modern React development patterns...",
    image: null,
    published: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-16"),
    authorId: "user1",
  },
];

export function SessionManagement() {
  const [sessions, setSessions] = useState(mockSessions);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSession, setEditingSession] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredSessions = sessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (session: any) => {
    setEditingSession(session);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  const handleSave = (sessionData: any) => {
    if (editingSession) {
      setSessions(
        sessions.map((session) =>
          session.id === editingSession.id
            ? { ...session, ...sessionData, updatedAt: new Date() }
            : session
        )
      );
    } else {
      const newSession = {
        id: Date.now().toString(),
        ...sessionData,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: "user1",
      };
      setSessions([newSession, ...sessions]);
    }
    setIsDialogOpen(false);
    setEditingSession(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary-light/30">
        <CardHeader className="bg-gradient-to-r from-primary-light-blue/10 to-primary-red/10">
          <CardTitle className="text-primary-blue flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Session Management
          </CardTitle>
          <CardDescription>
            Create, edit, and manage your learning sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-primary-light-blue hover:bg-primary-light-blue/90 text-white"
                  onClick={() => setEditingSession(null)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Session
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-primary-blue">
                    {editingSession ? "Edit Session" : "Create New Session"}
                  </DialogTitle>
                </DialogHeader>
                <SessionForm
                  session={editingSession}
                  onSave={handleSave}
                  onCancel={() => {
                    setIsDialogOpen(false);
                    setEditingSession(null);
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
                {filteredSessions.map((session) => (
                  <TableRow
                    key={session.id}
                    className="hover:bg-primary-light/10"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {session.image && (
                          <img
                            src={session.image || "/placeholder.svg"}
                            alt={session.title}
                            className="h-10 w-15 rounded object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium text-primary-blue">
                            {session.title}
                          </div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {session.content.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={session.published ? "default" : "secondary"}
                        className={
                          session.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {session.published ? "Active" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {session.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {session.updatedAt.toLocaleDateString()}
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
                          onClick={() => handleEdit(session)}
                        >
                          <Edit className="h-4 w-4 text-primary-light-blue" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-red-100"
                          onClick={() => handleDelete(session.id)}
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

          {filteredSessions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No sessions found.{" "}
              {searchTerm
                ? "Try adjusting your search."
                : "Create your first session!"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
