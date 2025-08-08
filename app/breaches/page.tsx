

"use client";
import { checkPasswordBreach } from "@/lib/breaches";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


export default function BreachesTool() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const count = await checkPasswordBreach(password);
      setResult(count);
    } catch (err: any) {
      setError("Failed to check password. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Breach Checker</CardTitle>
          <CardDescription>
            Check if your password has been found in public data breaches using HaveIBeenPwned.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleCheck} autoComplete="off">
          <CardContent className="flex flex-col gap-4">
            <Label htmlFor="breach-password">Password</Label>
            <Input
              id="breach-password"
              type="password"
              placeholder="Enter password to check..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            {error && <div className="text-destructive text-sm mt-1">{error}</div>}
            {result !== null && (
              <div className="mt-2">
                {result > 0 ? (
                  <span className="text-destructive font-semibold">
                    This password has been found in {result.toLocaleString()} breaches!
                  </span>
                ) : (
                  <span className="text-green-600 font-semibold">
                    This password was NOT found in any known breaches.
                  </span>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading || !password} className="w-full mt-4">
              {loading ? "Checking..." : "Check Breach"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
