import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changePassword } from "../api/changePassword";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const schema = z
  .object({
    password: z
      .string()
      .min(1, {
        message: "Veuillez entrer votre nouveau mot de passe",
      })
      .describe("Nouveau mot de passe"),
    confirmPassword: z
      .string()
      .min(1, { message: "Veuillez confirmer votre mot de passe" })
      .describe("Confirmer nouveau mot de passe"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
      });
    }
  });

export const ResetForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await changePassword({ token: token ?? "", password: values.password });
      toast({
        title: "Mot de passe mis à jour",
        description: "Vous allez être redirigé dans quelques secondes...",
        variant: "success",
        duration: 5000,
      });

      await delay(3000);

      navigate("/auth");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
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
                <FormLabel>Confirmer nouveau mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" className="w-full">
              Valider nouveau mot de passe
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
