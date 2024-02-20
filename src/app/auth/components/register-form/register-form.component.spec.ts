import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterFormComponent } from './register-form.component';
import { UsersService } from 'src/app/services/user.service';
import { getText, query, setInputValue } from 'src/testing';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userServiceSpy : jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [ReactiveFormsModule,],
      providers: [
        {provide: UsersService, useValue: spy},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the emailField be invalid', () => {
    //component.form.get('email')?.setValue('esto no es un correo');
    component.emailField?.setValue('esto no es un correo'); // emailField lo obtuvimos del get emailField de register form component
    //expect(component.form.get('email')?.invalid).toBeTruthy();
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    component.emailField?.setValue('');
    expect(component.emailField?.invalid).withContext('empty').toBeTruthy();
  });

  it('should the passwordField be invalid', () => {
    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();

    component.passwordField?.setValue('12345');
    expect(component.passwordField?.invalid).withContext('> 6').toBeTruthy();

    component.passwordField?.setValue('iuhsdeuiwdheui');
    expect(component.passwordField?.invalid).withContext('without numbers').toBeTruthy();

    component.passwordField?.setValue('pass123');
    expect(component.passwordField?.valid).withContext('correct password').toBeTruthy();
  });

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'Isco',
      email: 'mail@mal.com',
      password: '121212',
      confirmPassword: '121212',
      checkTerms: false
    });
    expect(component.form.invalid).toBeTruthy();
  });

  it('should the emailField be invalid from UI', () => {
    const inputDe = query(fixture, 'input#email');
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    inputEl.value = "Esto no es un correo";
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).toContain("It's not a email");
  });

  it('should the emailField be invalid from UI with setIpuntValue', () => {
    setInputValue(fixture, 'input#email', 'Esto no es un correo');

    fixture.detectChanges();

    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).toContain("It's not a email");
  });
});
