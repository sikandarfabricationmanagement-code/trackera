'use client';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { getMenuRecommendations } from '@/app/actions';
import type { OrderItem } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface AIRecommenderProps {
  orderHistory: OrderItem[];
}

export function AIRecommender({ orderHistory }: AIRecommenderProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const input = {
      orderHistory: orderHistory.map(item => ({
        item: item.name,
        quantity: item.quantity,
        orderDate: new Date().toISOString().split('T')[0],
      })),
      currentTrends: (formData.get('trends') as string).split(',').map(s => s.trim()),
      realTimeFeedback: formData.get('feedback') as string,
    };

    startTransition(async () => {
      setError(null);
      setRecommendations([]);
      const result = await getMenuRecommendations(input);
      if (result.success) {
        setRecommendations(result.data);
      } else {
        setError(result.error);
        toast({
          variant: "destructive",
          title: "AI Error",
          description: result.error,
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Lightbulb className="mr-2 h-4 w-4" />
          AI Suggest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-headline">AI Menu Recommender</DialogTitle>
            <DialogDescription>
              Get personalized menu suggestions for the customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="trends">Current Trends (comma-separated)</Label>
              <Input id="trends" name="trends" defaultValue="Dal Makhani, Chicken Tikka" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="feedback">Customer Feedback/Preferences</Label>
              <Input id="feedback" name="feedback" placeholder="e.g., 'looking for something spicy'" />
            </div>
            {orderHistory.length > 0 && (
                 <div className="grid w-full items-center gap-1.5">
                    <Label>Current Order History</Label>
                    <Textarea readOnly value={orderHistory.map(i => `${i.name} x${i.quantity}`).join('\n')} rows={3} />
                </div>
            )}
          </div>

          {isPending && (
            <div className="flex items-center justify-center my-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Thinking...</p>
            </div>
          )}

          {error && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {recommendations.length > 0 && (
             <Alert variant="default" className="border-accent bg-accent/20">
                <Sparkles className="h-4 w-4 text-accent-foreground" />
                <AlertTitle className="font-headline text-accent-foreground">Recommendations</AlertTitle>
                <AlertDescription>
                   <ul className="list-disc pl-5 mt-2 space-y-1">
                        {recommendations.map((item, index) => <li key={index}>{item}</li>)}
                   </ul>
                </AlertDescription>
            </Alert>
          )}

          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Get Suggestions
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
