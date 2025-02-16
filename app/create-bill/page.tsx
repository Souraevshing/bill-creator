"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useBillContext } from "@/app/providers/bill-provider";
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
import { useToast } from "@/hooks/use-toast";

export default function CreateBill() {
  const router = useRouter();

  const { billData, updateBillData } = useBillContext();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState(billData.client);
  const [project, setProject] = useState(billData.project);
  const [date, setDate] = useState(billData.date);

  useEffect(() => {
    if (!billData.date) {
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [billData.date]);

  const handleNext = () => {
    if (client && project && date) {
      setIsLoading(true);
      updateBillData({ client, project, date });
      router.push("/create-bill/select-item");
    } else {
      toast({ title: "Please fill in all fields", variant: "destructive" });
    }
  };

  return (
    <StepLayout title="Create New Bill">
      <div className="space-y-4">
        <Select value={client} onValueChange={setClient}>
          <SelectTrigger>
            <SelectValue placeholder="Select Client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="client1">Client 1</SelectItem>
            <SelectItem value="client2">Client 2</SelectItem>
          </SelectContent>
        </Select>

        <Select value={project} onValueChange={setProject}>
          <SelectTrigger>
            <SelectValue placeholder="Select Client Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="project1">Project 1</SelectItem>
            <SelectItem value="project2">Project 2</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Current Date"
        />

        <Button onClick={handleNext} className="w-full" disabled={isLoading}>
          {isLoading ? <Loader /> : "Next"}
        </Button>
      </div>
    </StepLayout>
  );
}
