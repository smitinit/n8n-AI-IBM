"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  Leaf,
  Lightbulb,
  HistoryIcon,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

type SustainabilityResult = {
  row_number: number;
  userID_AUTH: string;
  product: string;
  brand: string;
  "packaging ": string;
  origin: string;
  Sustainability_score: string;
  packaging_impact: string;
  ingredient_impact: string;
  certifications: string;
  major_concerns: string;
  actionable_advice: string;
  suggested_alternative: string;
  summary: string;
};

export default function History({ data }: { data: SustainabilityResult[] }) {
  const getSustainabilityColor = (score: string) => {
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
  };

  const parseJsonString = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return [];
    }
  };

  const parseSuggestedAlternative = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return { product: "", brand: "", reason: "" };
    }
  };
  const router = useRouter();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <HistoryIcon className="h-4 w-4" />
          History
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-[90vw] min-w-4xl overflow-y-auto">
        <div className="flex flex-col h-full ">
          <div className="flex justify-between items-center">
            <div className="p-6 border-b">
              <DrawerTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <HistoryIcon className="h-5 w-5 text-blue-600" />
                Analysis History
              </DrawerTitle>
              <DrawerDescription className="text-gray-600 mt-1">
                View your previous sustainability analysis results
              </DrawerDescription>
            </div>
            <Button
              onClick={() => router.refresh()}
              className="m-6"
              variant="outline"
            >
              <RefreshCw />
            </Button>
          </div>
          <ScrollArea className="flex-1 p-6">
            {data && (
              <div className="space-y-6">
                {data.map((result, i) => {
                  const majorConcerns = parseJsonString(result.major_concerns);
                  const actionableAdvice = parseJsonString(
                    result.actionable_advice
                  );
                  const suggestedAlternative = parseSuggestedAlternative(
                    result.suggested_alternative
                  );

                  return (
                    <Card key={i} className="border border-gray-200">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            {result.product} - {result.brand}
                          </div>
                          <Badge
                            className={`${getSustainabilityColor(
                              result.Sustainability_score
                            )} border`}
                          >
                            {result.Sustainability_score}
                          </Badge>
                        </CardTitle>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Packaging:</span>{" "}
                            {result["packaging "]}
                          </p>
                          <p>
                            <span className="font-medium">Origin:</span>{" "}
                            {result.origin}
                          </p>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Summary */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Summary
                          </h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {result.summary}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {/* Packaging Impact */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-500" />
                              Packaging Impact
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {result.packaging_impact}
                            </p>
                          </div>

                          {/* Ingredient Impact */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                              <Leaf className="h-4 w-4 text-green-500" />
                              Ingredient Impact
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {result.ingredient_impact}
                            </p>
                          </div>
                        </div>

                        {/* Major Concerns */}
                        {majorConcerns && majorConcerns.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              Major Concerns
                            </h4>
                            <ul className="space-y-2">
                              {majorConcerns.map(
                                (concern: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-gray-700"
                                  >
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                                    {concern}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        <Separator />

                        {/* Suggested Alternative */}
                        {suggestedAlternative.product && (
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
                                  {suggestedAlternative.product}
                                </span>
                              </p>
                              <p className="text-sm">
                                <span className="font-medium text-green-800">
                                  Brand:
                                </span>{" "}
                                <span className="text-green-700">
                                  {suggestedAlternative.brand}
                                </span>
                              </p>
                              <p className="text-sm">
                                <span className="font-medium text-green-800">
                                  Reason:
                                </span>{" "}
                                <span className="text-green-700">
                                  {suggestedAlternative.reason}
                                </span>
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Actionable Advice */}
                        {actionableAdvice && actionableAdvice.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                              <Lightbulb className="h-4 w-4 text-blue-500" />
                              Actionable Advice
                            </h4>
                            <ul className="space-y-2">
                              {actionableAdvice.map(
                                (advice: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-gray-700"
                                  >
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                                    {advice}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {/* Certifications */}
                        {result.certifications &&
                          result.certifications !== "None found" && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                Certifications
                              </h4>
                              <p className="text-sm text-gray-700">
                                {result.certifications}
                              </p>
                            </div>
                          )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
