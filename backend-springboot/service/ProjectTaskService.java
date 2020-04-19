// Service class a middle man between Repository and Controller.
// Methods are created in this class to save, update and delete ProjecTask.
package com.springboot.demo.service;

import com.springboot.demo.domain.ProjectTask;
import com.springboot.demo.repository.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service                // anotate this class as a service.
public class ProjectTaskService {

    @Autowired      // autowire repository.
    private ProjectTaskRepository projectTaskRepository;



    public ProjectTask saveOrUpdateProjectTask(ProjectTask projectTask){
        if(projectTask.getStatus()==null || projectTask.getStatus()==""){
            projectTask.setStatus("TO_DO");
        }
        return projectTaskRepository.save(projectTask);
    }




    public Iterable<ProjectTask> findAll(){
        return projectTaskRepository.findAll();
    }



    public ProjectTask findById(Long id){
        return projectTaskRepository.getById(id);
    }



    public void delete(Long id){
        ProjectTask projectTask = findById(id);
        projectTaskRepository.delete(projectTask);
    }

}
