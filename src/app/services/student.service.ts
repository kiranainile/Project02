import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly records = new BehaviorSubject<Student[]>([
    { id: 'STU-2024-001', name: 'Olivia Rhye', email: 'olivia.rhye@school.edu', phone: '+1 555 0101', course: 'Computer Science', year: 'Year 3', status: 'Active' },
    { id: 'STU-2024-002', name: 'Phoenix Baker', email: 'phoenix.baker@school.edu', phone: '+1 555 0102', course: 'Business Administration', year: 'Year 2', status: 'Active' },
    { id: 'STU-2024-003', name: 'Lana Steiner', email: 'lana.steiner@school.edu', phone: '+1 555 0103', course: 'Graphic Design', year: 'Year 1', status: 'Active' },
    { id: 'STU-2024-004', name: 'Demi Wilkinson', email: 'demi.wilkinson@school.edu', phone: '+1 555 0104', course: 'Computer Science', year: 'Year 4', status: 'Inactive' },
    { id: 'STU-2024-005', name: 'Candice Wu', email: 'candice.wu@school.edu', phone: '+1 555 0105', course: 'Psychology', year: 'Year 2', status: 'Active' },
    { id: 'STU-2024-006', name: 'Natali Craig', email: 'natali.craig@school.edu', phone: '+1 555 0106', course: 'Business Administration', year: 'Year 3', status: 'Active' },
    { id: 'STU-2024-007', name: 'Drew Cano', email: 'drew.cano@school.edu', phone: '+1 555 0107', course: 'Computer Science', year: 'Year 1', status: 'Active' }
  ]);
  students$ = this.records.asObservable();
  get snapshot(): Student[] { return this.records.value; }
  get(id: string): Student | undefined { return this.snapshot.find(s => s.id === id); }
  save(student: Student, originalId?: string): void {
    const list = this.snapshot.filter(s => s.id !== (originalId || student.id));
    this.records.next([student, ...list]);
  }
  remove(id: string): void { this.records.next(this.snapshot.filter(s => s.id !== id)); }
}
