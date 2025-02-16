"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useBillContext } from "@/app/providers/bill-provider";
import Loader from "@/components/loader";
import { StepLayout } from "@/components/step-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function ItemDetails() {
  const router = useRouter();

  const { billData, editItem } = useBillContext();

  const currentItemIndex = billData?.items?.length
    ? billData.items.length - 1
    : -1;
  const currentItem = billData?.items?.[currentItemIndex] ?? {};

  const [description, setDescription] = useState(currentItem.description || "");
  const [briefs, setBriefs] = useState(currentItem.briefs || "");
  const [measurement, setMeasurement] = useState(currentItem.measurement || "");

  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (description && briefs && measurement) {
      setIsLoading(true);
      editItem(currentItemIndex, {
        ...currentItem,
        description,
        briefs,
        measurement,
      });
      toast({ title: "Saved successfully", variant: "default" });
      router.push("/create-bill/review");
    } else {
      toast({ title: "Please fill in all fields", variant: "destructive" });
    }
  };

  return (
    <StepLayout title="Item Details">
      <div className="space-y-4">
        <Textarea
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Textarea
          placeholder="Add Briefs"
          value={briefs}
          onChange={(e) => setBriefs(e.target.value)}
        />
        <Input
          placeholder="Add Measurement"
          value={measurement}
          onChange={(e) => setMeasurement(e.target.value)}
        />
        <Button onClick={handleNext} disabled={isLoading} className="w-full">
          {isLoading ? <Loader /> : "Next"}
        </Button>
      </div>
    </StepLayout>
  );
}
