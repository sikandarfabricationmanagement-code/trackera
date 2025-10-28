import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, BarChart, Users, Building, FileText } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-bold sm:inline-block font-headline">
                Trackera
              </span>
            </a>
            <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
                <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">Features</Link>
                <Link href="#about" className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
                <Link href="#testimonials" className="text-muted-foreground transition-colors hover:text-foreground">Testimonials</Link>
                <Link href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
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

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Trackera provides a comprehensive suite of tools to help you manage your restaurant efficiently and effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 rounded-lg border bg-card p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <BarChart className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Advanced Billing & POS</h3>
                <p className="text-sm text-muted-foreground">Streamline your checkout process with our intuitive and powerful Point of Sale system.</p>
              </div>
              <div className="grid gap-1 rounded-lg border bg-card p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <Users className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Inventory Management</h3>
                <p className="text-sm text-muted-foreground">Keep track of your stock levels in real-time and reduce wastage with smart alerts.</p>
              </div>
              <div className="grid gap-1 rounded-lg border bg-card p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <FileText className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Payroll & Staffing</h3>
                <p className="text-sm text-muted-foreground">Manage employee salaries, schedules, and performance all in one place.</p>
              </div>
              <div className="grid gap-1 rounded-lg border bg-card p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <Building className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Multi-Branch Control</h3>
                <p className="text-sm text-muted-foreground">Oversee all your restaurant locations from a single, centralized dashboard.</p>
              </div>
               <div className="grid gap-1 rounded-lg border bg-card p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <BarChart className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Role-Based Dashboards</h3>
                <p className="text-sm text-muted-foreground">Customized views for every role, from kitchen staff to managers and owners.</p>
              </div>
               <div className="grid gap-1 rounded-lg border bg-card p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <CheckCircle className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Actionable Analytics</h3>
                <p className="text-sm text-muted-foreground">Gain insights into your sales, customer behavior, and operational efficiency.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">About Us</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Powered by Optineura Technology</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Trackera is a flagship product from Optineura, a technology company dedicated to creating innovative solutions that empower businesses. We believe in the power of simplification and efficiency, and Trackera is the culmination of our expertise in building robust, user-friendly software for the modern world.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image 
                  src="https://picsum.photos/seed/trackera-about/550/310"
                  width="550"
                  height="310"
                  alt="About Trackera"
                  data-ai-hint="team working office"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">What Our Clients Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what restaurant owners are saying about Trackera.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/avatar1/100/100" data-ai-hint="person avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-sm text-muted-foreground">Owner, The Pizza Place</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-lg font-medium">"Trackera has revolutionized how we manage our restaurant. The multi-branch feature is a lifesaver, and the analytics give us the insights we need to grow. Highly recommended!"</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/avatar2/100/100" data-ai-hint="person avatar" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">Manager, The Bistro</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-lg font-medium">"The user interface is so intuitive. Our staff was able to pick it up in a day. The billing and POS system is fast and reliable, which is crucial during peak hours."</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Let's talk about how Trackera can help your business. Fill out the form below for a demo or inquiry.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex flex-col space-y-4">
                <Input type="text" placeholder="Your Name" className="max-w-lg flex-1" />
                <Input type="email" placeholder="Your Email" className="max-w-lg flex-1" />
                <Textarea placeholder="Your Message" className="max-w-lg flex-1" />
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-4 border-t bg-muted/40">
         <p className="text-center text-sm text-muted-foreground">
            Made by Optineura. &copy; {new Date().getFullYear()} Trackera. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
