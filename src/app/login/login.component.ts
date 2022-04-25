import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../core/models/state';
import { UtilService } from '../core/services/util/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  });
  constructor(private store:Store<AppState>, private util:UtilService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
   if (this.loginForm.valid) {
     this.store.dispatch({
        type: 'ADD_ACCOUNT',
        payload: this.loginForm.value
      });
        this.router.navigate(['/home']);
   }
  }
}
