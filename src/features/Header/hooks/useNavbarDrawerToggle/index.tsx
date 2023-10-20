import { NavbarDrawerToggleContext } from "@/features/Header/store/NavbarDrawerToggleProvider";

export function useNavbarDrawerToggle() {
    const isNavbarDrawerOpen = NavbarDrawerToggleContext.useSelector((state) => state.matches("open"));
    const navbarDrawerToggleActorRef = NavbarDrawerToggleContext.useActorRef();

    function toggleNavbarDrawer() {
        navbarDrawerToggleActorRef.send({ type: 'navbarDrawer.toggle' });
    }

    return {
        isNavbarDrawerOpen,
        toggleNavbarDrawer,
    }
}