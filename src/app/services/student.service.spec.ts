import { TestBed } from '@angular/core/testing';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  beforeEach(() => { service = TestBed.inject(StudentService); });

  it('starts with mock records and supports add, update, lookup, and delete', () => {
    const initialCount = service.snapshot.length;
    const student = { id: 'STU-2024-099', name: 'Test Student', email: 'test@school.edu', phone: '+1 555 0199', course: 'Biology', year: 'Year 1', status: 'Active' as const };
    service.save(student);
    expect(service.get(student.id)?.name).toBe('Test Student');
    service.save({ ...student, name: 'Updated Student' }, student.id);
    expect(service.get(student.id)?.name).toBe('Updated Student');
    service.remove(student.id);
    expect(service.snapshot.length).toBe(initialCount);
    expect(service.get(student.id)).toBeUndefined();
  });
});
