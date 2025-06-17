'use client';

import Button from "@/ui/buttons/button";
import Input from "@/ui/Input";
import Item from "@/ui/Item";
import { useActionState } from "react";
import { authenticate } from "@/lib/actions/actions";
import { useSearchParams } from "next/navigation";
import Spinner from "@/ui/Spinner";


export default function LoginPage() {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined,);

  return (
    <div className="bg-[#f4efeb] h-[100vh] text-yellow-800 ">
      <div className="w-[60%] mx-auto ">
        <h1 className="text-center py-6 ">Login</h1>

        <form
          action={formAction}
          className="border border-[#d1c1b4] bg-white px-10 py-8 rounded-sm "
        >
          <div className="mb-4 space-y-1">
            <Item name='メールアドレス' />
            <Input
              name="email"
              placeholder='例：test@gmail.com'
            />
          </div>
          <div className="mb-4 space-y-1">
            <Item name='パスワード' />
            <Input
              name="password"
              type="password"
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <input type="hidden" name="redirectTo" value={callbackUrl} />

          <div className="p-3 flex justify-center">
            <Button
              disabled={isPending}
              aria-disabled={isPending}
              className='flex items-center justify-center gap-2'
            >
              {isPending && <Spinner />}
              ログイン
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
} 