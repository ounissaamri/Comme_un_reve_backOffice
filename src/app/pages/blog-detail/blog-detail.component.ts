import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../shared/services/blog.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { FileService } from '../../core/services/file.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  standalone:true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    NgFor,
    NgIf
  ]
})
export class BlogDetailComponent implements OnInit {
  blogForm: FormGroup;
  blogId: string | null = null;
  imageName: any;
  originalName: any;
  api_url = environment.apiUrl + 'api/file/download/';


  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService
  ) {
    this.blogForm = this.fb.group({
      content: ['', Validators.required],
      titre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //recuperation de l'id dans la route
    this.blogId = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'))
    if (this.blogId) {
      this.blogService.getBlogById(this.blogId).subscribe((data) => {
        console.log(data)
        if(data.image) {
          this.originalName = data.image
        }
        this.blogForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      if (this.blogId) {
        console.log( {...this.blogForm.getRawValue()}, this.originalName)

        this.blogService
          .updateBlog(this.blogId, {...this.blogForm.getRawValue(), image:this.originalName})
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      } else {
        console.log(this.originalName)
        this.blogService.createBlog({...this.blogForm.getRawValue(), image:this.originalName}).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Type de fichier non valide. Veuillez sélectionner une image JPEG ou PNG.');
        return;
      }

  
    this.fileService.upload(file)
      .subscribe((res:any) => {

       this.originalName= res.file
       console.log(this.originalName)
      },
      (error) => {
        console.log(error)
      });
  }
  }

  onDelete() {
    if (this.blogForm.valid) {
    if (this.blogId) {
      this.blogService
        .deleteById(this.blogId)
        .subscribe(() => {
          alert('Element bien supprimé')
          this.router.navigate(['/']);
        });
    } 
  }
}
}
