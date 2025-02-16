"use client";

import { PencilIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useBillContext } from "@/app/providers/bill-provider";
import Loader from "@/components/loader";
import { StepLayout } from "@/components/step-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Review() {
  const router = useRouter();
  const { billData, deleteItem } = useBillContext();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleAddMoreItem = () => {
    setIsLoading(true);
    router.push("/create-bill/select-item");
  };

  const handleSaveAndSubmit = () => {
    setIsLoading(true);
    toast({ title: "Saved successfully", variant: "default" });
    router.push("/create-bill/view");
  };

  const handleDeleteItem = (index: number) => {
    deleteItem(index);
    toast({ title: "Deleted successfully", variant: "default" });
  };

  const handleEditItem = (index: number) => {
    router.push(`/create-bill/edit-item/${index}`);
  };

  return (
    <StepLayout title="Review Bill">
      <div className="space-y-4">
        {/* client details */}
        <Card className="cursor-pointer">
          <CardHeader>
            <CardTitle className="underline hover:no-underline">
              Bill Details
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

        {/* item details */}
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
                  <CardFooter>
                    {/* edit btn */}
                    <Button
                      variant={"default"}
                      className="w-full"
                      onClick={() => handleEditItem(index)}
                    >
                      <PencilIcon className="mr-0 h-4 w-4" />
                    </Button>
                  </CardFooter>

                  <CardFooter>
                    {/* delete btn */}
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteItem(index)}
                      className="w-full"
                    >
                      <Trash2Icon className="mr-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button
            onClick={handleAddMoreItem}
            variant="outline"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? <Loader /> : "Add More Item"}
          </Button>
          <Button
            onClick={handleSaveAndSubmit}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? <Loader /> : "Save & Submit"}
          </Button>
        </div>
      </div>
    </StepLayout>
  );
}
