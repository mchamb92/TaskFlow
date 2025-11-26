package com.taskmanager.taskmanager.repository;

import com.taskmanager.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // You can add custom query methods later if needed
}