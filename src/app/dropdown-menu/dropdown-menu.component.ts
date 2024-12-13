
import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],  // Add CommonModule to imports array
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownMenuComponent),
    multi: true
  }]
})
export class DropdownMenuComponent {
  isOpen = false;
  selectedItem: string | null = null;
  options = ['Instructor 1', 'Instructor 2', 'Instructor 4'];

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedItem = option;
    this.isOpen = false; // Close the dropdown after selection
    this.onChange(option); // Notify form about the change
  }

  // ControlValueAccessor methods
  writeValue(value: string | null): void {
    this.selectedItem = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   // Handle disabled state if necessary
  // }
}
