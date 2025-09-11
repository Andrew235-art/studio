import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Heart, Clock } from "lucide-react";

const jobOpenings = [
    {
        title: "Medical Transportation Driver",
        type: "Full-time/Part-time",
        description: "Responsible for safely transporting clients to and from medical appointments. Requires a valid driver's license, clean driving record, and excellent customer service skills."
    },
];

const benefits = [
    {
        icon: <Briefcase className="h-10 w-10 text-primary" />,
        title: "Competitive Pay",
        description: "We offer competitive wages to attract and retain the best talent in the industry."
    },
    {
        icon: <Heart className="h-10 w-10 text-primary" />,
        title: "Rewarding Work",
        description: "Make a real difference in people's lives by providing an essential service to our community."
    },
    {
        icon: <Clock className="h-10 w-10 text-primary" />,
        title: "Flexible Hours",
        description: "We offer flexible scheduling options to help our team maintain a healthy work-life balance."
    }
]

export default function CareersPage() {
    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
                        Join Our Team
                    </h1>
                    <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
                        We're looking for compassionate and reliable individuals to join the Stamerck Transport family. Help us make a difference, one ride at a time.
                    </p>
                </div>

                <div className="mb-24">
                    <h2 className="text-3xl font-headline font-bold text-foreground text-center mb-12">Why Work With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="flex items-center justify-center">
                                    {benefit.icon}
                                    <CardTitle className="mt-4">{benefit.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-headline font-bold text-foreground text-center mb-12">Current Openings</h2>
                    <div className="max-w-4xl mx-auto space-y-8">
                        {jobOpenings.map((job, index) => (
                            <Card key={index} className="shadow-lg">
                                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div>
                                        <h3 className="text-2xl font-bold">{job.title}</h3>
                                        <p className="text-primary font-medium mb-2">{job.type}</p>
                                        <p className="text-muted-foreground">{job.description}</p>
                                    </div>
                                    <Button size="lg" className="flex-shrink-0">Apply Now</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Don't see a position that fits your profile? Send your resume to <a href="mailto:careers@stamerck.com" className="text-primary hover:underline">careers@stamerck.com</a> and we'll keep it on file for future openings.
                    </p>
                </div>
            </div>
        </div>
    );
}
