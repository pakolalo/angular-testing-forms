import { FormControl, FormGroup } from "@angular/forms";
import { MyValidators } from "./validators";

fdescribe('Tests for MyValidators', () => {

  describe('Tests for validPassword', () => {
    it('should return null when password is correct', () => {
      //Arrange
      const control = new FormControl();
      control.setValue('nicolas123');
      //Act
      const rta = MyValidators.validPassword(control);
      //Assert
      expect(rta).toBeNull();
    });

    it('should return null when password is wrong', () => {
      //Arrange
      const control = new FormControl();
      control.setValue('aabbcc');
      //Act
      const rta = MyValidators.validPassword(control);
      //Assert
      expect(rta?.invalid_password).toBeTrue();
    });
  });

  describe('Tests for matchPasswords ', () => {

    it('should return null', () => {
      //Arrange
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456'),
      });
      //Act
      const rta = MyValidators.matchPasswords(group);
      //Assert
      expect(rta).toBeNull();
    });

    it('should return object with error', () => {
      //Arrange
      const group = new FormGroup({
        password: new FormControl('123456974'),
        confirmPassword: new FormControl('123456123'),
      });
      //Act
      const rta = MyValidators.matchPasswords(group);
      //Assert
      expect(rta?.match_password).toBeTrue();
    });

    it('should return object with error', () => {
      //Arrange
      const group = new FormGroup({
        otro: new FormControl('123456974'),
        otro2: new FormControl('123456123'),
      });
      //Act
      const fn = () => {
        MyValidators.matchPasswords(group);
      }
      //Assert
      expect(fn).toThrow(new Error('matchPasswords: fields not found'));
    });
  });
});
