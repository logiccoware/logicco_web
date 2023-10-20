import { createMachine } from "xstate";

export const navbarDrawerToggleMachine = createMachine({
    id: 'navbarDrawerToggle',
    initial: 'closed',
    states: {
      closed: {
        on: { 'navbarDrawer.toggle': 'open' },
      },
      open: {
        on: { 'navbarDrawer.toggle': 'closed' },
      },
    },
  });
