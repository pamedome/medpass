'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Printer, FileText, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
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

const InfoItem = ({ label, value }: { label: string; value: string | undefined }) => {
    if (!value) return null;
    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    );
}

type ImageType = {
  src: string;
  alt: string;
  width: number;
  height: number;
  hint?: string;
};

export default function DocumentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isShareOpen, setShareOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  // Combine all documents from all users into a single array for lookup
  const allDocuments = Object.values(allMemberDocuments).flat();

  const currentIndex = allDocuments.findIndex((doc) => doc.id === id);
  const documentDetails = allDocuments[currentIndex] as (typeof allDocuments)[0] & { images?: any[] };
  
  const prevDoc = currentIndex > 0 ? allDocuments[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocuments.length - 1 ? allDocuments[currentIndex + 1] : null;

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
    setIsPreviewOpen(true);
  };

  if (!documentDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-lg text-muted-foreground">Document not found.</p>
        <Button variant="link" asChild className="mt-4">
            <Link href="/dashboard/documents">&larr; Back to Documents</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FileText className="h-6 w-6" /> {documentDetails.name}
                </CardTitle>
                <CardDescription className="mt-2">
                  Issued by {documentDetails.reportInfo.issuedBy} from {documentDetails.reportInfo.facility} on {documentDetails.date}.
                </CardDescription>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShareOpen(true)}>
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border p-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                    <InfoItem label="Patient Name" value={documentDetails.patientInfo.name} />
                    <InfoItem label="Date of Birth" value={documentDetails.patientInfo.dob} />
                    <InfoItem label="Patient ID" value={documentDetails.patientInfo.patientId} />
                    <InfoItem label="Report ID" value={documentDetails.reportInfo.reportId} />
                    <InfoItem label="Report Date" value={`${documentDetails.date} at ${documentDetails.reportInfo.time}`} />
                    <InfoItem label="Issuing Physician" value={documentDetails.reportInfo.issuedBy} />
                    <InfoItem label="Facility" value={documentDetails.reportInfo.facility} />
                     <div className="lg:col-span-1 sm:col-span-3 col-span-2">
                        <p className="text-sm font-medium text-muted-foreground">Tags</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                            {documentDetails.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {Object.keys(documentDetails.vitalSigns).length > 0 && (
             <div className="space-y-4">
              <h3 className="text-lg font-semibold">Vital Signs</h3>
              <div className="grid grid-cols-2 gap-4 rounded-lg border p-4 md:grid-cols-4">
                <InfoItem label="Blood Pressure" value={documentDetails.vitalSigns.bloodPressure} />
                <InfoItem label="Heart Rate" value={documentDetails.vitalSigns.heartRate} />
                <InfoItem label="Temperature" value={documentDetails.vitalSigns.temperature} />
                <InfoItem label="Respiratory Rate" value={documentDetails.vitalSigns.respiratoryRate} />
              </div>
            </div>
            )}

            {Object.keys(documentDetails.vitalSigns).length > 0 && documentDetails.labResults.length > 0 && <Separator />}

            {documentDetails.labResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Laboratory Results</h3>
              <div className="rounded-lg border">
                  <Table>
                      <TableHeader>
                      <TableRow>
                          <TableHead>Test</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Reference Range</TableHead>
                          <TableHead>Status</TableHead>
                      </TableRow>
                      </TableHeader>
                      <TableBody>
                      {documentDetails.labResults.map((result) => (
                          <TableRow key={result.test}>
                          <TableCell className="font-medium">{result.test}</TableCell>
                          <TableCell>{result.value}</TableCell>
                          <TableCell>{result.range}</TableCell>
                          <TableCell>
                              <Badge variant={result.status === 'Normal' ? 'secondary' : 'destructive'}>
                                  {result.status}
                              </Badge>
                          </TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                  </Table>
              </div>
            </div>
            )}
            
            {(documentDetails.labResults.length > 0 || Object.keys(documentDetails.vitalSigns).length > 0) && <Separator />}


            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Physician's Notes</h3>
              <div className="rounded-lg border p-4 space-y-4">
                <div>
                  <h4 className="font-semibold">Assessment</h4>
                  <p className="text-muted-foreground">{documentDetails.assessment}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Recommendations & Follow-up</h4>
                  <p className="text-muted-foreground">{documentDetails.recommendations}</p>
                </div>
              </div>
            </div>

            {documentDetails.images && documentDetails.images.length > 0 && (
                <>
                <Separator />
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Attached Images</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documentDetails.images.map((image: ImageType, index: number) => (
                        <button
                            key={index}
                            className="block h-full w-full overflow-hidden rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            onClick={() => handleImageClick(image)}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                data-ai-hint={image.hint}
                                className="h-auto w-full object-cover"
                            />
                        </button>
                    ))}
                    </div>
                </div>
                </>
            )}
          </CardContent>
        </Card>
        <div className="mt-6 flex items-center justify-between">
           <Button
              variant="outline"
              disabled={!prevDoc}
              onClick={() => router.push(`/dashboard/documents/${prevDoc!.id}`)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Report
            </Button>
            <Button variant="link" asChild>
              <Link href="/dashboard/documents">&larr; Back to Documents</Link>
            </Button>
            <Button
              variant="outline"
              disabled={!nextDoc}
              onClick={() => router.push(`/dashboard/documents/${nextDoc!.id}`)}
            >
              Next Report
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </div>
      <ShareDialog
        isOpen={isShareOpen}
        setIsOpen={setShareOpen}
        documentName={documentDetails.name}
      />
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="w-auto max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.alt}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1920}
                height={1080}
                className="h-auto w-auto max-h-[80vh] max-w-full rounded-md object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
