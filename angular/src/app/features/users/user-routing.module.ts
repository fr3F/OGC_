import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccesComponent } from "./acces/acces.component";
import { UserslistComponent } from "./pages/userslist/userslist.component";
import { UseraddComponent } from "./pages/useradd/useradd.component";
import { UserUpdatePasswordComponent } from "./pages/user-update-password/user-update-password.component";
import { ProfileComponent } from "./components/user/profile/profile.component";

const routes: Routes = [
  {
    path: "user-list",
    component: UserslistComponent,
  },
  {
    path: "user-add",
    component: UseraddComponent,
  },
  {
    path: "user-edit/:id",
    component: UseraddComponent,
  },
  {
    path: "profil-edit/:monProfil",
    component: UseraddComponent,
  },
  {
    path: "user-edit-password/:id",
    component: UserUpdatePasswordComponent,
  },
  {
    path: "profil-edit-password/:monProfil",
    component: UserUpdatePasswordComponent,
  },
  {
    path: "user-access",
    component: AccesComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
