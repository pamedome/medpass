'use client';

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateAccountPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Creation Disabled</CardTitle>
        <CardDescription>
          The account creation flow has been disabled.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Please return to the login page. If you believe you should have access, please contact support.
        </p>
        <Link href="/login" className="text-primary hover:underline mt-4 block">
          Return to Login
        </Link>
      </CardContent>
    </Card>
  );
}
