import { routes } from './../../../app.routes';
import { Component } from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import {MatFormFieldControl,MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { Route, Router, Routes } from '@angular/router';
@Component({
  selector: 'app-register',

  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [],
})
export class RegisterComponent {
  error = '';
  success = '';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private AuthService: AuthService,private Route:Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    const userData = this.registerForm.value;
    console.log(userData);

    this.AuthService.register(userData).subscribe((e) => {
      console.log(e);
      this.registerForm.reset();
      this.Route.navigateByUrl("/auth/login")

    });
  }
}
