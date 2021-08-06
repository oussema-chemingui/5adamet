import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminaddservicesComponent } from './adminaddservices/adminaddservices.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
//import { HomelocationComponent } from './homelocation/homelocation.component';
import { LoginComponent } from './login/login.component';
import { MainservicesComponent } from './mainservices/mainservices.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterProfComponent } from './register-prof/register-prof.component';
import { SignupComponent } from './signup/signup.component';
import { StepComponent } from './step/step.component'
import { SuccessComponent } from './success/success.component';
import { UpdateComponent } from './update/update.component';
import { ServProvidersComponent } from './serv-providers/serv-providers.component';
import { SuccesspurchaseComponent } from './successpurchase/successpurchase.component';
import { ErrorComponent } from './error/error.component';
import { FormComponent } from './form/form.component';

import { QuotedemandComponent } from './quotedemand/quotedemand.component';

import { FormRevComponent } from './formrev/formrev.component';
import { RatingsComponent } from './ratings/ratings.component';

 
import { QuotedemandsComponent } from './quotedemands/quotedemands.component';
import { QuoteresponseComponent } from './quoteresponse/quoteresponse.component';
import { QuoteresponsesComponent } from './quoteresponses/quoteresponses.component';
import { QuoteinfoComponent } from './quoteinfo/quoteinfo.component';
import { ServiceCardsComponent } from './service-cards/service-cards.component';



import { ServProvidersComponent } from './serv-providers/serv-providers.component';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';


const routes: Routes = [

  {path:"",redirectTo:"/home",pathMatch:"full"},



  {path:'quotedemands',component:QuotedemandsComponent},
  {path:'quoteresponses',component:QuoteresponsesComponent},
  {path:'quotedemand',component:QuotedemandComponent},
  {path:'quoteinfo',component:QuoteinfoComponent},
  {path:'quoteresponse',component:QuoteresponseComponent},

  {path:'serviceproviders',component:ServProvidersComponent},
  {path:'serviceproviderprofil',component:ServiceCardsComponent},

  {path:'feedbackform',component:FormRevComponent },
  {path:'ratings',component: RatingsComponent},
  {path:'costestimation',component:QuotedemandComponent},
  {path:'home',component:HomeComponent},
  {path:'step/:User',component:StepComponent},
  {path:'mainservices',component:MainservicesComponent},
  {path:'registerProf',component:RegisterProfComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'mybookings',component:MybookingsComponent},
  {path:'success',component:SuccessComponent},
  {path:'adminaddservices',component:AdminaddservicesComponent},
  {path:'update/:serviceId',component:UpdateComponent},
  {path:'successpurchase',component:SuccesspurchaseComponent},

  {path:'stripe',component:StripeCheckoutComponent},

  {path:'error',component:ErrorComponent},
  // {path:':code',component:FormComponent},

  

  {path: '404', component: PagenotfoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }