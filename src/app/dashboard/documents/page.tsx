'use client';
import { useState } from 'react';
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

const documents = [
  {
    id: 'doc1',
    name: 'Annual Check-up Results',
    type: 'PDF',
    date: '2023-10-18',
    tags: ['lab-results', 'check-up', 'annual'],
  },
  {
    id: 'doc2',
    name: 'MRI Scan - Left Knee',
    type: 'JPG',
    date: '2023-09-05',
    tags: ['imaging', 'orthopedics', 'mri'],
  },
  {
    id: 'doc3',
    name: 'Prescription - Amoxicillin',
    type: 'PDF',
    date: '2023-08-22',
    tags: ['prescription', 'pharmacy'],
  },
  {
    id: 'doc4',
    name: 'Dental X-Ray',
    type: 'PNG',
    date: '2023-07-11',
    tags: ['dental', 'imaging', 'x-ray'],
  },
  {
    id: 'doc5',
    name: 'Allergy Test Results',
    type: 'PDF',
    date: '2023-06-15',
    tags: ['lab-results', 'allergy'],
  },
];

type Document = typeof documents[0];

export default function DocumentsPage() {
  const router = useRouter();
  const [isShareOpen, setShareOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

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
              {documents.map((doc) => (
                <TableRow key={doc.id}>
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
                  <TableCell>
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
              ))}
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
