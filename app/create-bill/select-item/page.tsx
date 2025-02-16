"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useBillContext } from "@/app/providers/bill-provider";
import Loader from "@/components/loader";
import { StepLayout } from "@/components/step-layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function SelectBill() {
  const router = useRouter();

  const { toast } = useToast();

  const { addItem } = useBillContext();

  const [selectedItem, setSelectedItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleNext = () => {
    if (selectedItem) {
      setIsLoading(true);
      addItem({
        item: selectedItem,
        description: "",
        briefs: "",
        measurement: "",
      });
      router.push("/create-bill/item-details");
    } else {
      toast({ title: "Please fill in all fields", variant: "destructive" });
    }
  };

  return (
    <StepLayout title="Select Item">
      <div className="space-y-4">
        <Select onValueChange={setSelectedItem}>
          <SelectTrigger>
            <SelectValue placeholder="Select Item" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
            <SelectItem value="item2">Item 2</SelectItem>
            <SelectItem value="item3">Item 3</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleNext} className="w-full" disabled={isLoading}>
          {isLoading ? <Loader /> : "Next"}
        </Button>
      </div>
    </StepLayout>
  );
}
