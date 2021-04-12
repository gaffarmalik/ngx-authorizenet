import { Component, Input, OnInit, Output, Renderer2, EventEmitter } from '@angular/core';
import { NgxAuthorizenetI } from './ngx-authorizenet.config';
declare const window: any

@Component({
  selector: 'ngx-authorizenet',
  templateUrl: './ngx-authorizenet.component.html',
  styleUrls: ['./ngx-authorizenet.component.css']
})
export class NgxAuthorizenetComponent implements OnInit {
  @Input() ButtonText: string = "Pay Now";
  @Input() config: NgxAuthorizenetI = {};
  @Output() responseHandler = new EventEmitter<{}>();

  billingAddressOptions: any;
  urlAction: any;
  apiLoginID: any;
  clientKey: any;
  acceptUIFormBtnTxt: any;
  acceptUIFormHeaderTxt: any;


  constructor(private renderer: Renderer2) { }


  /** 
   * @description Load External Script(s) for authorize.net Accept Payment;
   * @return void
   */
  public async loadExternalScript(url: string): Promise<HTMLScriptElement> {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    this.renderer.appendChild(document.body, script);
    return script;
  }


  /**
  * 
  * @description Load Authorize Script before View - Extends ngOnInit;
  * @return void
  */
  async ngOnInit(): Promise<void> {
    try {
      this.billingAddressOptions = this.getUndefined("billingAddressOptions", this.config.billingAddressOptions);
      this.urlAction = this.getUndefined("urlAction", this.config.urlAction);
      this.apiLoginID = this.getUndefined("apiLoginID", this.config.apiLoginID);
      this.clientKey = this.getUndefined("clientKey", this.config.clientKey);
      this.acceptUIFormBtnTxt = this.getUndefined("acceptUIFormBtnTxt", this.config.acceptUIFormBtnTxt);
      this.acceptUIFormHeaderTxt = this.getUndefined("acceptUIFormHeaderTxt", this.config.acceptUIFormHeaderTxt);

      await this.loadExternalScript('https://js.authorize.net/v3/AcceptUI.js');
      window.authorizeHandler = this.authorizeHandler;
    } catch (error) {
      console.error(`NGXAuthorize Config Error: "${error}"`)
    }

  }

  /**
   * @param response Object from Payment
   * @description Arrow Function to retain scope for emit();
   * @return void
   */
  public authorizeHandler = (response: object) => {
    this.responseHandler.emit(response)
  }

  private getUndefined = (reference: string, data: any) => {
    if (data && data !== null) {
      return data;
    }
    throw new Error(`Data ${reference} is Undefined or Null`);
  };
}


