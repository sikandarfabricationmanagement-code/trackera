import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import Image from 'next/image';

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Logo className="h-6 w-6" />
              <span className="font-bold sm:inline-block font-headline">
                Trackera
              </span>
            </a>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/login">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                                Trackera — Smart Business. Simplified.
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                A next-gen POS and restaurant management SaaS to streamline your operations, from billing and inventory to payroll and multi-branch management.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg" asChild>
                                <Link href="/login">Get a Demo</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="#features">Learn More</Link>
                            </Button>
                        </div>
                    </div>
                    <Image
                      src="https://picsum.photos/seed/trackera-hero/600/400"
                      width="600"
                      height="400"
                      alt="Hero"
                      data-ai-hint="restaurant management dashboard"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                    />
                </div>
            </div>
        </section>
        {/* Future sections (About, Features, Pricing) will go here */}
      </main>
      <footer className="flex items-center justify-center p-4 border-t">
         <p className="text-center text-sm text-muted-foreground">
            Made by Optineura. &copy; {new Date().getFullYear()} Trackera. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
