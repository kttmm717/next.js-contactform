import HeaderLink from "../buttons/HeaderLink";

export default function LoginHeader() {
    return (
        <header className="w-full border-b border-yellow-700 relative">
            <div className="flex justify-center p-3">
                <h1 className="text-yellow-800 text-xl">
                    FashionablyLate
                </h1>
            </div>
            <div className="absolute top-3.5 right-5">
                <HeaderLink href="/register">register</HeaderLink>
            </div>
        </header>
    );
}
  