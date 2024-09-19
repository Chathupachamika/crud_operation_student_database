package edu.icet.service;

import edu.icet.dto.Student;

import java.util.List;

public interface StudentService {
    Student registerStudent(Student student);
    Student getStudentById(Long id);
    List<Student> getAllStudents();
}