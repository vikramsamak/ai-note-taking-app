import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Tag, Lightbulb } from "lucide-react";

const features = [
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "AI Summaries",
    desc: "Get instant summaries for long notes using Gemini AI.",
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

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-20 bg-muted/50">
      <div className="container grid gap-6 md:grid-cols-3 px-4">
        {features.map((f, i) => (
          <Card key={i} className="p-6 text-center transition-all hover:shadow-md">
            <CardHeader className="flex flex-col items-center space-y-2">
              {f.icon}
              <CardTitle>{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
