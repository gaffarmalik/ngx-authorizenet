# NgxAuthorizenet

An Angular Wrapper for [AuthorizeNet](https://authorize.net) AcceptJS (client-side) only.  
This project provides an easy-to-use Button to process secure payment using authorize.net Accept Form on your UI, before implementing Server-side Authorization.   
For a better understanding on how authorize.net API works, try reading   this [page](https://developer.authorize.net/api/reference/features/acceptjs.html) for reference.  
It's recommded to also visit this [page](https://developer.authorize.net/api/reference/index.html#) for reference to Complete API Suite.  



## Getting Started

Install from the NPM Registry  
```$ npm i --save ngx-authorizenet```

Import `NgxAuthorizenetModule` in your module (i.e. `AppModule`)


### Usage

```javascript
import { NgxAuthorizenetModule } from 'ngx-authorizenet';

@NgModule({
  imports: [
    NgxAuthorizenetModule,
    ...
  ],
})
```

### HTML Templating
```html
//YourComponent.component.html
...
<ngx-authorizenet [config]="authorizenetConfig" (responseHandler)="responseHandler($event)"></ngx-authorizenet>
...
```

- `ButtonText` - Defaults to 'Pay Now' (optional)
-  `config` - Config object for `billing Address, ApiLoginID, clientKey, etc.`
- `responseHandler` - Callback Function to Receive Response if token was returned or not.

### Creating Transaction Token on Client Side

```javascript
//YourComponent.component.ts

import { Component, OnInit } from '@angular/core';
import { NgxAuthorizenetI } from 'ngx-authorizenet';

@Component({
  templateUrl: './your.component.html',
})
export class YourComponent implements OnInit {

  public authorizenetConfig?: NgxAuthorizenetI;

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.authorizenetConfig = {
      billingAddressOptions: '{"show":true, "required":false}',
      urlAction: 'https://api.yourdomain.com/authorizepay/callback',
      apiLoginID: 'XXXXXXX',
      clientKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      acceptUIFormBtnTxt: 'Pay Now',
      acceptUIFormHeaderTxt: 'Pay To My Account'
    }
  }

  public authorizeHandler(response) {
    //Visit Api Reference for API Schema
    if (response.messages.resultCode === "Error") {
      var i = 0;
      while (i < response.messages.message.length) {
        console.log(
          response.messages.message[i].code + ": " +
          response.messages.message[i].text
        );
        i = i + 1;
      };

    }
    else {
      performServerSideTransationRequest(response);
    }

  }
```

### Config Options
 - `billingAddressOptions?: string|object`(required)    
 - `urlAction?:string`  (optional)
 - `apiLoginID?:string`  (required)
 - `clientKey?:string`   (required)
 - `acceptUIFormBtnTxt?:string`  (required)
 - `acceptUIFormHeaderTxt?:string`  (required)



## Pull Request and Contributions
The Project is currently being maintained by only me on [Github](https://github.com/emperor-orbitz/ngx-authorizenet). </br>
You can create a PR to include more features to this project which currently unavailable such as <br>
- ServerSide Controller 
- Unit Testing 
- Improved Type Hinting.
- And Many More

<br/>

