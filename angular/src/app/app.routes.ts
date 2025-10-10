import { RouterModule, Routes } from '@angular/router';
// import { Page404Component } from './extrapages/page404/page404.component';
// import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { Page404Component } from './extrapages/page404/page404.component';

export const routes: Routes = [
    {
        path: "auth",
        loadChildren: () =>
            import("./account/account.module").then((m) => m.AccountModule),
    },


    // {
    //     path: "",
    //     component: LayoutComponent,
    //     loadChildren: () =>
    //         import("./pages/pages.module").then((m) => m.PagesModule),
    //     canActivate: [AuthGuard],
    // },

    {
      path: "",
      component: LayoutComponent,
      loadChildren: () =>
          import("./features/features-routing.module").then((m) => m.FeaturesRoutingModule),
      canActivate: [AuthGuard],
    },
    {
        path: "pages",
        loadChildren: () =>
            import("./extrapages/extrapages.module").then((m) => m.ExtrapagesModule),
        canActivate: [AuthGuard],
    },
    // { path: "crypto-ico-landing", component: CyptolandingComponent },
    { path: "**", component: Page404Component },
];
