"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useBillContext } from "@/app/providers/bill-provider";
import Loader from "@/components/loader";
import { StepLayout } from "@/components/step-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ViewBill() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { billData } = useBillContext();

  const handleBack = () => {
    setIsLoading(true);
    router.push("/");
  };

  return (
    <StepLayout title="View Bill">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="underline hover:no-underline">
              Bill Details:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Client:</strong> {billData.client}
            </p>
            <p>
              <strong>Project:</strong> {billData.project}
            </p>
            <p>
              <strong>Date:</strong> {billData.date}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="underline hover:no-underline">
              Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billData.items.map((item, index) => (
                <Card key={index} className="cursor-pointer">
                  <CardHeader>
                    <CardTitle>{item.item}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Briefs:</strong> {item.briefs}
                    </p>
                    <p>
                      <strong>Measurement:</strong> {item.measurement}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleBack} disabled={isLoading} className="w-full mt-2">
        {isLoading ? <Loader /> : "Back to Home"}
      </Button>
    </StepLayout>
  );
}
