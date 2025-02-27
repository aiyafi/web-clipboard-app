import Link from "next/link"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-center">
                <div className="mr-4 flex items-center space-x-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl">FoxCache</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}