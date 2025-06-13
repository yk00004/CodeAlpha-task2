import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  error = '';
  success = '';
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private AuthService: AuthService,private router:Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    const userData = this.registerForm.value;
    console.log(userData);

    this.AuthService.login(userData.username,userData.password).subscribe((e:any) => {
      localStorage.setItem("token",e.token)
      localStorage.setItem("user",JSON.stringify(e.user))
      this.router.navigateByUrl("/")
    });
  }
}
