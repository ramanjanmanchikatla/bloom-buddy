
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { Droplet } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await signUp(values.email, values.password);
      navigate("/signin?verification=true");
    } catch (error) {
      // Error already handled in AuthContext
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <Droplet size={32} className="text-plant-500" />
            <span className="font-poppins font-bold text-2xl text-plant-800">
              PlantCare
            </span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to create your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-plant-500 hover:bg-plant-600"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-plant-600 hover:text-plant-800"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
