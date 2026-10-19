import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminComponent } from './admin.component';
import { StudentService } from '../services/student.service';
import { Routes } from '@angular/router';

describe('AdminComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<AdminComponent>>;
  let component: AdminComponent;
  let router: Router;
  let students: StudentService;

  beforeEach(async () => {
    const routes: Routes = [
      { path: 'students/new', component: AdminComponent },
      { path: 'students/:id', component: AdminComponent },
      { path: 'students', component: AdminComponent },
      { path: 'attendance', component: AdminComponent },
      { path: 'courses', component: AdminComponent },
      { path: 'examinations', component: AdminComponent },
      { path: 'results', component: AdminComponent }
    ];
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [CommonModule, ReactiveFormsModule, RouterTestingModule.withRoutes(routes)],
      providers: [StudentService]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    students = TestBed.inject(StudentService);
    fixture.detectChanges();
  });

  it('renders the dashboard and its navigation', () => {
    const html = fixture.nativeElement as HTMLElement;
    expect(html.textContent).toContain('Total students');
    expect(html.textContent).toContain('Student enrollment');
    expect(html.querySelector('a[href="/students"]')).toBeTruthy();
  });

  it('renders each management route without a blank page', async () => {
    const routes = [
      ['/students', 'Manage your student records'],
      ['/attendance', 'Class attendance'],
      ['/courses', 'Explore programs'],
      ['/examinations', 'Examination schedule'],
      ['/results', 'Published results'],
      ['/students/STU-2024-001', 'Personal information']
    ];
    for (const [url, marker] of routes) {
      await fixture.ngZone!.run(() => router.navigateByUrl(url));
      fixture.detectChanges();
      expect((fixture.nativeElement as HTMLElement).textContent).toContain(marker);
    }
  });

  it('validates student data and supports adding, editing, searching, and deleting records', () => {
    const startingCount = students.snapshot.length;
    component.openForm();
    component.saveStudent();
    expect(component.studentForm.invalid).toBeTrue();
    component.studentForm.setValue({
      name: 'Morgan Lee', id: 'STU-2024-099', email: 'morgan@school.edu',
      phone: '+1 555 0199', course: 'Biology', year: 'Year 1'
    });
    component.saveStudent();
    expect(students.get('STU-2024-099')?.name).toBe('Morgan Lee');
    expect(students.snapshot.length).toBe(startingCount + 1);

    component.openForm(students.get('STU-2024-099'));
    component.studentForm.patchValue({ name: 'Morgan Updated' });
    component.saveStudent();
    expect(students.get('STU-2024-099')?.name).toBe('Morgan Updated');

    component.query = 'Morgan Updated';
    expect(component.filteredStudents.length).toBe(1);
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteStudent(students.get('STU-2024-099')!);
    expect(students.get('STU-2024-099')).toBeUndefined();
  });

  it('opens the add form on the dedicated student registration route', async () => {
    await fixture.ngZone!.run(() => router.navigateByUrl('/students/new'));
    fixture.detectChanges();
    expect(component.view).toBe('students');
    expect(component.formOpen).toBeTrue();
    expect((fixture.nativeElement as HTMLElement).querySelector('.modal')).toBeTruthy();
  });
});
