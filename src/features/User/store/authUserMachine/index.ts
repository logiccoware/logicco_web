import { AuthUser } from "@/domain/user/models";
import { assign, createMachine } from "xstate";

export const authUserMachine = createMachine({
  id: "authUserMachine",
  context: {
    user: undefined as AuthUser | undefined,
  },
  on: {
    "auth.setUser": {
      actions: assign({
        user: ({ event }) => event.user,
      }),
    },
  },
});
