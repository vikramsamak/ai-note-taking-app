import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export  function WaitlistSection() {
  return (
    <section id="waitlist" className="w-full py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Join the Waitlist
        </h2>
        <p className="text-muted-foreground mt-2">
          Be the first to know when we launch.
        </p>
        <div className="mt-8 flex max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="rounded-r-none"
          />
          <Button type="submit" className="rounded-l-none">
            Join Waitlist
          </Button>
        </div>
      </div>
    </section>
  );
}
