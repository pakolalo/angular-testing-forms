import { ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { query, queryById } from "./finders";

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestId: boolean = false,
  ) {
    let debugElement: DebugElement;
    if(withTestId) {
      debugElement = queryById(fixture, selector);
    } else {
      debugElement = query(fixture, selector);
    }
    const inputEl: HTMLInputElement = debugElement.nativeElement;
    inputEl.value = value;
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('blur'));
};
