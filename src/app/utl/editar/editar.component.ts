import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosUtl } from 'src/app/interfaces/utl.Interface';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  edAlumno:AlumnosUtl={
    //los datos se deben de obtener de la tabla
    id:0,
    nombre:'',
    edad:0,
    correo:''
  }

  constructor(private alumnosutl:ProyectoApiService, private router:Router, private route:ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.obtenerAlumno(id);
    });
  }
  editar() {
    this.alumnosutl.editarAlumno(this.edAlumno).subscribe(
      () => {
        console.log('Alumno editado exitosamente');
        this.router.navigate(['verAlumnos']);
      },
      (error) => {
        console.error('Error al editar el alumno:', error);
      }
    );
  }

  obtenerAlumno(id: number) {
    this.alumnosutl.getAlumno(id).subscribe({
      next: (alumno) => {
        this.edAlumno = alumno;
      },
      error: (e) => console.error(e),
      complete: () => console.info()
    });
  }


}
