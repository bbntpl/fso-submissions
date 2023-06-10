import React from 'react';
import { 
    NewEntry, 
    HealthCheckEntryWithoutBase, 
    HospitalEntryWithoutBase,
    OccupationalHealthcareEntryWithoutBase
} from '../../types';

export type ErrorKeys = 'description' | 'specialist' | 'discharge' | 'employerName';

export const errorMessages = {
    required: 'This field is required',
};

export const validateBaseEntryFields = (values: NewEntry) => {
    const errors: Partial<NewEntry> = {};
    if (!values.description) {
        errors.description = errorMessages.required;
    }
    if (!values.specialist) {
        errors.specialist = errorMessages.required;
    }
    return errors;
};

export const validateHealthCheckEntryFields = (values: HealthCheckEntryWithoutBase) => {
    const errors: Partial<HealthCheckEntryWithoutBase> = {};
    return errors;
};

export const validateHospitalEntryFields = (values: HospitalEntryWithoutBase) => {
    const errors: Partial<HospitalEntryWithoutBase> = {};
    if (!values.discharge.date || !values.discharge.criteria) {
        errors.discharge = { date: errorMessages.required, criteria: errorMessages.required };
    }
    return errors;
};

export const validateOccupationalHealthcareEntryFields = (values: OccupationalHealthcareEntryWithoutBase) => {
    const errors: Partial<OccupationalHealthcareEntryWithoutBase> = {};
    if (!values.employerName) {
        errors.employerName = errorMessages.required;
    }
    return errors;
};

export const validateForm = (
    baseEntryInputs: NewEntry, 
    healthCheckInputs: HealthCheckEntryWithoutBase, 
    occupationalHealthcareInputs: OccupationalHealthcareEntryWithoutBase,
    hospitalInputs: HospitalEntryWithoutBase,
    entryType: string
) => {
    let errors = {};
    errors = validateBaseEntryFields(baseEntryInputs);

    switch (entryType) {
        case 'Hospital':
            errors = {...errors, ...validateHospitalEntryFields(hospitalInputs)};
            break;
        case 'OccupationalHealthcare':
            errors = {...errors, ...validateOccupationalHealthcareEntryFields(occupationalHealthcareInputs)};
            break;
        case 'HealthCheck':
            errors = {...errors, ...validateHealthCheckEntryFields(healthCheckInputs)};
            break;
        default:
            throw new Error('This entry type does not exists');
    }
    return errors;
};

export const FormErrorMessage = ({ children }: { children: React.ReactNode }) => (
    <span style={{ color: 'red' }}>{children}</span>
);