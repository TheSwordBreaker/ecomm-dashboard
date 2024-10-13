"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStoreModal } from "~/hooks/use-store-model";
import { useState } from "react";
import { Model } from "../ui/modal";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

const StoreModal = () => {
  const storeModel = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async () => {
    try {
      setLoading(true);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Model
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModel.isOpen}
      onClose={storeModel.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-commerce"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="item-center flex w-full justify-end space-x-2 pt-6">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={storeModel.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Model>
  );
};

export default StoreModal;
