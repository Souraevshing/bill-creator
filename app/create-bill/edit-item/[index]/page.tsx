"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { useBillContext } from "@/app/providers/bill-provider";
import Loader from "@/components/loader";
import { StepLayout } from "@/components/step-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function EditItem({
  params,
}: {
  params: Promise<{ index: string }>;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const { billData, editItem } = useBillContext();

  const resolvedParams = use(params);
  const itemIndex = Number.parseInt(resolvedParams.index, 10);
  const currentItem = billData.items[itemIndex];

  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(currentItem.item);
  const [description, setDescription] = useState(currentItem.description);
  const [briefs, setBriefs] = useState(currentItem.briefs);
  const [measurement, setMeasurement] = useState(currentItem.measurement);

  const handleSave = () => {
    if (item && description && briefs && measurement) {
      setIsLoading(true);
      editItem(itemIndex, { item, description, briefs, measurement });
      toast({ title: "Saved successfully", variant: "default" });
      router.push("/create-bill/review");
    } else {
      toast({ title: "Please fill in all fields", variant: "destructive" });
    }
  };

  return (
    <StepLayout title={`Edit Item ${itemIndex + 1}`}>
      <div className="space-y-4">
        <Select value={item} onValueChange={setItem}>
          <SelectTrigger>
            <SelectValue placeholder="Select Item" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
            <SelectItem value="item2">Item 2</SelectItem>
            <SelectItem value="item3">Item 3</SelectItem>
          </SelectContent>
        </Select>

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
        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? <Loader /> : "Save Changes"}
        </Button>
      </div>
    </StepLayout>
  );
}
