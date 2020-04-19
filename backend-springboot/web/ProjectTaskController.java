// Controller is used for server hosting.

package com.springboot.demo.web;

import com.springboot.demo.domain.ProjectTask;
import com.springboot.demo.service.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
@CrossOrigin
public class ProjectTaskController {

    @Autowired
    private ProjectTaskService projectTaskService;




    @PostMapping("")
    public ResponseEntity<?> addProjectTaskTOBoard(@Valid @RequestBody ProjectTask projectTask, BindingResult result){
        if(result.hasErrors()){
            Map<String, String> erroMap = new HashMap<>();

            for(FieldError error: result.getFieldErrors()){
                erroMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String, String>>(erroMap, HttpStatus.BAD_REQUEST);
        }
        ProjectTask newProjectTask = projectTaskService.saveOrUpdateProjectTask(projectTask);
        return new ResponseEntity<ProjectTask>(newProjectTask, HttpStatus.CREATED);
    }




    @GetMapping("/all")
    public Iterable<ProjectTask> getAllProjectTasks(){
        return projectTaskService.findAll();
    }



    @GetMapping("/{projectTask_id}")
    public ResponseEntity<?> getProjectTaskById(@PathVariable Long projectTask_id){
        ProjectTask projectTask = projectTaskService.findById(projectTask_id);
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }



    @DeleteMapping("/{projectTask_id}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable Long projectTask_id){
        projectTaskService.delete(projectTask_id);
        return new ResponseEntity<String>("Project Task deleted", HttpStatus.OK);
    }


}
