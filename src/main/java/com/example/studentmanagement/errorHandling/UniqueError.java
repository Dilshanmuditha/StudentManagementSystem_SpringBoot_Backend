package com.example.studentmanagement.errorHandling;

import org.springframework.dao.DataIntegrityViolationException;

public class UniqueError {
    public static String extractErrorMessage(DataIntegrityViolationException ex) {
        String errorMessage = "Unknown error occurred";
        String message = ex.getMessage();
        if (message.contains("UK_47bvqemyk6vlm0w7crc3opdd4")) {
            errorMessage = "Email already exists";
        } else if (message.contains("UK_dtiqkqtpy0uyer2t3orvl687t")) {
            errorMessage = "Mobile number already exists";
        }
        return errorMessage;
    }
}
