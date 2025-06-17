import { signOut } from "../../../auth";

export default function LogoutHeader() {
    return (
        <header className="w-full border-b border-yellow-700 relative">
            <div className="flex justify-center p-3">
                <h1 className="text-yellow-800 text-xl">
                    FashionablyLate
                </h1>
            </div>
            <div className="absolute top-3.5 right-5">
                <form action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/login' });
                }}>
                    <button
                        className="border border-[#e0d4ca] text-xs p-1 bg-[#f4efeb] text-[#b1a49a] hover:bg-[#dfdbd8] cursor-pointer"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </header>
    );
}
