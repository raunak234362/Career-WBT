/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState(() => {
        const storedData = localStorage.getItem('formData');
        return storedData ? JSON.parse(storedData) : {};
      });
    
      const updateFormData = (newData) => {
        setFormData((prevData) => ({
          ...prevData,
          ...newData,
        }));
        localStorage.setItem('formData', JSON.stringify({ ...formData, ...newData }));
      };
    
      return (
        <FormContext.Provider value={{ formData, updateFormData }}>
          {children}
        </FormContext.Provider>
      );
    };

export const useFormContext = () => useContext(FormContext);