import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "This app has revolutionized my note-taking process. The AI features are a game-changer!",
    author: "John Doe",
    title: "Student",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    quote: "I can't imagine going back to my old note-taking app. The smart tagging is incredibly helpful.",
    author: "Jane Smith",
    title: "Freelancer",
    avatar: "https://randomuser.me/api/portraits/women/75.jpg",
  },
  {
    quote: "A beautifully designed and intuitive app. It makes organizing my thoughts a breeze.",
    author: "Peter Jones",
    title: "Writer",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

export  function TestimonialSection() {
  return (
    <section id="testimonials" className="w-full py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
          <p className="text-muted-foreground mt-2">
            Honest feedback from our early adopters.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-6 text-center">
              <CardContent>
                <p className="text-lg">{`"${t.quote}"`}</p>
              </CardContent>
              <div className="flex items-center justify-center mt-4">
                <Avatar>
                  <AvatarImage src={t.avatar} />
                  <AvatarFallback>{t.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 text-left">
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
