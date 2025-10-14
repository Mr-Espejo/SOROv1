import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    name: 'Dr. Alana Rodriguez',
    title: 'Owner, Bright Smiles Dental',
    avatar: PlaceHolderImages.find(p => p.id === 'testimonial_avatar_1'),
    quote: "SORO has been a game-changer. Our front desk staff is no longer tied to the phone and can focus on in-person patient care. Appointment bookings have increased by 30%!",
  },
  {
    name: 'Dr. Sofia Reyes',
    title: 'Clinic Manager, Urban Dentists',
    avatar: PlaceHolderImages.find(p => p.id === 'testimonial_avatar_2'),
    quote: "The implementation was seamless. The AI is surprisingly smart and handles most patient requests flawlessly. Our no-show rate has dropped significantly thanks to the automated reminders.",
  },
  {
    name: 'Dr. Chen Wei',
    title: 'Orthodontist, Perfect Align',
    avatar: PlaceHolderImages.find(p => p.id === 'testimonial_avatar_3'),
    quote: "I was skeptical about an AI handling patient interactions, but I'm blown away. Patients love the convenience of managing their appointments via WhatsApp. Highly recommended!",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Loved by Modern Dental Clinics</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our clients have to say about how SORO™ transformed their practice.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col bg-background/50">
              <CardHeader className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    {testimonial.avatar && (
                      <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatar.imageHint || 'portrait'} />
                    )}
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between p-6 pt-0">
                <blockquote className="text-muted-foreground mb-4">"{testimonial.quote}"</blockquote>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
