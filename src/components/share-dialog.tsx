'use client';

import { useState } from 'react';
import { Copy, Calendar as CalendarIcon, KeyRound } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  documentName: string;
}

export function ShareDialog({ isOpen, setIsOpen, documentName }: ShareDialogProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [usePin, setUsePin] = useState(false);
  const shareLink = 'https://healthpassport.example/s/aB3xZ9Pq';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: 'Copied to clipboard!',
      description: 'The shareable link has been copied.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share "{documentName}"</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this document. You can set an
            expiration date and a PIN for extra security.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Input id="link" defaultValue={shareLink} readOnly />
            <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Expiration Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <Label htmlFor="pin-switch">Require PIN</Label>
                     <Switch id="pin-switch" checked={usePin} onCheckedChange={setUsePin} />
                </div>
                 <div className="relative">
                    <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="pin" type="text" placeholder="4-digit PIN" disabled={!usePin} className="pl-8" />
                 </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
