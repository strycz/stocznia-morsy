'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthActions } from '@convex-dev/auth/react';
import { LoginButton } from './ui/auth/loginButton';
import { GoogleLogo } from '../../assets/images/GoogleLogo';
import { AppleLogo } from '../../assets/images/AppleLogo';
import { SignInMethodDivider } from './ui/auth/SignInMethodDivider';

export function LoginForm() {
  const { signIn } = useAuthActions();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in or create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <LoginButton
            className="w-full"
            variant="outline"
            type="button"
            onClick={() => void signIn('google')}
          >
            <GoogleLogo className="mr-2 h-4 w-4" /> Login with Google
          </LoginButton>
          {/* <LoginButton
            className="w-full"
            variant="outline"
            type="button"
            onClick={() => void signIn('apple')}
          >
            <AppleLogo className="mr-2 h-4 w-4" /> Login with Apple
          </LoginButton> */}

          <SignInMethodDivider />
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          <span>Don't have an account?</span>{' '}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
