import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "@/lib/auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/stores/notifications";

const schema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Veuillez remplir ce champ.",
    })
    .email("Veuillez entrer une adresse e-mail valide."),
  password: z
    .string()
    .min(1, { message: "Veuillez entrer votre mot de passe." }),
});

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const notifications = useNotificationStore((state) => state.notifications);
  const login = useLogin();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    login.mutate(values);
    onSuccess();
  };

  console.log(notifications);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-red-500 font-bold">
            {notifications.length > 0
              ? notifications[notifications.length - 1].message
              : false}
          </p>
          <div>
            <Button disabled={login.isPending} type="submit" className="w-full">
              Se connecter
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
