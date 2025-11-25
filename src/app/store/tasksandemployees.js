import {create} from 'zustand';

export const useTaskAndEmployeeStore = create((set) => ({
    tasks: [],
    employees: [],
    setTasks: (tasks) => set({ tasks: tasks }),
    setemployees: (employees) => set({ employees: employees }),
}));