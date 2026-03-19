package com.officechores.ui;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.Layout;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@Layout
@AnonymousAllowed
public class MainLayout extends AppLayout {

    public MainLayout() {
        createHeader();
        createDrawer();
    }

    private void createHeader() {
        H2 logo = new H2("Office Chores");
        logo.getStyle().set("font-size", "var(--lumo-font-size-l)").set("margin", "0");

        Button signOut = new Button("Sign Out", new Icon(VaadinIcon.SIGN_OUT));
        signOut.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE, ButtonVariant.LUMO_SMALL);
        signOut.addClickListener(e -> getUI().ifPresent(ui -> ui.getPage().setLocation("/logout")));

        HorizontalLayout header = new HorizontalLayout(new DrawerToggle(), logo, signOut);
        header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        header.expand(logo);
        header.setWidthFull();
        header.addClassNames("py-0", "px-m");

        addToNavbar(header);
    }

    private void createDrawer() {
        SideNav nav = new SideNav();

        SideNavItem calendarItem = new SideNavItem("Calendar", CalendarView.class, new Icon(VaadinIcon.CALENDAR));
        SideNavItem historyItem = new SideNavItem("History", HistoryView.class, new Icon(VaadinIcon.CLOCK));
        SideNavItem profileItem = new SideNavItem("My Profile", ProfileView.class, new Icon(VaadinIcon.USER));

        nav.addItem(calendarItem, historyItem, profileItem);

        if (SecurityUtils.isAdmin()) {
            SideNavItem manageItem = new SideNavItem("Manage Chores", ManageChoresView.class, new Icon(VaadinIcon.LIST));
            SideNavItem teamItem = new SideNavItem("Team", TeamView.class, new Icon(VaadinIcon.GROUP));
            nav.addItem(manageItem, teamItem);
        }

        addToDrawer(nav);
    }
}
