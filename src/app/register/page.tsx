'use client'

import { addUser } from "@/lib/actions/addUser";
import Button from "@/ui/buttons/button";
import Input from "@/ui/tags/Input";
import Item from "@/ui/items/Item";
import Spinner from "@/ui/Spinner";
import { useActionState, useState } from "react";



export default function RegisterPage() {

  const initialState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(addUser, initialState);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);

    const password = document.querySelector<HTMLInputElement>('input[name="password"]');
    if (password) {
      form.append('password', password.value);
    }

    formAction(form);
  }


  return (
    <div className="bg-[#f4efeb] h-[100vh] text-yellow-800 ">
      <div className="w-[60%] mx-auto ">
        <h1 className="text-center py-6 ">Register</h1>

        <form action={handleSubmit}>
          <div className="border border-[#d1c1b4] bg-white px-10 py-8 rounded-sm ">
            {/* お名前 */}
            <div className="mb-4 space-y-1">
              <Item name='お名前' />
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='例：山田 太郎'
                className='w-full'
              />
              {state.errors?.name &&
                <p className="text-red-500 text-sm">
                  {state.errors.name}
                </p>}
            </div>

            {/* メールアドレス */}
            <div className="mb-4 space-y-1">
              <Item name='メールアドレス' />
              <Input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='例：test@gmail.com'
                className='w-full'
              />
              {state.errors?.email &&
                <p className="text-red-500 text-sm">
                  {state.errors.email}
                </p>}
            </div>

            {/* パスワード */}
            <div className="mb-4 space-y-1">
              <Item name='パスワード' />
              <Input
                name="password"
                type="password"
                className='w-full'
              />
              {state.errors?.password &&
                <p className="text-red-500 text-sm">
                  {state.errors.password}
                </p>}
            </div>
            <div className="p-3 flex justify-center">
              <Button
                disabled={isPending}
                aria-disabled={isPending}
                className='flex items-center justify-center gap-2'
              >
                {isPending && <Spinner />}
                新規登録
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 