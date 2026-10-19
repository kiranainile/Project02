import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    }).compileComponents();
  });

  it('requires a valid email and a password of at least six characters', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    component.form.setValue({ email: 'not-an-email', password: 'short' });
    expect(component.form.invalid).toBeTrue();
    component.form.setValue({ email: 'admin@school.edu', password: 'secure123' });
    expect(component.form.valid).toBeTrue();
  });
});
