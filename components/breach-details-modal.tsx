import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function BreachDetailsModal({ open, onOpenChange, hash, count }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hash: string;
  count: number;
}) {
  const [breaches, setBreaches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError("");
    // Simulate API call for breach details (HIBP API does not provide per-password breach names)
    setTimeout(() => {
      // Example: fake breach data
      setBreaches([
        { name: "ExampleBreach", domain: "example.com", date: "2023-01-01", description: "Example breach description." },
        { name: "AnotherBreach", domain: "another.com", date: "2022-11-15", description: "Another breach description." }
      ]);
      setLoading(false);
    }, 1000);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Breach Details</DialogTitle>
          <DialogDescription>
            {count > 0 ? `This password was found in ${count} breaches.` : "No breach details available."}
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="text-center py-4">Loading breach details...</div>
        ) : error ? (
          <div className="text-destructive">{error}</div>
        ) : (
          <div className="space-y-4">
            {breaches.map((b, i) => (
              <div key={i} className="border-b pb-2 last:border-b-0">
                <div className="font-semibold">{b.name} <span className="text-xs text-muted-foreground">({b.domain})</span></div>
                <div className="text-xs text-muted-foreground">Date: {b.date}</div>
                <div className="text-xs">{b.description}</div>
              </div>
            ))}
          </div>
        )}
        <DialogClose asChild>
          <Button className="mt-4 w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
