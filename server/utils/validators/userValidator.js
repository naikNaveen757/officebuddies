const Joi = require('joi');

const registerValidation = Joi.object({
    empId: Joi.string().alphanum().max(4).required().messages({
        'string.max': 'Employee ID must not exceed 4 characters.',
        'any.required': 'Employee ID is required.',
    }),
    name: Joi.string().min(3).required().messages({
        'string.min': 'Name must have at least 3 characters.',
        'any.required': 'Name is required.',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must have at least 6 characters.',
        'any.required': 'Password is required.',
    }),
    dob: Joi.date().less('now').required().messages({
        'date.less': 'Date of Birth must be in the past.',
        'any.required': 'Date of Birth is required.',
    }),
    role: Joi.string().valid('employee', 'organizer').optional(),
});

module.exports = { registerValidation };
