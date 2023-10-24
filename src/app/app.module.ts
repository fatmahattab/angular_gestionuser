import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FruitsComponent } from './fruits/fruits.component';
import { AddFruitComponent } from './add-fruit/add-fruit.component';
import { FormsModule } from '@angular/forms';
import { UpdateFruitComponent } from './update-fruit/update-fruit.component';
import { RchercheParSaisonComponent } from './rcherche-par-saison/rcherche-par-saison.component';
import { RechercherParNomComponent } from './rechercher-par-nom/rechercher-par-nom.component';
import { ListeSaisonsComponent } from './liste-saisons/liste-saisons.component';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { UpdateSaisonComponent } from './update-saison/update-saison.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { TokenInterceptor } from './services/token.interceptor';
import { AddRoleForUserComponent } from './add-role/add-role.component';
import { ListeOfusersComponent } from './liste-user/liste-user.component';


@NgModule({
  declarations: [
    AppComponent,
    FruitsComponent,
    AddFruitComponent,
    UpdateFruitComponent,
    RchercheParSaisonComponent,
    RechercherParNomComponent,
    ListeSaisonsComponent,
    UpdateSaisonComponent,
    LoginComponent,
    ForbiddenComponent,
    SearchFilterPipe,
    AddRoleForUserComponent,
    ListeOfusersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}
     ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
