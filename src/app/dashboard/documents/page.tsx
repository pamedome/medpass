'use client';
import { useState, useEffect } from 'react';
import { MoreHorizontal, PlusCircle, Share2, Trash2, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { ShareDialog } from '@/components/share-dialog';
import { allMemberDocuments } from '@/lib/documents';

type Document = typeof allMemberDocuments[1][0];

export default function DocumentsPage() {
  const router = useRouter();
  const [isShareOpen, setShareOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const updateDocuments = () => {
      const storedUserId = localStorage.getItem('activeFamilyMemberId');
      const userId = storedUserId || '1';
      setDocuments(allMemberDocuments[userId] || []);
    };
    updateDocuments();
    window.addEventListener('familyMemberChanged', updateDocuments);
    return () => window.removeEventListener('familyMemberChanged', updateDocuments);
  }, []);

  const handleShare = (doc: Document) => {
    setSelectedDoc(doc);
    setShareOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div/>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href="/dashboard/documents/upload">
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Document
            </Link>
          </Button>
        </div>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>My Documents</CardTitle>
          <CardDescription>
            Manage your uploaded medical records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <TableRow key={doc.id} className="cursor-pointer" onClick={() => router.push(`/dashboard/documents/${doc.id}`)}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{doc.type}</TableCell>
                    <TableCell className="hidden md:table-cell">{doc.date}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => router.push(`/dashboard/documents/${doc.id}`)}>
                              <FileText className="mr-2 h-4 w-4" />
                              View
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => handleShare(doc)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No documents found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {selectedDoc && (
         <ShareDialog
            isOpen={isShareOpen}
            setIsOpen={setShareOpen}
            documentName={selectedDoc.name}
         />
      )}
    </>
  );
}
