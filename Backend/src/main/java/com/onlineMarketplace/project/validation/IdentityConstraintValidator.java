package com.onlineMarketplace.project.validation;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
public class IdentityConstraintValidator implements ConstraintValidator<IdentityConstraint, Long> {
    @Override
    public void initialize(IdentityConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext constraintValidatorContext) {
        return value != null && value > 0;
    }
}