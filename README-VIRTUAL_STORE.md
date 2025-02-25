# Project Structure virtual-store
<pre>
/*
virtual-store/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── role.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── token.interceptor.ts
│   │   │   │   ├── loading.interceptor.ts
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── product.model.ts
│   │   │   │   ├── cart.model.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── product.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── loading.service.ts
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   ├── loading/
│   │   │   ├── enums/
│   │   │   │   ├── user-role.enum.ts
│   │   │   │   ├── user-status.enum.ts
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── recover-password/
│   │   │   │   ├── reset-password/
│   │   │   ├── customer/
│   │   │   │   ├── product-list/
│   │   │   │   ├── product-detail/
│   │   │   │   ├── cart/
│   │   │   │   ├── checkout/
│   │   │   ├── admin/
│   │   │   │   ├── product-management/
│   │   │   │   ├── product-config/
│   │   │   │   ├── product-create/
│   │   │   ├── master/
│   │   │   │   ├── user-list/
│   │   │   │   ├── user-config/
│   │   │   │   ├── purchase-list/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
├── angular.json
├── package.json
*/
</pre>
