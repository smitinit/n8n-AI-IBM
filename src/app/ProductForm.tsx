"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Loader2,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react";

const formSchema = z.object({
  product: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand name must be at least 2 characters.",
  }),
  packaging: z.string().min(2, {
    message: "Packaging description must be at least 2 characters.",
  }),
  origin: z.string().min(2, {
    message: "Origin must be at least 2 characters.",
  }),
});

export type SustainabilityResult = {
  output: {
    sustainability_score: string;
    packaging_impact: string;
    ingredient_impact: string;
    certifications: string;
    major_concerns: string[];
    suggested_alternative: {
      product: string;
      brand: string;
      reason: string;
    };
    actionable_advice: string[];
    summary: string;
  };
};
const url =
"https://smit935.app.n8n.cloud/webhook-test/c7d02d28-7c7e-4b30-adac-9256ee142cb6"
export default function ProductForm({ userId }: { userId: string }) {
  const [result, setResult] = useState<SustainabilityResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "Oats",
      brand: "Quaker",
      packaging: "Plastic-lined cardboard box",
      origin: "India",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    const payload = {
      id: userId,
      ...values,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatInput: payload }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Form Section */}
        <Card className="border-0 bg-white">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              Product Sustainability Analysis
            </CardTitle>
            <p className="text-gray-600">
              Enter your product details to get a comprehensive sustainability
              assessment
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Instant Noodles"
                            className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          The name of the product you want to analyze
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Brand
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Nestle"
                            className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          The brand or manufacturer name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="packaging"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Packaging
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Plastic wrapper"
                            className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Description of the product packaging
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="origin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Origin
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., India"
                            className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Country or region of origin
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Sustainability"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="border-0 bg-white">
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <p className="text-gray-600">
                  Analyzing your product&apos;s sustainability...
                </p>
                <p className="text-sm text-gray-500">
                  This may take a few moments
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {result && result.length > 0 && (
          <Card className="border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Sustainability Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.map((item, index) => (
                <div key={index} className="space-y-6">
                  {/* Sustainability Score */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">
                      Sustainability Score:
                    </span>
                    <Badge
                      className={`${getSustainabilityScore(
                        item.output.sustainability_score
                      )} border`}
                    >
                      {item.output.sustainability_score}
                    </Badge>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.output.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Packaging Impact */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        Packaging Impact
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {item.output.packaging_impact}
                      </p>
                    </div>

                    {/* Ingredient Impact */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-green-500" />
                        Ingredient Impact
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {item.output.ingredient_impact}
                      </p>
                    </div>
                  </div>

                  {/* Major Concerns */}
                  {item.output.major_concerns &&
                    item.output.major_concerns.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Major Concerns
                        </h4>
                        <ul className="space-y-2">
                          {item.output.major_concerns.map((concern, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                              {concern}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  <Separator />

                  {/* Suggested Alternative */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Suggested Alternative
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium text-green-800">
                          Product:
                        </span>{" "}
                        <span className="text-green-700">
                          {item.output.suggested_alternative.product}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-green-800">
                          Brand:
                        </span>{" "}
                        <span className="text-green-700">
                          {item.output.suggested_alternative.brand}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-green-800">
                          Reason:
                        </span>{" "}
                        <span className="text-green-700">
                          {item.output.suggested_alternative.reason}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actionable Advice */}
                  {item.output.actionable_advice &&
                    item.output.actionable_advice.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-blue-500" />
                          Actionable Advice
                        </h4>
                        <ul className="space-y-2">
                          {item.output.actionable_advice.map((advice, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                              {advice}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Certifications */}
                  {item.output.certifications &&
                    item.output.certifications !== "None found" && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Certifications
                        </h4>
                        <p className="text-sm text-gray-700">
                          {item.output.certifications}
                        </p>
                      </div>
                    )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function getSustainabilityScore(score: string) {
  switch (score.toLowerCase()) {
    case "high":
      return "bg-green-100 text-green-800 border-green-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}
