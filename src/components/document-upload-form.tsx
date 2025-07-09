'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, UploadCloud } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { suggestDocumentTags } from '@/ai/flows/suggest-document-tags';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';

const uploadSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  documentText: z
    .string()
    .min(10, 'Document text must be at least 10 characters.'),
  tags: z.string().optional(),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

const sampleText = `Patient: John Doe\nDate: 2023-10-18\n\nResults of annual physical examination.
Vitals: BP 120/80, HR 72, Temp 98.6F.
Cholesterol: Total 180, LDL 100, HDL 60.
Blood Glucose: 90 mg/dL.
Assessment: Overall healthy. Recommend continued diet and exercise.\nFollow-up in 1 year.`;

export function DocumentUploadForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: '',
      documentText: '',
      tags: '',
    },
  });

  const handleSuggestTags = async () => {
    const documentText = form.getValues('documentText');
    if (!documentText || documentText.length < 10) {
      form.setError('documentText', {
        type: 'manual',
        message: 'Please enter at least 10 characters to get suggestions.',
      });
      return;
    }

    setIsSuggesting(true);
    setSuggestedTags([]);
    try {
      const result = await suggestDocumentTags({ documentText });
      setSuggestedTags(result.tags);
    } catch (error) {
      console.error('Error suggesting tags:', error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate tag suggestions. Please try again.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const addTag = (tag: string) => {
    const currentTags = form.getValues('tags') || '';
    const tagsSet = new Set(currentTags.split(',').map(t => t.trim()).filter(Boolean));
    if (!tagsSet.has(tag)) {
        tagsSet.add(tag);
        form.setValue('tags', Array.from(tagsSet).join(', '));
    }
    setSuggestedTags(prev => prev.filter(t => t !== tag));
  };

  function onSubmit(data: UploadFormValues) {
    console.log(data);
    toast({
        title: "Document Saved!",
        description: "Your new document has been uploaded and saved.",
    });
    router.push('/dashboard/documents');
  }
  
  const handleFakeUpload = () => {
    form.setValue('documentText', sampleText);
    toast({
        title: "File Processed",
        description: "Sample document text has been loaded for demonstration.",
    });
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Add a new medical document to your records. You can upload a file
              or paste the text directly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <FormLabel>Upload File</FormLabel>
                 <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted" onClick={handleFakeUpload}>
                    <UploadCloud className="w-10 h-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, PNG, or JPG (max. 10MB)</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">(For demo, this will load sample text)</p>
                </div>
            </div>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Annual Check-up Results" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Text / Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste text from your document here..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Tags</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleSuggestTags}
                      disabled={isSuggesting}
                    >
                      {isSuggesting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Suggest with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Input placeholder="lab-results, annual, cardiology..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Separate tags with commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             {suggestedTags.length > 0 && (
                <div className="space-y-2">
                    <FormLabel>AI Suggestions</FormLabel>
                    <div className="flex flex-wrap gap-2">
                        {suggestedTags.map(tag => (
                            <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => addTag(tag)}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
             )}

          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit">Save Document</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
