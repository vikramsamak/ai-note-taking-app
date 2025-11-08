import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Tag, Lightbulb } from "lucide-react";

const features = [
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "AI Summaries",
    desc: "Get instant summaries for long notes using AI.",
  },
  {
    icon: <Tag className="h-6 w-6 text-primary" />,
    title: "Smart Tagging",
    desc: "Automatically generate relevant tags for better organization.",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: "Focus Mode",
    desc: "Distraction-free writing environment built for clarity.",
  },
];

export  function FeaturesSection() {
  return (
    <section id="features" className="w-full py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Features</h2>
          <p className="text-muted-foreground mt-2">
            Everything you need to organize your notes.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card
              key={i}
              className="p-6 text-center transition-all hover:shadow-lg"
            >
              <CardHeader className="flex flex-col items-center space-y-3">
                {f.icon}
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
