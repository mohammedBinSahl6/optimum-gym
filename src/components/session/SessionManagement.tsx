"use client";

import { useEffect, useState } from "react";
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
import { SessionForm, SessionFormType } from "./SessionForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Session } from "@prisma/client";
import Loader from "../loader/Loader";
import { getSessionsCMS } from "@/app/actions/getSessionsCMS";
import { createSession } from "@/app/actions/createSession";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SessionManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSession, setEditingSession] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const filteredSessions = sessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  const handleSave = async (sessionData: SessionFormType) => {
    if (editingSession) {
      setSessions(
        sessions.map((session) =>
          session.id === editingSession.id
            ? { ...session, ...sessionData, updatedAt: new Date() }
            : session
        )
      );
    } else {
      setIsSubmitting(true);
      const res = await createSession(sessionData);
      if (res?.success) {
        setSessions([...sessions, res.session]);
        toast.success("Session created successfully");
        router.refresh();
      } else {
        toast.error(res?.message);
      }
    }
    setIsSubmitting(false);
    setIsDialogOpen(false);
    setEditingSession(null);
  };

  useEffect(() => {
    const fetchSessions = async () => {
      const sessions = await getSessionsCMS();
      setSessions(sessions || []);
      setIsLoading(false);
    };
    fetchSessions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-lvh">
        <Loader />
      </div>
    );
  }

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
                  isSubmitting={isSubmitting}
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
                          <Image
                          width={150}
                          height={100}
                          
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
                            <span dangerouslySetInnerHTML={{ __html: session.content.substring(0, 60) + '...' }} />
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
