//package com.example.studentmanagement.controller.institute;
//
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/v1/departments")
//
//public class DepartmentController {
//
//
//    @PostMapping
//    public String createDepartement(@RequestBody RequestDepartmentDto depratmentDto){
////        return  "createDepartment";
//        return  depratmentDto.toString();
//
//    }
//    @GetMapping("/{id}")
//    public String findDepartement( @PathVariable  int id){
////        return  "findDepartment";
//        return  id+"";
//    }
//    @PutMapping(params = "id")
//    public String updateDepartement(
//            @RequestParam int id,
//            @RequestBody RequestDepartmentDto departmentDto){
////        return  "updateDepartment";
//        return  departmentDto.toString();
//    }
//    @DeleteMapping("/{id}")
//    public String deleteDepartement(@PathVariable int id){
////        return  "deleteDepartment";
//        return  id+"";
//    }
//    @GetMapping (path="/list" , params = {"searchText", "page","size"})
//    public String findAllDepartement(
//            @RequestParam String searchText,
//            @RequestParam int page,
//            @RequestParam int size
//    ){
//        return  "findAllDepartment";
//    }
//
//
//}