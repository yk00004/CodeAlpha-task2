import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedService } from '../../../services/feed.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-post',
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  postForm:FormGroup
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private postService: FeedService, private router: Router) {
    this.postForm = this.fb.group({
      caption: ['', Validators.required],
      image: [null, Validators.required]
    });
  }
   onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.postForm.patchValue({ image: this.selectedFile });
    }
  }
  onSubmit() {
    if (this.postForm.invalid) return;

    const formData = new FormData();
    formData.append('caption', this.postForm.get('caption')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.postService.createPost(formData).subscribe({
      next: () => {
        alert('Post created successfully!');
        this.router.navigate(['/feed']);
      },
      error: (err) => alert('Error creating post: ' + err.message)
    });
  }

}
