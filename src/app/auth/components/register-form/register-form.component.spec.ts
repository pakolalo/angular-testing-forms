import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterFormComponent } from './register-form.component';
import { UsersService } from 'src/app/services/user.service';

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
});
